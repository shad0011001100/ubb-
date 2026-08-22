import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Building2, Droplet, Trash2, BookOpen, ExternalLink, Download } from 'lucide-react';

export const ServiceModal = ({ service, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [propertyId, setPropertyId] = useState('PMC-PT-2024-88319');
  const [consumerNo, setConsumerNo] = useState('04-2918-X');

  if (!service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl space-y-3 relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
              {service.id === 'property-tax' && <Building2 className="w-4 h-4" />}
              {service.id === 'water-bill' && <Droplet className="w-4 h-4" />}
              {service.id === 'garbage-schedule' && <Trash2 className="w-4 h-4" />}
              {service.id === 'civic-guidelines' && <BookOpen className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">{service.title}</h3>
              <p className="text-[10px] text-slate-500">{service.marathiTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on service */}
        {submitted ? (
          <div className="py-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Official Request Acknowledged</h4>
            <p className="text-[11px] text-slate-600 px-4">
              Your municipal enquiry has been logged with Pune Municipal Corporation Citizen Registry under RTSA reference #PMC-REQ-94812.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 w-full py-2 bg-blue-900 text-white text-xs font-bold rounded-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {service.id === 'property-tax' && (
              <div className="space-y-2 text-xs">
                <div className="bg-blue-50 p-2.5 rounded border border-blue-200">
                  <span className="text-[10px] text-blue-900 font-bold block uppercase">Assessment Notice 2026-27</span>
                  <span className="text-xs font-bold text-slate-900">Assessed Dues: ₹0.00 (All dues clear)</span>
                  <p className="text-[10px] text-slate-600 mt-0.5">Early bird rebate: 5% applied on June assessment.</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Property Index Number (PID)</label>
                  <input
                    type="text"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 font-mono text-xs"
                  />
                </div>
              </div>
            )}

            {service.id === 'water-bill' && (
              <div className="space-y-2 text-xs">
                <div className="bg-cyan-50 p-2.5 rounded border border-cyan-200">
                  <span className="text-[10px] text-cyan-900 font-bold block uppercase">Smart Meter AMR Reading</span>
                  <span className="text-xs font-bold text-slate-900">Current Consumption: 412 Litres</span>
                  <p className="text-[10px] text-slate-600 mt-0.5">Billing Cycle: Monthly • Due Date: 30 Aug 2026</p>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Water Connection Number</label>
                  <input
                    type="text"
                    value={consumerNo}
                    onChange={(e) => setConsumerNo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 font-mono text-xs"
                  />
                </div>
              </div>
            )}

            {service.id === 'garbage-schedule' && (
              <div className="space-y-2 text-xs">
                <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200 space-y-1">
                  <div className="flex justify-between font-bold text-emerald-900">
                    <span>Ward 14 (Kothrud South)</span>
                    <span>07:30 AM Daily</span>
                  </div>
                  <p className="text-[10px] text-emerald-800">
                    • Wet Waste (Green Bin): Daily<br />
                    • Dry Recyclable (Blue Bin): Tue, Thu, Sat<br />
                    • Sanitary & Hazard: Daily in sealed red bag
                  </p>
                </div>
                <p className="text-[10px] text-slate-500">
                  Track PMC Swachh Van live GPS vehicle: <strong className="text-slate-800">MH-12-CZ-4419</strong>
                </p>
              </div>
            )}

            {service.id === 'civic-guidelines' && (
              <div className="space-y-2 text-xs">
                <div className="bg-amber-50 p-2.5 rounded border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold text-amber-900 block">Unified Development Control (UDCPR 2026)</span>
                  <p className="text-[10px] text-slate-700">
                    Standard building floor space index (FSI), setback norms, and commercial shop license checklist.
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] p-1.5 bg-slate-50 rounded border border-slate-200">
                  <span>PMC_Civic_Bylaws_2026.pdf</span>
                  <span className="text-blue-900 font-bold flex items-center gap-1 cursor-pointer">
                    <Download className="w-3 h-3" /> 2.4 MB
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold"
              >
                Confirm Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
