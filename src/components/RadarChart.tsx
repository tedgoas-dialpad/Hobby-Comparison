import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { type Hobby, CRITERIA } from '../types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  hobbies: Hobby[];
  visibleHobbies: Record<string, boolean>;
  onToggleVisibility: (id: string) => void;
}

const RadarChart = ({ hobbies, visibleHobbies, onToggleVisibility }: RadarChartProps) => {
  const chartRef = useRef<ChartJS<'radar'>>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update('none');
    }
  }, [hobbies, visibleHobbies]);

  const data = {
    labels: CRITERIA.map(c => {
      if (c.length > 35) {
        const words = c.split(' ');
        const mid = Math.ceil(words.length / 2);
        return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
      }
      return c;
    }),
    datasets: hobbies.map(hobby => ({
      label: hobby.name,
      data: CRITERIA.map(criterion => hobby.scores[criterion] ?? 0),
      backgroundColor: hobby.color + '33',
      borderColor: hobby.color,
      borderWidth: 2,
      pointBackgroundColor: hobby.color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: hobby.color,
      pointRadius: 4,
      pointHoverRadius: 6,
      hidden: !visibleHobbies[hobby.id],
    })),
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: 11,
            family: 'system-ui, -apple-system, sans-serif',
          },
          color: '#374151',
          padding: 10,
        },
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#6b7280',
          font: {
            size: 10,
          },
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif',
          },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
        },
        onClick: (_e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          if (index !== undefined) {
            const hobby = hobbies[index];
            if (hobby) {
              onToggleVisibility(hobby.id);
            }
          }
        },
        onHover: (event) => {
          if (event.native?.target) {
            (event.native.target as HTMLElement).style.cursor = 'pointer';
          }
        },
        onLeave: (event) => {
          if (event.native?.target) {
            (event.native.target as HTMLElement).style.cursor = 'default';
          }
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.r;
            return `${label}: ${value === 0 ? 'Not rated' : value}`;
          }
        }
      },
    },
    animation: {
      duration: 300,
      easing: 'easeInOutQuart',
    },
  };

  if (hobbies.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-400">
        <p>No hobbies to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px]">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default RadarChart;
