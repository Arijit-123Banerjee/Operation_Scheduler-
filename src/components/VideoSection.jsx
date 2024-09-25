import { useState } from "react";
import video from "../assets/videooperation.mp4";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-[#0284c7] font-semibold tracking-wide uppercase">
            Advanced Healthcare in Actionw
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Modern Technology & Equipment at Work
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative max-w-4xl w-full">
            <div className="bg-white rounded-t-3xl p-4 shadow-lg">
              <div className="bg-gray-100 h-full rounded-2xl overflow-hidden relative aspect-video">
                <video
                  className="w-full h-full object-cover"
                  src={video}
                  loop
                  muted
                  playsInline
                  ref={(el) => {
                    if (el) {
                      isPlaying ? el.play() : el.pause();
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="w-16 h-16 rounded-full bg-white/50 hover:bg-white/75 transition-colors flex items-center justify-center"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-8 w-8 text-gray-800" />
                    ) : (
                      <PlayIcon className="h-8 w-8 text-gray-800" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white h-4 rounded-b-3xl shadow-lg"></div>
            <div className="mx-auto w-1/3 h-4 bg-gray-200 rounded-b-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PlayIcon(props) {
  return (
    <svg
      {...props}
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
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
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  );
}

export default VideoSection;
