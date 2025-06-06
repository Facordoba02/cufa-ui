import React, { useState, useEffect } from 'react';
import type { SliderProps } from './Slider.types';
import styles from './Slider.module.css';

export const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  className,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % children.length),
      autoPlayInterval
    );
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, children.length]);

  const goTo = (i: number) => setIndex(i);

  return (
    <div className={`${styles.slider} ${className ?? ''}`}>
      {showArrows && (
        <button
          className={styles.arrow}
          onClick={() => goTo((index - 1 + children.length) % children.length)}
          aria-label="Previous"
        >
          &lt;
        </button>
      )}
      <div className={styles.slide}>
        {children[index]}
      </div>
      {showArrows && (
        <button
          className={styles.arrow}
          onClick={() => goTo((index + 1) % children.length)}
          aria-label="Next"
        >
          &gt;
        </button>
      )}
      <div className={styles.dots}>
        {children.map((_, i) => (
          <button
            key={i}
            className={index === i ? styles.activeDot : styles.dot}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};