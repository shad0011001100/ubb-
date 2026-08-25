-- ==========================================================
-- Ubb (ऊब) - Supabase PostgreSQL Schema with Row Level Security
-- Zero-PII Leakage Architecture for Student Mental Health
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ANONYMOUS PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    anonymous_tag VARCHAR(50) UNIQUE NOT NULL, -- e.g. "Sprout_042"
    selected_language VARCHAR(10) DEFAULT 'en',
    current_streak INT DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    is_shadowbanned BOOLEAN DEFAULT FALSE,
    encrypted_break_glass_contact TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SCREENING LOGS (PHQ-9 / Habit Tracking)
CREATE TABLE IF NOT EXISTS public.screening_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INT NOT NULL,
    risk_tier VARCHAR(20) NOT NULL, -- 'LOW', 'MODERATE', 'SEVERE'
    responses JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PEER VOLUNTEERS
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(50) NOT NULL, -- e.g. "Amber_17"
    role_title VARCHAR(100) NOT NULL, -- e.g. "3rd Yr Psychology"
    supervisor_info VARCHAR(150) NOT NULL, -- e.g. "Supervised by Dr. Rao (Reg. 4521)"
    is_active BOOLEAN DEFAULT TRUE,
    daily_active_seconds INT DEFAULT 0,
    last_shift_start TIMESTAMP WITH TIME ZONE
);

-- 4. LIVE SESSIONS & ROUTING
CREATE TABLE IF NOT EXISTS public.support_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    volunteer_id UUID REFERENCES public.volunteers(id) NULL,
    status VARCHAR(30) DEFAULT 'ai_triage', -- 'ai_triage', 'peer_active', 'consent_pending', 'closed', 'crisis_sos'
    triage_summary TEXT NULL,
    consent_refusal_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE NULL
);

-- 5. EPHEMERAL VENTS (Auto-purged on release)
CREATE TABLE IF NOT EXISTS public.ephemeral_vents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. COMMUNITY WALL OF THOUGHTS
CREATE TABLE IF NOT EXISTS public.community_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_tag VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ephemeral_vents ENABLE ROW LEVEL SECURITY;

-- Profiles: Authenticated users can only read & modify their own anonymous profile
CREATE POLICY "Users access own profile" 
    ON public.profiles FOR ALL TO authenticated 
    USING (auth.uid() = id);

-- Screening Logs: Authenticated users can only access their own PHQ-9 logs
CREATE POLICY "Users access own screenings" 
    ON public.screening_logs FOR ALL TO authenticated 
    USING (auth.uid() = user_id);

-- Support Sessions: User accesses own session
CREATE POLICY "Users access own support sessions" 
    ON public.support_sessions FOR ALL TO authenticated 
    USING (auth.uid() = user_id);

-- Volunteers: Publicly readable active volunteer credentials
CREATE POLICY "Public read active volunteers" 
    ON public.volunteers FOR SELECT TO authenticated 
    USING (is_active = TRUE);

-- Community Letters: Read approved letters
CREATE POLICY "Read approved community letters" 
    ON public.community_letters FOR SELECT 
    USING (is_approved = TRUE);

-- Community Letters: Post new letter
CREATE POLICY "Post community letter" 
    ON public.community_letters FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() IS NOT NULL);
