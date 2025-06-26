"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


interface FeaturesProps {
  features: {
    id: number;
    icon?: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function Features({
  features,
  primaryColor,
  progressGradientLight,
  progressGradientDark,
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="space-y-4 sm:space-y-6 lg:space-y-8 
                       md:space-x-0 lg:space-x-0 
                       overflow-x-auto lg:overflow-visible 
                       flex flex-col sm:flex-col lg:flex-col 
                       order-2 lg:order-1 
                       pb-4 lg:pb-0 
                       scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Feature Content */}
                  <div
                    className={`
                    flex flex-col sm:flex-row lg:flex-row items-start 
                    space-y-2 sm:space-y-0 sm:space-x-4 
                    p-3 sm:p-4 lg:p-3 
                    w-full sm:max-w-full lg:max-w-2xl 
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-white dark:bg-black/80 shadow-lg sm:shadow-xl dark:drop-shadow-lg rounded-xl border sm:border border-gray-200 dark:border-none"
                        : "hover:bg-gray-50/50 dark:hover:bg-white/5 rounded-lg"
                    }
                  `}
                  >
                    

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <h3
                        className={`
                        text-base sm:text-lg 
                        font-semibold mb-1 sm:mb-2 
                        transition-colors duration-300
                        ${
                          isActive
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-white/80"
                        }
                      `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                        transition-colors duration-300 
                        text-xs sm:text-sm 
                        leading-relaxed
                        ${
                          isActive
                            ? "text-gray-600 dark:text-white/60"
                            : "text-gray-500 dark:text-white/40"
                        }
                      `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-3 sm:mt-4 bg-white dark:bg-black/80 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight} dark:${progressGradientDark}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Image Display */}
          <div className="relative order-1 lg:order-2 w-full max-w-lg mx-auto lg:max-w-none">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-xl sm:rounded-2xl border dark:border-none border-gray-50 shadow-md sm:shadow-lg dark:drop-shadow-lg">
                <Image
                  src={features[currentFeature].image}
                  alt={features[currentFeature].title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
