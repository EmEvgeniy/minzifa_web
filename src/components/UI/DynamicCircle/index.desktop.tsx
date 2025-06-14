'use client';
import React, { useState } from 'react';
import { items } from './const';

const EnvironmentCircle = () => {
  const radius = 225.5;
  const [activeLabel, setLabel] = useState<'env' | 'cult' | 'animal' | 'economy'>('env');

  const activeColor = '#27A430';
  const activeForeground = 'white';
  const inactiveForegroundColor = '#16372D';
  const inactiveColor = '#CFDFD9';

  const polarToCartesian = (angleDeg: number, r: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: r * Math.cos(angleRad),
      y: r * Math.sin(angleRad),
    };
  };

  return (
    <div className="my-[70px] container max-[768px]:hidden">
      <div className="bg-[#16372D] py-[40px]  rounded-[18px] shadow-2xl max-[1024px]:py-[30px]">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox="-585 -275 1170 550"
          fill="#16372D"
        >
          <defs>
            <pattern id="image" x="0%" y="0%" height="90%" width="90%">
              <image
                x="0"
                y="0"
                width="90%"
                height="90%"
                preserveAspectRatio="xMidYMid slice"
                href={items.find((item) => item.key === activeLabel)?.img}
              ></image>
            </pattern>
          </defs>

          <circle
            cx="0"
            cy="0"
            r={radius}
            stroke={activeColor}
            strokeWidth="2"
            // fill="url(#image)"
          />
          <rect x="-201" y="-201" width="402" height="402" rx="201.5" fill="url(#image)" />
          <rect
            x="-201"
            y="-201"
            width="402"
            height="402"
            rx="201.5"
            fill="#16372D"
            fillOpacity="0.35"
          />

          <text x="0" y="-10" textAnchor="middle" fontSize="20" fill="#ffffff" fontWeight="bold">
            We take care of
          </text>
          <text x="0" y="20" textAnchor="middle" fontSize="20" fill="#ffffff" fontWeight="bold">
            the environment
          </text>

          {/* Точки и текстовые блоки */}
          {items.map((item, i) => {
            const { x, y } = polarToCartesian(item.angle, radius);
            const labelX = x + (x > 0 ? 30 : -210); // смещение блока от точки
            const labelY = y - 25;

            return (
              <g key={i}>
                <circle
                  onClick={() => setLabel(item.key as typeof activeLabel)}
                  cx={x}
                  cy={y}
                  r={12}
                  fill={activeLabel === item.key ? activeColor : inactiveForegroundColor}
                  stroke="#27A430"
                />
                {/* Блок с текстом */}
                <foreignObject
                  x={labelX}
                  y={labelY}
                  width="180"
                  height="50"
                  style={{ overflow: 'visible' }}
                >
                  <div
                    onClick={() => setLabel(item.key as typeof activeLabel)}
                    // xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      backgroundColor: activeLabel === item.key ? activeColor : inactiveColor,
                      color: activeLabel === item.key ? activeForeground : inactiveForegroundColor,
                      borderRadius: '12px',
                      padding: '10px',
                      fontSize: '12px',
                      fontFamily: 'Arial, sans-serif',
                      textAlign: 'center',
                    }}
                  >
                    <span>{item.label}</span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default EnvironmentCircle;
