import React, { useState, MouseEvent as ReactMouseEvent, useRef } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';

import RenderDay from './RenderDay';
import { useDndMonitor } from '@dnd-kit/core';

const DRAG_THRESHOLD = 150;
const FALLBACK_WIDTH = 180;

const AnimatedDays = (props: any) => {
  const { active, setActive, events, eventLen } = props;
  const [drag, setDrag] = useState<'x' | boolean>('x');
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const canScrollPrev = active > 0;
  const canScrollNext = active < eventLen - 1;
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150
  });

  function handleDragSnap(_: MouseEvent, { offset: { x: dragOffset } }: PanInfo) {
    containerRef.current?.removeAttribute('data-dragging');
    animatedX.stop();

    const currentOffset = offsetX.get();
    if (
      !drag ||
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }

    const prevItemWidth = itemsRef.current[active - 1]?.offsetWidth ?? FALLBACK_WIDTH;
    const nextItemWidth = itemsRef.current[active + 1]?.offsetWidth ?? FALLBACK_WIDTH;

    if (dragOffset > 0) {
      // Go prev
      offsetX.set(currentOffset + prevItemWidth);
      setActive(active - 1);
      return;
    }

    // Go next
    offsetX.set(currentOffset - nextItemWidth);
    setActive(active + 1);
  }

  useDndMonitor({
    onDragStart: () => setDrag(false),
    onDragEnd: () => setDrag('x')
  });

  return (
    <div className="relative overflow-hidden">
      <motion.ul
        ref={containerRef}
        className="flex items-start"
        style={{
          x: animatedX
        }}
        drag={drag}
        // dragConstraints={{
        //   left: -(FALLBACK_WIDTH * (eventLen - 1)),
        //   right: FALLBACK_WIDTH
        // }}
        onDragStart={() => {
          containerRef.current?.setAttribute('data-dragging', 'true');
        }}
        onDragEnd={handleDragSnap}
      >
        {Object.keys(events)?.map((key, index) => (
          <motion.li
            layout
            key={`${events[key].id}-${index}`}
            // @ts-ignore
            ref={el => (itemsRef.current[index] = el)}
            className={'group relative shrink-0 select-none px-3 transition-opacity duration-300'}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
            style={{ width: '100%' }}
          >
            <RenderDay date={key} day={events[key]} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default AnimatedDays;
