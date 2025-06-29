'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] 
          h-[350px] w-[90%] 
          sm:h-[400px] sm:w-[85%] 
          md:h-[450px] md:w-[75%] 
          lg:w-[70%]
          rounded-md 
          p-4 sm:p-6 md:p-8 lg:p-10 
          origin-top`}
      >
        <h2 className='text-lg sm:text-xl md:text-2xl text-center font-semibold mb-3 sm:mb-4 md:mb-5'>
          {title}
        </h2>
        <div className={`flex flex-col md:flex-row h-full gap-4 sm:gap-6 md:gap-8 lg:gap-10`}>
          <div className={`w-full md:w-[40%] relative md:top-[10%]`}>
            <p className='text-xs sm:text-sm mb-2 leading-relaxed'>{description}</p>
            <span className='flex items-center gap-2 pt-1 sm:pt-2'>
              <a
                href={'#'}
                target='_blank'
                className='underline cursor-pointer text-xs sm:text-sm hover:no-underline transition-all'
              >
                See more
              </a>
              <svg
                width='18'
                height='10'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='sm:w-[22px] sm:h-[12px]'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div className={`relative w-full md:w-[60%] h-full rounded-lg overflow-hidden`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img 
                src={url} 
                alt='image' 
                className='absolute inset-0 w-full h-full object-cover' 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-background' ref={container}>
        <section className='w-full bg-background px-2 sm:px-0'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        <footer className='group bg-background'>
          <div className='bg-background h-20 relative z-10'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;