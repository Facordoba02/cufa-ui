import React, { useState, useEffect, type ReactNode } from 'react';
import styles from './Slider.module.css';

// Definimos los tipos para las props
interface SliderProps {
  children: ReactNode[];
  autoplay?: boolean;
  dots?: boolean;
  interval?: number;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  autoplay = false,
  dots = true,
  interval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Efecto para el autoplay
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === children.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [autoplay, interval, children.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderWrapper}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className={styles.slide}>{child}</div>
        ))}
      </div>

      {dots && (
        <div className={styles.dotsContainer}>
          {children.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};