import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import content from "../assets/DoctorContent.json"; // Import the JSON content

const CarouselSection = () => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const updateMaxIndex = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const imageWidth = 256;
        const visibleImages = Math.floor(containerWidth / imageWidth);
        setMaxIndex(Math.max(0, content.images.length - visibleImages));
      }
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => window.removeEventListener("resize", updateMaxIndex);
  }, []);

  const scroll = (direction) => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return Math.max(0, Math.min(newIndex, maxIndex));
    });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: activeIndex * 256,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <section className="bg-gradient-to-r from-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-xl text-gray-600">{content.subtitle}</p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden space-x-4 scrollbar-hide"
          >
            {content.images.map((doctor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={doctor.url}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <p className="mt-2 text-center text-gray-900 font-semibold">
                  {doctor.name}
                </p>
                <p className="text-center text-gray-600">{doctor.specialty}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(-1)}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            disabled={activeIndex === 0}
          >
            <FaChevronLeft
              className={`text-gray-600 ${
                activeIndex === 0 ? "opacity-50" : ""
              }`}
            />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            disabled={activeIndex === maxIndex}
          >
            <FaChevronRight
              className={`text-gray-600 ${
                activeIndex === maxIndex ? "opacity-50" : ""
              }`}
            />
          </button>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-7 h-2 rounded-full ${
                index === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
