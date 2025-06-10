import { useState, useEffect } from 'react';

type ScrollDataType = {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
};
export default function useScrollListener(): ScrollDataType {
  const [data, setData] = useState<ScrollDataType>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });

  // set up event listeners
  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          x: window.scrollX,
          y: window.scrollY,
          lastX: last.x,
          lastY: last.y,
        };
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return data;
}

export type { ScrollDataType };
