import React, { useState, useEffect } from 'react';
import './BulbToggle.css';

const BulbToggle = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isOn);
  }, [isOn]);

  return (
    <div className="svg-bulb-container" onClick={() => setIsOn(prev => !prev)}>
      <svg
        className={`bulb-svg ${isOn ? 'bulb-on' : 'bulb-off'}`}
        width="60"
        height="150"
        viewBox="0 0 60 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rope */}
        <line x1="30" y1="0" x2="30" y2="40" stroke="#555" strokeWidth="2" />

        {/* Bulb */}
        <g className="bulb-body">
          <circle cx="30" cy="70" r="20" fill={isOn ? "#FFD700" : "#444"} />
          <rect x="25" y="90" width="10" height="15" fill="#999" />
        </g>

        {/* Glow (optional) */}
        {isOn && (
          <circle
            cx="30"
            cy="70"
            r="30"
            fill="url(#glow)"
            opacity="0.5"
          />
        )}

        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#ffff99" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default BulbToggle;
