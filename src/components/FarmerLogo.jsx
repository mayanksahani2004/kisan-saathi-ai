// Custom SVG Farmer Logo Component
export default function FarmerLogo({ size = 80 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(22, 101, 52, 0.2))' }}
        >
            {/* Background Circle */}
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A574" />
                    <stop offset="100%" stopColor="#C4956A" />
                </linearGradient>
                <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8C00" />
                    <stop offset="100%" stopColor="#E67E00" />
                </linearGradient>
                <linearGradient id="wheatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4D03F" />
                    <stop offset="100%" stopColor="#D4AC0D" />
                </linearGradient>
            </defs>

            {/* Main circle */}
            <circle cx="100" cy="100" r="96" fill="url(#bgGrad)" />
            <circle cx="100" cy="100" r="90" fill="#ffffff" fillOpacity="0.15" />

            {/* Wheat stalks behind */}
            <g transform="translate(140, 50) rotate(15)">
                <line x1="0" y1="0" x2="0" y2="55" stroke="#D4AC0D" strokeWidth="2.5" />
                <ellipse cx="-4" cy="5" rx="4" ry="8" fill="url(#wheatGrad)" transform="rotate(-20)" />
                <ellipse cx="4" cy="5" rx="4" ry="8" fill="url(#wheatGrad)" transform="rotate(20)" />
                <ellipse cx="-4" cy="18" rx="4" ry="8" fill="url(#wheatGrad)" transform="rotate(-15)" />
                <ellipse cx="4" cy="18" rx="4" ry="8" fill="url(#wheatGrad)" transform="rotate(15)" />
                <ellipse cx="0" cy="-3" rx="3" ry="7" fill="url(#wheatGrad)" />
            </g>

            <g transform="translate(155, 55) rotate(25)">
                <line x1="0" y1="0" x2="0" y2="45" stroke="#D4AC0D" strokeWidth="2" />
                <ellipse cx="-3" cy="5" rx="3.5" ry="7" fill="url(#wheatGrad)" transform="rotate(-20)" />
                <ellipse cx="3" cy="5" rx="3.5" ry="7" fill="url(#wheatGrad)" transform="rotate(20)" />
                <ellipse cx="-3" cy="16" rx="3.5" ry="7" fill="url(#wheatGrad)" transform="rotate(-15)" />
                <ellipse cx="3" cy="16" rx="3.5" ry="7" fill="url(#wheatGrad)" transform="rotate(15)" />
                <ellipse cx="0" cy="-2" rx="3" ry="6" fill="url(#wheatGrad)" />
            </g>

            {/* Body/Shirt */}
            <path
                d="M65 145 Q65 125 80 118 Q100 108 120 118 Q135 125 135 145 L135 175 Q100 180 65 175 Z"
                fill="#2E7D32"
            />
            <path
                d="M70 145 Q70 128 83 122 Q100 113 117 122 Q130 128 130 145 L130 170 Q100 175 70 170 Z"
                fill="#388E3C"
            />

            {/* Neck */}
            <rect x="92" y="110" width="16" height="14" rx="3" fill="url(#skinGrad)" />

            {/* Face */}
            <ellipse cx="100" cy="90" rx="28" ry="30" fill="url(#skinGrad)" />

            {/* Turban */}
            <path
                d="M68 82 Q68 52 100 48 Q132 52 132 82 Q132 72 120 68 Q100 62 80 68 Q68 72 68 82 Z"
                fill="url(#turbanGrad)"
            />
            <path
                d="M72 80 Q72 60 100 55 Q128 60 128 80"
                fill="none"
                stroke="#FF9800"
                strokeWidth="6"
                strokeLinecap="round"
            />
            <path
                d="M75 76 Q75 62 100 58 Q125 62 125 76"
                fill="none"
                stroke="#FFB74D"
                strokeWidth="4"
                strokeLinecap="round"
            />

            {/* Eyes */}
            <ellipse cx="88" cy="88" rx="4" ry="4.5" fill="#3E2723" />
            <ellipse cx="112" cy="88" rx="4" ry="4.5" fill="#3E2723" />
            <circle cx="89.5" cy="86.5" r="1.5" fill="#ffffff" />
            <circle cx="113.5" cy="86.5" r="1.5" fill="#ffffff" />

            {/* Smile */}
            <path
                d="M90 100 Q100 110 110 100"
                fill="none"
                stroke="#5D4037"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Mustache */}
            <path
                d="M88 96 Q93 99 100 97 Q107 99 112 96"
                fill="#5D4037"
            />

            {/* Small leaf accent */}
            <g transform="translate(45, 140) rotate(-30)">
                <path
                    d="M0 0 Q8 -15 0 -25 Q-8 -15 0 0 Z"
                    fill="#4CAF50"
                />
                <line x1="0" y1="0" x2="0" y2="-22" stroke="#388E3C" strokeWidth="1" />
            </g>

            {/* Circular border */}
            <circle cx="100" cy="100" r="96" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.4" />
        </svg>
    );
}
