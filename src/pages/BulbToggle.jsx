import React, { useState, useEffect, useRef } from 'react';
// import clickSound from './click.mp3'; // 🎵 Add your sound file here
import './BulbToggle.css'; // For keyframes only

const BulbToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const [isPulled, setIsPulled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isOn);
  }, [isOn]);

  const toggleBulb = () => {
    setIsPulled(true);
    audioRef.current?.play();
    setTimeout(() => {
      setIsPulled(false);
      setIsOn(prev => !prev);
    }, 300); // rope retracts
  };

  return (
    <div className={`transition-all duration-300 ${isPulled ? 'bulb-swing' : ''}`}>
    <div className="flex justify-center items-center w-16 h-40 relative cursor-pointer" onClick={toggleBulb}>
      {/* SVG */}
      <svg className={`transition-all duration-300 ${isPulled ? 'animate-pull' : ''}`} width="60" height="110" viewBox="0 0 60 150">
        {/* Rope */}
        <line x1="30" y1="0" x2="30" y2="25" stroke="#444" strokeWidth="2" />

        {/* Pull string */}
        <line  x1="30" y1="25" x2="30" y2="65" stroke="#aaa" strokeWidth="2" className={`${isPulled ? 'stroke-red-400' : 'stroke-gray-400'}`} />
        <circle cx="30" cy="65" r="4" fill="#999" />

        {/* Bulb */}
        <g className={`bulb-body ${isOn ? 'bulb-bounce' : ''}`}>
        <g className="bulb-body">
          <circle cx="30" cy="90" r="16" fill={isOn ? "#FFD700" : "#333"} />
          <rect x="25" y="106" width="10" height="6" fill="#999" />
        </g>
        </g>

        {/* Glow */}
        {isOn && (
          <circle cx="30" cy="90" r="24" fill="url(#glow)" opacity="0.4" />
        )}

        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#fffca1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

    </div>
    </div>
  );
};

export default BulbToggle;
