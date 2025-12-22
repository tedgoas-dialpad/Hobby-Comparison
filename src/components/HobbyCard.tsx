import { useState } from 'react';
import { type Hobby, CRITERIA } from '../types';

interface HobbyCardProps {
  hobby: Hobby;
  onUpdateName: (id: string, name: string) => void;
  onUpdateScore: (id: string, criterion: typeof CRITERIA[number], score: number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  average: number | null;
}

const HobbyCard = ({ hobby, onUpdateName, onUpdateScore, onRemove, canRemove, average }: HobbyCardProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(hobby.name);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      onUpdateName(hobby.id, tempName.trim());
    } else {
      setTempName(hobby.name);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setTempName(hobby.name);
      setIsEditingName(false);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border-2 transition-all"
      style={{ borderColor: hobby.color }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: hobby.color }}
          />
          {isEditingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 outline-none flex-1 max-w-xs"
              autoFocus
            />
          ) : (
            <h3
              onClick={() => setIsEditingName(true)}
              className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              title="Click to edit"
            >
              {hobby.name}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-3">
          {average !== null && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Average</p>
              <p className="text-lg font-bold" style={{ color: hobby.color }}>
                {average.toFixed(2)}
              </p>
            </div>
          )}
          {canRemove && (
            <button
              onClick={() => onRemove(hobby.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
              title="Remove hobby"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {CRITERIA.map((criterion) => (
          <div key={criterion} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              {criterion}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => onUpdateScore(hobby.id, criterion, score)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    hobby.scores[criterion] === score
                      ? 'text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: hobby.scores[criterion] === score ? hobby.color : undefined,
                  }}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbyCard;
