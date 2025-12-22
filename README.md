# Hobby Comparison Tool

A responsive web application that helps users compare 2-3 hobbies by scoring them across 8 shared criteria and visualizing results in a real-time radar chart.

## Features

- **Hobby Management**: Start with 2 hobbies, add up to 3 total, with inline name editing
- **8 Fixed Criteria Scoring**: Rate each hobby on a 1-5 scale across:
  - Fits into my schedule
  - Happens often
  - Can involve the kids
  - Is cheap
  - Gives me meaning
  - Gives me emotional energy
  - Has a positive or tangible result
  - Can scale up or down based on time or energy
- **Real-time Radar Chart**: Visualize hobby scores with smooth animations and color-coded polygons
- **Responsive Design**: Two-column layout on desktop, stacked on mobile
- **Interactive Controls**: Toggle hobby visibility, reset scores, calculate averages
- **Accessible UI**: Colorblind-safe palette, clear labeling, keyboard navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Chart.js** with react-chartjs-2 for radar chart visualization
- **Modern ES6+** with full type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Edit Hobby Names**: Click on any hobby name to edit it inline
2. **Score Criteria**: Select a score (1-5) for each criterion for each hobby
3. **Add Third Hobby**: Click "+ Add Hobby" to compare a third hobby (optional)
4. **Toggle Visibility**: Click hobby name buttons at the top to show/hide in chart
5. **View Results**: The radar chart updates in real-time as you select scores
6. **Check Averages**: See average scores displayed on each card and in the summary

## Project Structure

```
src/
├── components/
│   ├── HobbyComparison.tsx  # Main container component
│   ├── HobbyCard.tsx         # Individual hobby scoring panel
│   └── RadarChart.tsx        # Chart.js radar chart wrapper
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx                   # Root component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles with Tailwind
```

## License

MIT
