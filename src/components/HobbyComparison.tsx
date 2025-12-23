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
      <header className="flex justify-between items-end gap-4 mb-6">
        <div className="inline-block bg-white border-4 border-black nb-shadow-lg px-5 py-3 nb-sticker relative -top-2">
          <h1 className="text-5xl font-black tracking-tighter">
            Ted Needs a New Hobby
          </h1>
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
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-6">
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
              hobbies={hobbies}
              visibleHobbies={visibleHobbies}
              onToggleVisibility={toggleHobbyVisibility}
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
