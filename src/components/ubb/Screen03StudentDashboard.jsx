import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Heart,
  Plus,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  FileText,
  Smile,
  HelpCircle
} from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';
import ubbLogoLight from '../../assets/ubb-logo-light.png';
import ubbIcon from '../../assets/ubb-icon.png';

const INITIAL_WALL_POSTS = [
  {
    id: 1,
    author: 'Sprout_089',
    text: 'To whoever is studying late tonight: take a deep breath. You are doing so much better than you give yourself credit for.',
    warmthCount: 24,
    date: '2 hours ago',
    tag: '#ExamRelief'
  },
  {
    id: 2,
    author: 'Sprout_142',
    text: 'It is okay to pause for an hour without feeling guilty. Rest is part of the work.',
    warmthCount: 38,
    date: '5 hours ago',
    tag: '#SelfCare'
  },
  {
    id: 3,
    author: 'Sprout_019',
    text: 'आजचा दिवस थोडा कठीण गेला तरी उद्याची सकाळ नवीन संधी घेऊन येईल. स्वतःवर विश्वास ठेवा! 🌻',
    warmthCount: 19,
    date: 'Today',
    tag: '#Hope'
  },
  {
    id: 4,
    author: 'Sprout_311',
    text: 'If you felt lonely in college today, remember there is a whole community here rooting for you silently.',
    warmthCount: 42,
    date: 'Today',
    tag: '#Together'
  }
];

export function Screen03StudentDashboard({
  userProfile,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  const [posts, setPosts] = useState(INITIAL_WALL_POSTS);
  const [likedPosts, setLikedPosts] = useState({});
  const [showComposer, setShowComposer] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    const loadCommunityPosts = async () => {
      try {
        const letters = await ubbSupabase.getCommunityLetters();
        if (letters && letters.length > 0) {
          const mapped = letters.map((l) => ({
            id: l.id,
            author: l.author_tag || 'Sprout_Anon',
            text: l.content,
            warmthCount: l.warmth_count || 15,
            date: 'Recently',
            tag: '#Sanctuary'
          }));
          setPosts([...mapped, ...INITIAL_WALL_POSTS]);
        }
      } catch {}
    };
    loadCommunityPosts();
  }, []);

  const handleWarmth = (id) => {
    if (likedPosts[id]) return;
    setLikedPosts((prev) => ({ ...prev, [id]: true }));
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, warmthCount: p.warmthCount + 1 } : p))
    );
    try {
      ubbSupabase.incrementWarmth(id);
    } catch {}
  };

  const handlePostNote = async () => {
    if (!newNoteText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: anonId,
      text: newNoteText.trim(),
      warmthCount: 1,
      date: 'Just now',
      tag: '#StudentVoice'
    };

    setPosts([newPost, ...posts]);
    setNewNoteText('');
    setPostSuccess(true);

    try {
      await ubbSupabase.createCommunityLetter({
        content: newPost.text,
        author_tag: anonId
      });
    } catch {}

    setTimeout(() => {
      setPostSuccess(false);
      setShowComposer(false);
    }, 2000);
  };

  return (
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none relative font-sans">
      {/* Top Visual App Bar */}
      <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between bg-[#f9fbeb] border-b border-[#c5c8bc]/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={ubbLogoLight || ubbIcon} alt="Ubb Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-fraunces font-bold text-lg tracking-tight text-[#526140]">
            {t.common.appName}
          </span>
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-1.5 bg-[#edefe0] border border-[#c5c8bc]/60 px-3 py-1 rounded-full shadow-2xs">
          <div className="w-2 h-2 rounded-full bg-[#526140] animate-pulse" />
          <span className="font-mono text-[10.5px] text-[#526140] font-bold">{anonId}</span>
        </div>
      </div>

      {/* Main Content: HERO WALL OF THOUGHTS */}
      <div className="flex-1 px-4 py-3.5 overflow-y-auto space-y-3.5 pb-24">
        {/* Wall of Thoughts Banner Header */}
        <div className="bg-gradient-to-br from-[#f3f5e6] via-[#f9fbeb] to-[#edefe0] border border-[#c5c8bc]/60 rounded-3xl p-4 shadow-xs relative overflow-hidden space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-[#526140]/10 text-[#526140] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border border-[#526140]/20">
              <Sparkles className="w-3 h-3 text-[#526140]" />
              <span>Peer Community Sanctuary</span>
            </div>
            <button
              onClick={() => setShowComposer(!showComposer)}
              className="font-mono text-[9.5px] bg-[#526140] hover:bg-[#435034] text-white px-3 py-1 rounded-full font-bold shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Share Thought</span>
            </button>
          </div>

          <div>
            <h1 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              Wall of Thoughts (ऊब)
            </h1>
            <p className="text-xs text-[#5e5c52] mt-0.5 leading-relaxed">
              Read warm, anonymous encouragement from peers. You are never fighting your battles alone.
            </p>
          </div>
        </div>

        {/* Anonymous Post Composer Modal */}
        {showComposer && (
          <div className="bg-white border border-[#526140]/40 rounded-3xl p-4 space-y-2.5 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#526140] font-bold">
                Write an Anonymous Note for Peers
              </span>
              <span className="text-[9px] font-mono text-[#75786e]">100% Anonymous</span>
            </div>

            <textarea
              rows={3}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Share a gentle thought, words of encouragement, or how you got through today..."
              className="w-full bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setShowComposer(false)}
                className="text-xs text-[#5e5c52] hover:text-[#1a1d14] font-semibold cursor-pointer px-2"
              >
                Cancel
              </button>

              <button
                onClick={handlePostNote}
                disabled={!newNoteText.trim()}
                className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all ${
                  newNoteText.trim()
                    ? 'bg-[#526140] hover:bg-[#435034] text-white cursor-pointer'
                    : 'bg-[#c5c8bc]/50 text-[#75786e] cursor-not-allowed'
                }`}
              >
                <Send className="w-3 h-3" />
                <span>Post Thought</span>
              </button>
            </div>

            {postSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 text-center text-xs font-bold text-emerald-900 animate-fadeIn">
                ✨ Your thought has been added to the sanctuary wall!
              </div>
            )}
          </div>
        )}

        {/* Peer Thoughts Cards Feed */}
        <div className="space-y-3">
          {posts.map((post) => {
            const hasLiked = likedPosts[post.id];
            return (
              <div
                key={post.id}
                className="bg-white border border-[#c5c8bc]/70 rounded-3xl p-4 space-y-2.5 shadow-2xs hover:border-[#c5c8bc] transition-all"
              >
                <div className="flex items-center justify-between text-[9.5px] font-mono">
                  <span className="font-bold text-[#526140]">{post.author}</span>
                  <span className="text-[#75786e]">{post.date}</span>
                </div>

                <p className="text-xs text-[#1a1d14] leading-relaxed whitespace-pre-wrap">
                  "{post.text}"
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#f3f5e6]">
                  <span className="font-mono text-[9px] text-[#815505] bg-[#ffddb3]/30 px-2 py-0.5 rounded-full font-semibold">
                    {post.tag}
                  </span>

                  <button
                    onClick={() => handleWarmth(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      hasLiked
                        ? 'bg-rose-100 text-rose-700 shadow-2xs'
                        : 'bg-[#f3f5e6] hover:bg-rose-50 text-[#5e5c52] hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span className="font-mono text-[11px]">{post.warmthCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= STRICT SINGLE-LOCATION 4-TAB BOTTOM NAVIGATION ================= */}
      <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#c5c8bc]/60 px-3 py-2 z-30 shadow-lg">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {/* TAB 1: ARTICLES / EMERGENCY */}
          <button
            onClick={() => onNavigate('articles_emergency')}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#5e5c52] hover:text-red-700 hover:bg-red-50/50 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-red-600" />
            <span className="text-[9px] font-bold font-mono mt-1 text-center">Articles/SOS</span>
          </button>

          {/* TAB 2: MOOD CHECK-IN & TOOLS */}
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#5e5c52] hover:text-[#526140] hover:bg-[#f3f5e6] transition-all cursor-pointer"
          >
            <Smile className="w-4 h-4 text-[#526140]" />
            <span className="text-[9px] font-bold font-mono mt-1 text-center">Mood & Tools</span>
          </button>

          {/* TAB 3: PROGRESS TRACKER */}
          <button
            onClick={() => onNavigate('progress_tracker')}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#5e5c52] hover:text-[#526140] hover:bg-[#f3f5e6] transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-[#526140]" />
            <span className="text-[9px] font-bold font-mono mt-1 text-center">Progress</span>
          </button>

          {/* TAB 4: QUESTIONS & FLOW */}
          <button
            onClick={() => onNavigate('questions_flow')}
            className="flex flex-col items-center justify-center py-1 rounded-xl text-[#5e5c52] hover:text-[#815505] hover:bg-[#ffddb3]/30 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#815505]" />
            <span className="text-[9px] font-bold font-mono mt-1 text-center">10-Q Flow</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
