import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPawprints, setShowPawprints] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload images
    const imagesToLoad = [
      "https://res.cloudinary.com/dg8flcdqo/image/upload/v1762443216/Purrfect_welcome_49_qe06cx.png",
      "https://res.cloudinary.com/dg8flcdqo/image/upload/v1762443217/Purrfect_welcome_50_bzmvos.png",
    ];

    let loaded = 0;
    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadProgress((loaded / imagesToLoad.length) * 100);
        if (loaded === imagesToLoad.length) {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      img.src = src;
    });

    // Setup background music
    audioRef.current = new Audio(
      "https://res.cloudinary.com/dg8flcdqo/video/upload/v1760284035/Kitty_Down_the_Stairs_-_Joel_Cummins_wejais.mp3"
    );
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;
    // Iframe-friendly audio - requires user interaction
    const playAudio = () => {
      audioRef.current?.play().catch(() => {});
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleEnter = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const doorSound = new Audio(
      "https://res.cloudinary.com/dg8flcdqo/video/upload/v1760264513/shop_bell_inc44w.wav"
    );
    doorSound.volume = 0.6;
    doorSound.play();
    setShowPawprints(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-mint flex items-center justify-center">
        <div className="text-center max-w-xs">
          <div className="w-15 h-15 mx-auto mb-5 bg-brown rounded-[50%_50%_45%_45%] animate-pawBounce relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-5 before:h-5 before:bg-brown before:rounded-full" />
          <div className="text-brown text-lg font-semibold mb-4 animate-textPulse">
            Brewing your experience...
          </div>
          <div className="w-50 h-1 bg-brown/30 rounded-sm overflow-hidden mx-auto">
            <div
              className="h-full bg-brown rounded-sm transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-mint overflow-hidden" style={{ height: '100vh', width: '100vw' }}>
      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="fixed top-5 right-5 w-12 h-12 bg-cream border-3 border-brown rounded-full flex items-center justify-center z-50 transition-transform hover:scale-110 focus-visible:outline-3 focus-visible:outline-brown focus-visible:outline-offset-4"
        aria-label="Toggle background music"
      >
        {isMuted ? (
          <svg
            className="text-brown"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            className="text-brown"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Top right paw - masked by corner */}
      <img
        src="https://res.cloudinary.com/dg8flcdqo/image/upload/v1762443217/Purrfect_welcome_50_bzmvos.png"
        alt=""
        className="fixed -top-32 -right-32 w-[500px] h-auto animate-slideInTopRight pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom left paw - masked by corner */}
      <img
        src="https://res.cloudinary.com/dg8flcdqo/image/upload/v1762443216/Purrfect_welcome_49_qe06cx.png"
        alt=""
        className="fixed -bottom-32 -left-32 w-[500px] h-auto animate-slideInBottomLeft pointer-events-none"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-[min(88vw,700px)] text-center z-10">
          <div className="relative bg-transparent rounded-2xl p-10 pb-11">
            <h1 className="mb-4 text-brown font-bold text-[3.5rem] leading-tight tracking-tight">
              {"Purrkins Café".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 animate-letterAppear"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            <p className="mb-8 text-brown text-lg font-semibold opacity-90">
              Your safe space to brew confidence and skill
            </p>

            <button
              onClick={handleEnter}
              className="inline-block bg-orange text-white border-none rounded-full px-10 py-3.5 text-lg font-bold transition-all hover:bg-[#cf6b31] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-brown focus-visible:outline-offset-4 min-w-[180px] relative overflow-hidden"
            >
              Enter Café
              <span className="block text-xs font-semibold opacity-80 mt-1">
                (Press Enter)
              </span>
            </button>

            {/* Pawprint trail */}
            {showPawprints && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[180px] h-[400px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`absolute ${i % 2 === 0 ? "left-[35%]" : "left-[55%]"}`}
                    style={{
                      top: `${20 + i * 40}px`,
                      animation: `pawAppear 0.35s ease forwards`,
                      animationDelay: `${0.1 + i * 0.25}s`,
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute top-0 -left-1 w-[11px] h-[14px] bg-pawColor rounded-[50%_50%_45%_45%] -rotate-[25deg]" />
                      <div className="absolute -top-1 left-2 w-[11px] h-[14px] bg-pawColor rounded-[50%_50%_45%_45%] -rotate-[5deg]" />
                      <div className="absolute -top-1 right-2 w-[11px] h-[14px] bg-pawColor rounded-[50%_50%_45%_45%] rotate-[5deg]" />
                      <div className="absolute top-0 -right-1 w-[11px] h-[14px] bg-pawColor rounded-[50%_50%_45%_45%] rotate-[25deg]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-[22px] bg-pawColor rounded-[50%_50%_65%_65%]" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
