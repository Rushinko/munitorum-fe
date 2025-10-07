import { motion } from 'framer-motion';

type AnimateHeightChangeDivProps = {
  children: React.ReactNode;
  className?: string;
}

import React from 'react'

export default function AnimateHeightChangeDiv({ children, className }: AnimateHeightChangeDivProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | 'auto'>('auto');

  React.useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // only one entry since we are observing only one element
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });
      resizeObserver.observe(containerRef.current);

      // Cleanup on unmount
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <motion.div style={{ height }} layout animate={{ height }} transition={{ duration: 0.3 }} className={`${className} overflow-hidden`}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </motion.div>
  )
}
