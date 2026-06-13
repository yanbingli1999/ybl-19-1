import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { TICK_INTERVAL } from '../utils/constants';

export function useGameLoop() {
  const tick = useGameStore((state) => state.tick);
  const tickRef = useRef(tick);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current();
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, []);
}
