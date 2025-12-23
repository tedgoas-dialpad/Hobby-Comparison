import { useState } from 'react';
import { type Hobby, CRITERIA, HOBBY_COLORS } from '../types';
import HobbyCard from './HobbyCard';
import RadarChart from './RadarChart';

const HobbyComparison = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([
    {
      id: '1',
      name: 'Hobby 1',
      scores: Object.fromEntries(CRITERIA.map(c => [c, null])) as Record<typeof CRITERIA[number], number | null>,
      color: HOBBY_COLORS[0]
    },
    {
      id: '2',
      name: 'Hobby 2',
      scores: Object.fromEntries(CRITERIA.map(c => [c, null])) as Record<typeof CRITERIA[number], number | null>,
      color: HOBBY_COLORS[1]
    }
  ]);

  const [visibleHobbies, setVisibleHobbies] = useState<Record<string, boolean>>({
    '1': true,
    '2': true
  });

  const updateHobbyName = (id: string, name: string) => {
    setHobbies(prev => prev.map(h => h.id === id ? { ...h, name } : h));
  };

  const updateScore = (hobbyId: string, criterion: typeof CRITERIA[number], score: number) => {
    setHobbies(prev => prev.map(h => 
      h.id === hobbyId 
        ? { ...h, scores: { ...h.scores, [criterion]: score } }
        : h
    ));
  };

  const addHobby = () => {
    if (hobbies.length < 3) {
      const newHobby: Hobby = {
        id: '3',
        name: 'Hobby 3',
        scores: Object.fromEntries(CRITERIA.map(c => [c, null])) as Record<typeof CRITERIA[number], number | null>,
        color: HOBBY_COLORS[2]
      };
      setHobbies(prev => [...prev, newHobby]);
      setVisibleHobbies(prev => ({ ...prev, '3': true }));
    }
  };

  const removeHobby = (id: string) => {
    if (hobbies.length > 2) {
      setHobbies(prev => prev.filter(h => h.id !== id));
      setVisibleHobbies(prev => {
        const newVisible = { ...prev };
        delete newVisible[id];
        return newVisible;
      });
    }
  };

  const toggleHobbyVisibility = (id: string) => {
    setVisibleHobbies(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetScores = () => {
    setHobbies(prev => prev.map(h => ({
      ...h,
      scores: Object.fromEntries(CRITERIA.map(c => [c, null])) as Record<typeof CRITERIA[number], number | null>
    })));
  };

  const calculateAverage = (hobby: Hobby): number | null => {
    const scores = Object.values(hobby.scores).filter((s): s is number => s !== null);
    if (scores.length === 0) return null;
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-3">
          {hobbies.map(hobby => (
            <button
              key={hobby.id}
              onClick={() => toggleHobbyVisibility(hobby.id)}
              className={`px-4 py-2 border-4 border-black nb-shadow-sm nb-press text-sm font-black tracking-widest uppercase ${
                visibleHobbies[hobby.id] ? '' : ''
              }`}
              style={{
                backgroundColor: visibleHobbies[hobby.id] ? hobby.color : '#ffffff',
                color: '#000000'
              }}
            >
              {hobby.name}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          {hobbies.length < 3 && (
            <button
              onClick={addHobby}
              className="px-4 py-2 bg-[var(--nb-red)] border-4 border-black nb-shadow-sm nb-press text-sm font-black uppercase tracking-widest"
            >
              + Add Hobby
            </button>
          )}
          <button
            onClick={resetScores}
            className="px-4 py-2 bg-[var(--nb-violet)] border-4 border-black nb-shadow-sm nb-press text-sm font-black uppercase tracking-widest"
          >
            Reset Scores
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 bg-white border-4 border-black nb-shadow-md p-4">
          <div className="bg-white border-4 border-black nb-shadow-sm p-4 nb-sticker">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Scoring Guide</h2>
            <p className="text-sm text-gray-600">
              Rate each hobby on a scale of 1-5, where <strong>1 = low</strong> and <strong>5 = high</strong>
            </p>
          </div>
          <div
            className={`grid gap-6 items-start justify-items-start ${
              hobbies.length === 1
                ? 'grid-cols-1'
                : hobbies.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-3'
            }`}
          >
            {hobbies.map(hobby => (
              <HobbyCard
                key={hobby.id}
                hobby={hobby}
                onUpdateName={updateHobbyName}
                onUpdateScore={updateScore}
                onRemove={removeHobby}
                canRemove={hobbies.length > 2}
                average={calculateAverage(hobby)}
              />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-4 h-fit">
          <div className="bg-white border-4 border-black nb-shadow-md p-6 nb-canvas-white">
            <h2 className="text-2xl font-black mb-4">Comparison Chart</h2>
            <RadarChart 
              hobbies={hobbies.filter(h => visibleHobbies[h.id])} 
            />
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-black uppercase tracking-widest">Average Scores</h3>
              {hobbies.map(hobby => {
                const avg = calculateAverage(hobby);
                return (
                  <div key={hobby.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 border-4 border-black" style={{ backgroundColor: hobby.color }} />
                      <span>{hobby.name}</span>
                    </div>
                    <span className="font-black">
                      {avg !== null ? avg.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HobbyComparison;
