import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { GridCellComponent } from './GridCell';
import { GRID_SIZE } from '../utils/constants';

export const FloatingIsland: React.FC = () => {
  const { grid, selectedTool, placeOrRemove, rotateCell, repairCell, dayTime } = useGameStore();

  const handleCellClick = (x: number, y: number) => {
    const cell = grid[y][x];
    if (cell.faulty) {
      repairCell(x, y);
    } else {
      placeOrRemove(x, y);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    const cell = grid[y][x];
    if (cell.type === 'wire' && !cell.faulty) {
      rotateCell(x, y);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        const hovered = document.querySelector('.grid-cell:hover') as HTMLElement | null;
        if (hovered) {
          const x = parseInt(hovered.dataset.x || '0');
          const y = parseInt(hovered.dataset.y || '0');
          const cell = grid[y][x];
          if (cell.type === 'wire' && !cell.faulty) {
            rotateCell(x, y);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid, rotateCell]);

  const isNight = dayTime >= 50;

  return (
    <div className="relative">
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-32 rounded-[50%] blur-2xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative p-8 rounded-3xl animate-[float_6s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(180deg, #8D6E63 0%, #6D4C41 100%)',
          boxShadow: `
            0 20px 60px rgba(0,0,0,0.3),
            inset 0 2px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        <div
          className="absolute -top-4 left-4 right-4 h-8 rounded-t-full"
          style={{
            background: isNight
              ? 'linear-gradient(180deg, #2D5016 0%, #1B3D0F 100%)'
              : 'linear-gradient(180deg, #7CB342 0%, #558B2F 100%)',
          }}
        />
        <div
          className="absolute -top-2 left-8 right-8 h-4 rounded-t-full"
          style={{
            background: isNight
              ? 'linear-gradient(180deg, #3D6B1E 0%, #2D5016 100%)'
              : 'linear-gradient(180deg, #8BC34A 0%, #7CB342 100%)',
          }}
        />

        <div
          className="grid gap-0.5 p-2 rounded-2xl"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            background: isNight
              ? 'linear-gradient(135deg, #1a3a0f 0%, #0f2a08 100%)'
              : 'linear-gradient(135deg, #8BC34A 0%, #689F38 100%)',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div key={`${x}-${y}`} className="grid-cell" data-x={x} data-y={y}>
                <GridCellComponent
                  cell={cell}
                  selectedTool={selectedTool}
                  onClick={() => handleCellClick(x, y)}
                  onRightClick={(e) => handleCellRightClick(e, x, y)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};
