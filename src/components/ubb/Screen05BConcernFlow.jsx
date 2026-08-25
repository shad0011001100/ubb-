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
    <div className="h-full bg-[#f9fbeb] text-[#1a1d14] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Header */}
      <div className="px-5 pt-4 pb-2.5 bg-[#f9fbeb] border-b border-[#c5c8bc]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('mood_checkin')}
            className="p-1.5 rounded-full hover:bg-[#edefe0] text-[#5e5c52] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#815505] font-bold">
              {checkInData?.emoji} {checkInData?.label} ({checkInData?.intensity || 'Moderate'})
            </div>
            <h2 className="font-fraunces text-lg font-bold text-[#1a1d14]">
              {t.screen5B.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Support Topics Selector & Optional Box */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-4">
        <div>
          <span className="text-[11px] text-[#5e5c52] block mb-2 font-medium">
            {t.screen5B.subtitle}
          </span>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, idx) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={idx}
                  onClick={() => toggleTopic(topic)}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#526140] border-[#526140] text-white font-semibold shadow-xs'
                      : 'bg-white border-[#c5c8bc]/70 text-[#1a1d14] hover:bg-[#f3f5e6]'
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
        <div className="bg-[#f3f5e6] border border-[#c5c8bc]/60 rounded-3xl p-4 space-y-2">
          <label className="font-mono text-[9.5px] uppercase tracking-wider text-[#5e5c52] font-bold block">
            {t.screen5B.moreDetailsLabel}
          </label>
          <textarea
            rows={3}
            value={moreDetails}
            onChange={(e) => setMoreDetails(e.target.value)}
            placeholder={t.screen5B.moreDetailsPlaceholder}
            className="w-full bg-white border border-[#c5c8bc] rounded-2xl p-3 text-xs text-[#1a1d14] placeholder-[#75786e] focus:outline-none focus:border-[#526140] resize-none"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-[#c5c8bc]/50 bg-[#f9fbeb] space-y-2">
        <button
          onClick={() => handleContinue(false)}
          className="w-full py-3.5 rounded-full bg-[#526140] hover:bg-[#435034] text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{t.common.continue}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleContinue(true)}
          className="w-full py-1 text-center text-xs text-[#5e5c52] hover:text-[#1a1d14] cursor-pointer"
        >
          {t.common.skip}
        </button>
      </div>
    </div>
  );
}
