import React, { useState } from 'react';
import { X, ShieldCheck, Cpu, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { checkOllamaConnection } from '../utils/localLlm';

export default function LocalInferenceModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  connectionStatus,
  onRefreshConnection
}) {
  if (!isOpen) return null;

  const [endpoint, setEndpoint] = useState(config.endpoint);
  const [model, setModel] = useState(config.model);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await checkOllamaConnection(endpoint);
    setTestResult(res);
    setTesting(false);
    if (onRefreshConnection) onRefreshConnection();
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveConfig({ endpoint, model });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn font-terminal">
      <div className="w-full max-w-lg bg-[#2b2621] border border-[#6e6259] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#1c1a17] border-b border-[#6e6259]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#e8b058]" />
            <h3 className="font-altar text-base text-[#e8b058] tracking-wider">
              Offline Local Inference Core
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#6e6259] hover:text-[#fdfbf7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* Privacy Guarantee Box */}
          <div className="p-3 rounded bg-[#a8c3a0]/10 border border-[#a8c3a0]/40 text-[#a8c3a0] flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-[#a8c3a0]" />
            <div>
              <strong className="block text-sm text-[#fdfbf7] font-semibold mb-0.5">
                100% Air-Gapped Offline Guarantee
              </strong>
              Shell events, history, commands, and paths NEVER leave your device. All inference executes locally on your hardware via Ollama or Séan-Shell's internal spectral engine.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-[#e8b058] font-bold mb-1">
                Local Ollama / llama.cpp Endpoint:
              </label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="http://localhost:11434/api/generate"
                className="w-full bg-[#1c1a17] border border-[#6e6259] rounded px-3 py-1.5 text-[#fdfbf7] font-mono text-xs focus:outline-none focus:border-[#e8b058]"
              />
            </div>

            <div>
              <label className="block text-[#e8b058] font-bold mb-1">
                Target Model:
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gemma2:2b (or llama3.2:1b, etc.)"
                className="w-full bg-[#1c1a17] border border-[#6e6259] rounded px-3 py-1.5 text-[#fdfbf7] font-mono text-xs focus:outline-none focus:border-[#e8b058]"
              />
              <span className="text-[11px] text-[#6e6259] mt-0.5 block">
                Recommended: <code className="text-[#a8c3a0]">gemma2:2b</code> or <code className="text-[#a8c3a0]">llama3.2:1b</code>
              </span>
            </div>

            {/* Connection Test Status */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTest}
                disabled={testing}
                className="px-3 py-1.5 rounded border border-[#6e6259] bg-[#1c1a17] hover:border-[#a8c3a0] text-[#a8c3a0] transition-all flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                {testing ? 'Pinging Local Core...' : 'Ping Ollama Connection'}
              </button>

              {testResult && (
                <div className="flex items-center gap-1.5 text-xs">
                  {testResult.connected ? (
                    <span className="text-[#a8c3a0] flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-4 h-4" /> Connected to Ollama!
                    </span>
                  ) : (
                    <span className="text-[#e0a899] flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Offline (Built-in Spirit Active)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Note on Offline Resilience */}
            <div className="text-[11px] text-[#6e6259] bg-[#1c1a17] p-2.5 rounded border border-[#6e6259]/30">
              * Note: If Ollama is not running in background on port 11434, Séan-Shell automatically engages its built-in spectral oracle with zero configuration or downtime!
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-[#6e6259]/40">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-[#6e6259]/50 text-[#6e6259] hover:text-[#fdfbf7] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#e8b058]/20 border border-[#e8b058] text-[#e8b058] font-bold hover:bg-[#e8b058]/30 cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
