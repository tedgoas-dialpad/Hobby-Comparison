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
      className="bg-white p-6 border-4 border-black nb-shadow-md transition-transform w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <span className="inline-block w-4 h-4 border-4 border-black" style={{ backgroundColor: hobby.color }} />
          {isEditingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              className="text-2xl font-black text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent p-0 m-0"
              style={{ width: `${Math.max(tempName.length * 0.6, 8)}em` }}
              autoFocus
            />
          ) : (
            <h3
              onClick={() => setIsEditingName(true)}
              className="text-2xl font-black cursor-pointer hover:text-gray-700 border-b-2 border-transparent"
              title="Click to edit"
            >
              {hobby.name}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-3">
          {canRemove && (
            <button
              onClick={() => onRemove(hobby.id)}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Remove hobby"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {CRITERIA.map((criterion) => (
          <div key={criterion} className="flex items-center gap-4">
            <label className="text-sm font-black uppercase tracking-widest min-w-[200px]">
              {criterion}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => onUpdateScore(hobby.id, criterion, score)}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-black transition-all border-4 border-black nb-shadow-sm nb-press cursor-pointer ${
                    hobby.scores[criterion] === score
                      ? ''
                      : 'bg-white'
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
