# Hover Energy Dashboard

An interactive energy data visualization dashboard built with React and D3, featuring comprehensive hover effects and cross-chart synchronization.

**Live Demo:** https://irinel47.github.io/hover-energy-dashboard/

## Hover Effect Strategy

This dashboard implements four different hover interaction patterns:

### 1. **Stacked Area Chart** - Internal State + Tooltip
- **Technique**: React `useState` for local hover state
- **Effect**: Hovering over any energy source layer shows a tooltip with exact values and highlights that source
- **Why**: Each area needs independent hover tracking, and the tooltip follows the cursor for precise data inspection

### 2. **Bar Chart** - CSS Pseudo-classes + Internal State
- **Technique**: Inline styles with opacity transitions + React state for tooltip
- **Effect**: Bars brighten on hover with smooth transitions, showing country-specific consumption data
- **Why**: Simple bar highlighting works well with CSS, while the tooltip needs React for positioning

### 3. **Line Chart** - Crosshair Interaction
- **Technique**: SVG overlay with `onMouseMove` capturing cursor position
- **Effect**: Vertical crosshair line follows cursor, showing all renewable values at that year
- **Why**: Multi-line comparison is clearer when all values are visible simultaneously at a specific point in time

### 4. **Donut Chart** - Hover Expansion + Tooltip
- **Technique**: Animated arc radius using `d3.arc()` with different inner/outer radii
- **Effect**: Slices expand outward on hover, displaying both percentage and absolute TWh values
- **Why**: Visual expansion provides clear feedback, and the tooltip adds detailed breakdown

### 5. **Cross-Chart Highlighting** - Lifted State
- **Technique**: Shared state in `App.jsx` passed down to all charts via props
- **Effect**: Hovering over an energy source in any chart (legend or visual) highlights that same source across the entire dashboard
- **Why**: Helps users track a single energy source across different visualizations simultaneously

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

This builds the project and deploys to GitHub Pages automatically.

## Key Learnings

- **Tooltips need portals or absolute positioning** - Used absolute positioning with event clientX/clientY for smooth tracking
- **Crosshair requires precise coordinate math** - Used `xScale.invert()` to map mouse position back to data domain
- **Lifted state enables cross-chart interactions** - Single source of truth in parent component coordinates all child charts
- **Transitions improve UX** - All opacity and size changes use CSS/SVG transitions for smooth animations
- **D3 for math, React for rendering** - All DOM manipulation happens through React; D3 only handles scales, paths, and geometry

## Tech Stack

- React 19
- D3.js 7
- Vite
- GitHub Pages

---

Part of the [React Graph Gallery](https://react-graph-gallery.com) course - Hover Effect module
