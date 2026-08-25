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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              Peer Community
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#1a1d14]">
              {t.screen3.wallTitle}
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowComposer(!showComposer)}
          className="p-2 rounded-full bg-[#526140] hover:bg-[#435034] text-white cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {/* Moderation Safety Guarantee */}
        <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-3.5 flex items-center justify-between text-[10.5px] text-[#1a1d14] shadow-2xs">
          <span className="flex items-center gap-1.5 font-bold text-[#526140]">
            <ShieldCheck className="w-4 h-4" />
            100% Moderated & Anonymous
          </span>
          <span className="font-mono text-[9.5px] text-[#5e5c52]">Zero Stigma</span>
        </div>

        {/* Composer */}
        {showComposer && (
          <div className="bg-white border-2 border-[#526140] rounded-3xl p-4 space-y-2.5 shadow-sm animate-fadeIn">
            <b className="text-xs text-[#1a1d14] block">Write an encouraging note to your peers:</b>
            <textarea
              rows={3}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Leave a positive thought, reflection, or kind reminder..."
              className="w-full bg-[#f3f5e6] border border-[#c5c8bc] rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
            />

            {submittedNotice ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-3 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Submitted to volunteer moderation queue!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handlePostNote}
                  disabled={!newNoteText.trim() || submitting}
                  className="flex-1 py-2.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs cursor-pointer shadow-xs disabled:opacity-40"
                >
                  {submitting ? 'Submitting…' : 'Submit for Moderation'}
                </button>
                <button
                  onClick={() => setShowComposer(false)}
                  className="px-4 py-2.5 rounded-full bg-[#edefe0] text-[#5e5c52] text-xs font-semibold cursor-pointer"
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
              className="bg-white border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2.5 shadow-2xs hover:border-[#526140] transition-all"
            >
              <p className="text-xs text-[#1a1d14] leading-relaxed font-sans">
                "{note.text}"
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#f3f5e6]">
                <span className="font-mono text-[9px] text-[#5e5c52] font-medium">
                  {note.author} · {note.date}
                </span>

                <button
                  onClick={() => handleWarmth(note.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono transition-all cursor-pointer ${
                    likedNotes[note.id]
                      ? 'bg-rose-50 text-rose-600 font-bold shadow-2xs'
                      : 'bg-[#f3f5e6] text-[#5e5c52] hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedNotes[note.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
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
