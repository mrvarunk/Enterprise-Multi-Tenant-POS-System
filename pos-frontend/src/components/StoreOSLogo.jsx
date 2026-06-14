import React from 'react';

export function StoreOSLogo({ className = 'w-10 h-10' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
    >
      {/* Background container wrapper */}
      <rect width="500" height="500" fill="#0F172A" rx="40" />

      {/* Brand Typography using pure SVG text */}
      <text
        x="50%"
        y="275"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="84"
        letterSpacing="-2"
      >
        <tspan fill="#FAFAFA">Store</tspan>
        <tspan fill="#F43F5E">OS</tspan>
      </text>
    </svg>
  );
}


