function AntiConfetti() {
  return (
    <svg
      style={{
        position: "fixed", // Ensures it overlays the entire viewport
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // Prevents interaction with the SVG
        zIndex: 10, // Ensures it appears on top of other content
      }}
    >
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={`${Math.random() * 100}%`}
          cy="0"
          r="5"
          fill="gray"
          style={{
            animation: `fall ${2 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random()}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default AntiConfetti
