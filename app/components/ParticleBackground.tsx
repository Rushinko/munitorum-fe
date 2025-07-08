import React from 'react';

const ParticleBackground: React.FC = () => {
  const columnCount = 100; // Fixed number of columns
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const columns = Array.from({ length: columnCount }).map(() => {
    const columnLength = Math.floor(Math.random() * 30 + 20); // Random length for each column
    let columnString = '';
    for (let i = 0; i < columnLength; i++) {
      columnString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return columnString;
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black overflow-hidden z-[-1]">
      <div className="absolute inset-0 flex justify-between">
        {columns.map((column, index) => (
          <div
            key={index}
            className="text-green-500 font-mono text-sm whitespace-nowrap"
            style={{
              animation: `fall ${Math.random() * 8 + 6}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              writingMode: 'vertical-rl',
              textOrientation: 'upright',
            }}
          >
            {column.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="opacity-70 first:text-white first:opacity-100"
                style={{
                  animation: `glow 2.5s ease-in-out infinite`,
                  animationDelay: `${charIndex * 0.1}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;