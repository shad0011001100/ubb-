import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { getTranslation } from '../../services/translations';

export function Screen05BConcernFlow({
  checkInData,
  onProceedToSafety,
  onNavigate,
  selectedLanguage = 'en'
}) {
  const t = getTranslation(selectedLanguage);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [moreDetails, setMoreDetails] = useState('');

  const topics = t.screen5B.topics;

  const toggleTopic = (topic) => {
    if (topic === "I don't know" || topic === "सांगता येत नाही" || topic === "पता नहीं") {
      setSelectedTopics([topic]);
      return;
    }

    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((tItem) => tItem !== topic));
    } else {
      setSelectedTopics([
        ...selectedTopics.filter((tItem) => !tItem.includes('know') && !tItem.includes('सांगता') && !tItem.includes('पता')),
        topic
      ]);
    }
  };

  const handleContinue = (isSkipped = false) => {
    const payload = {
      ...checkInData,
      topics: isSkipped ? ['General Support'] : selectedTopics.length > 0 ? selectedTopics : ['General Wellbeing'],
      moreDetails: isSkipped ? '' : moreDetails.trim()
    };
    onProceedToSafety(payload);
  };

  return (
    <div className="h-full bg-[#FFFFFF] text-[#14282B] flex flex-col justify-between overflow-hidden select-none">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#D9E2DC]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1 rounded-full hover:bg-slate-100 text-[#5B6E67] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#B84C4C] font-bold">
              {checkInData?.emoji} {checkInData?.label} ({checkInData?.intensity || 'Moderate'})
            </div>
            <h2 className="font-fraunces text-base font-semibold text-[#14282B]">
              {t.screen5B.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Support Topics Selector & Optional Box */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4">
        <div>
          <span className="text-[11px] text-[#5B6E67] block mb-2">
            {t.screen5B.subtitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((topic, idx) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={idx}
                  onClick={() => toggleTopic(topic)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#3A5F4B] border-[#3A5F4B] text-white font-semibold shadow-xs'
                      : 'bg-[#F2F6F3] border-[#D9E2DC] text-[#14282B] hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                  <span>{topic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Textarea */}
        <div className="bg-[#F2F6F3] border border-[#D9E2DC] rounded-2xl p-3.5 space-y-1.5">
          <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5B6E67] font-semibold block">
            {t.screen5B.moreDetailsLabel}
          </label>
          <textarea
            rows={3}
            value={moreDetails}
            onChange={(e) => setMoreDetails(e.target.value)}
            placeholder={t.screen5B.moreDetailsPlaceholder}
            className="w-full bg-white border border-[#D9E2DC] rounded-xl p-2.5 text-xs text-[#14282B] placeholder-[#8FA69C] focus:outline-none focus:border-[#3A5F4B] resize-none"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#D9E2DC] bg-white space-y-2">
        <button
          onClick={() => handleContinue(false)}
          className="w-full py-3 rounded-full bg-[#E3A06F] hover:bg-[#C9814F] text-[#241208] font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.common.continue}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleContinue(true)}
          className="w-full py-1.5 text-center text-xs text-[#5B6E67] hover:text-[#14282B] cursor-pointer"
        >
          {t.common.skip}
        </button>
      </div>
    </div>
  );
}
