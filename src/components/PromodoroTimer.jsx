import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import { Howl } from 'howler';

const DEFAULT_PRESETS = [
  { work: 25 * 60, break: 5 * 60 },
  { work: 50 * 60, break: 10 * 60 },
  { work: 90 * 60, break: 15 * 60 },
];

const alertSound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'],
  volume: 0.5,
});

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cycleType, setCycleType] = useState('work');
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [presets, setPresets] = useLocalStorage('pomodoro-presets', DEFAULT_PRESETS);
  const [selectedPreset, setSelectedPreset] = useLocalStorage('selected-preset', 0);
  const [customPreset, setCustomPreset] = useState({ work: 25 * 60, break: 5 * 60 });

  const currentPreset = presets[selectedPreset] || DEFAULT_PRESETS[0];

  const startNewCycle = useCallback((type) => {
    setCycleType(type);
    setTimeLeft(type === 'work' ? currentPreset.work : currentPreset.break);
    setIsActive(true);
  }, [currentPreset]);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      alertSound.play();
      if (cycleType === 'work') {
        setCyclesCompleted((c) => c + 1);
        startNewCycle('break');
      } else {
        startNewCycle('work');
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, cycleType, startNewCycle]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const progress = ((timeLeft / (cycleType === 'work' ? currentPreset.work : currentPreset.break)) * 100);

  const handlePresetChange = (index) => {
    setSelectedPreset(index);
    setIsActive(false);
    setTimeLeft(presets[index].work || DEFAULT_PRESETS[0].work);
    setCycleType('work');
  };

  const handleCustomPreset = () => {
    const newPresets = [...presets, customPreset];
    setPresets(newPresets);
    setSelectedPreset(newPresets.length - 1);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      {/* Preset Selector */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => handlePresetChange(index)}
            className={`p-2 rounded-lg ${selectedPreset === index
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {preset.work / 60}/{preset.break / 60}
          </button>
        ))}
      </div>

      {/* Custom Preset Creator */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3">Custom Preset</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Work (min)</label>
            <input
              type="number"
              value={customPreset.work / 60}
              onChange={(e) => setCustomPreset((p) => ({ ...p, work: Number(e.target.value) * 60 }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-600 mb-1">Break (min)</label>
            <input
              type="number"
              value={customPreset.break / 60}
              onChange={(e) => setCustomPreset((p) => ({ ...p, break: Number(e.target.value) * 60 }))}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleCustomPreset}
            className="self-end px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={`${cycleType === 'work' ? 'text-red-500' : 'text-green-500'}`}
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (100 - progress) / 100}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
          <div className="text-sm uppercase tracking-wide text-gray-500">
            {cycleType} • Cycle #{cyclesCompleted + 1}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setTimeLeft(cycleType === 'work' ? currentPreset.work : currentPreset.break);
          }}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Statistics */}
      <div className="text-center text-sm text-gray-600">
        Completed cycles: {cyclesCompleted}
      </div>
    </div>
  );
};

export default PomodoroTimer;