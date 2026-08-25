import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Heart, Sparkles, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import { getTranslation } from '../../services/translations';
import { ubbSupabase } from '../../services/supabase';

const SAMPLE_WALL_NOTES = [
  {
    id: 1,
    author: 'Sprout_089',
    text: 'To whoever is studying late tonight: take a deep breath. You are doing so much better than you give yourself credit for.',
    warmthCount: 24,
    date: '2 hours ago'
  },
  {
    id: 2,
    author: 'Sprout_142',
    text: 'It is okay to pause for an hour without feeling guilty. Rest is part of the work.',
    warmthCount: 38,
    date: '5 hours ago'
  },
  {
    id: 3,
    author: 'Sprout_019',
    text: 'आजचा दिवस थोडा कठीण गेला तरी उद्याची सकाळ नवीन संधी घेऊन येईल. स्वतःवर विश्वास ठेवा! 🌻',
    warmthCount: 19,
    date: 'Today'
  }
];

export function WallOfThoughtsView({
  userProfile,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [notes, setNotes] = useState(SAMPLE_WALL_NOTES);
  const [likedNotes, setLikedNotes] = useState({});
  const [showComposer, setShowComposer] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const anonId = userProfile?.anonymous_tag || userProfile?.anonymousId || 'UBB-7K4P-29';

  useEffect(() => {
    // Fetch live approved community letters from Supabase if available
    const loadLetters = async () => {
      const letters = await ubbSupabase.fetchCommunityLetters();
      if (letters && letters.length > 0) {
        const mapped = letters.map((l) => ({
          id: l.id,
          author: l.author_tag || 'Sprout_Anon',
          text: l.content,
          warmthCount: l.warmth_count || 12,
          date: 'Just now'
        }));
        setNotes([...mapped, ...SAMPLE_WALL_NOTES]);
      }
    };
    loadLetters();
  }, []);

  const handleWarmth = (id) => {
    if (likedNotes[id]) return;
    setLikedNotes({ ...likedNotes, [id]: true });
    setNotes(notes.map((n) => (n.id === id ? { ...n, warmthCount: n.warmthCount + 1 } : n)));
    ubbSupabase.incrementWarmth(id);
  };

  const handlePostNote = async () => {
    if (!newNoteText.trim()) return;
    setSubmitting(true);

    await ubbSupabase.postCommunityLetter({
      author_tag: anonId,
      content: newNoteText.trim()
    });

    setSubmitting(false);
    setNewNoteText('');
    setSubmittedNotice(true);
    setTimeout(() => {
      setSubmittedNotice(false);
      setShowComposer(false);
    }, 3000);
  };

  return (
    <div className="h-full bg-[#F2F6F3] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#E3A06F] font-bold">
              Peer Community
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen3.wallTitle}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowComposer(!showComposer)}
          className="p-1.5 rounded-full bg-[#E3A06F] text-[#241208] cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Moderation Safety Guarantee */}
        <div className="bg-[#FFFBF7] border border-[#E3A06F]/40 rounded-2xl p-3 flex items-center justify-between text-[10px] text-[#7A4A26]">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E3A06F]" />
            100% Moderated & Anonymous
          </span>
          <span className="font-mono text-[9px] text-[#5B6E67]">Zero Hate · Zero Stigma</span>
        </div>

        {/* Composer Modal/Card */}
        {showComposer && (
          <div className="bg-white border border-[#E3A06F] rounded-2xl p-3.5 space-y-2.5 shadow-sm animate-fadeIn">
            <b className="text-xs text-[#14282B] block">Write an encouraging note to your peers:</b>
            <textarea
              rows={3}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Leave a positive thought, reflection, or kind reminder..."
              className="w-full bg-[#F2F6F3] border border-[#D9E2DC] rounded-xl p-2.5 text-xs text-[#14282B] placeholder-[#8FA69C] focus:outline-none resize-none"
            />

            {submittedNotice ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-2.5 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Submitted to volunteer moderation queue!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handlePostNote}
                  disabled={!newNoteText.trim() || submitting}
                  className="flex-1 py-2 rounded-xl bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs cursor-pointer shadow-xs disabled:opacity-40"
                >
                  {submitting ? 'Submitting…' : 'Submit for Moderation'}
                </button>
                <button
                  onClick={() => setShowComposer(false)}
                  className="px-3 py-2 rounded-xl bg-slate-100 text-[#5B6E67] text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Notes Stream */}
        <div className="space-y-2.5">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-[#D9E2DC] rounded-2xl p-4 space-y-2 shadow-2xs hover:border-[#E3A06F] transition-all"
            >
              <p className="text-xs text-[#14282B] leading-relaxed font-sans">
                "{note.text}"
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#F2F6F3]">
                <span className="font-mono text-[9px] text-[#5B6E67]">
                  {note.author} · {note.date}
                </span>

                <button
                  onClick={() => handleWarmth(note.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono transition-all cursor-pointer ${
                    likedNotes[note.id]
                      ? 'bg-rose-50 text-rose-600 font-bold'
                      : 'bg-[#F2F6F3] text-[#5B6E67] hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${likedNotes[note.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{note.warmthCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
