import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import { DragMoveEvent, useDndMonitor } from '@dnd-kit/core';

import useAppContext from '@hooks/useAppContext';

import RenderDay from './RenderDay';

const DRAG_THRESHOLD = 150;
const FALLBACK_WIDTH = 180;
const EDGE_THRESHOLD = 80;
const EDGE_HOLD_DURATION = 1500;

const AnimatedDays = (props: any) => {
  const { active, setActive, events, eventLen } = props;

  const { activeDetails } = useAppContext();
  const [drag, setDrag] = useState<'x' | boolean>('x');
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const leftEdgeTimer = useRef<NodeJS.Timeout | null>(null);
  const rightEdgeTimer = useRef<NodeJS.Timeout | null>(null);

  const canScrollPrev = active > 0;
  const canScrollNext = active < eventLen - 1;
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150
  });

  const getClientX = (e: Event): number => {
    if ((e as TouchEvent).touches?.[0]) {
      return (e as TouchEvent).touches[0].clientX;
    } else if ((e as MouseEvent).clientX !== undefined) {
      return (e as MouseEvent).clientX;
    }
    return 0;
  };

  useDndMonitor({
    onDragStart: () => setDrag(false),
    onDragMove: (event: DragMoveEvent) => {
      const x = event.delta.x + getClientX(event.activatorEvent);

      // Left Edge Detection
      if (x < EDGE_THRESHOLD) {
        if (!leftEdgeTimer.current) {
          leftEdgeTimer.current = setTimeout(() => {
            scrollPrev();
            leftEdgeTimer.current = null; // reset after trigger
          }, EDGE_HOLD_DURATION);
        }
      } else {
        clearTimeout(leftEdgeTimer.current!);
        leftEdgeTimer.current = null;
      }

      // Right Edge Detection
      const screenWidth = window.innerWidth;
      if (x > screenWidth - EDGE_THRESHOLD) {
        if (!rightEdgeTimer.current) {
          rightEdgeTimer.current = setTimeout(() => {
            scrollNext();
            rightEdgeTimer.current = null;
          }, EDGE_HOLD_DURATION);
        }
      } else {
        clearTimeout(rightEdgeTimer.current!);
        rightEdgeTimer.current = null;
      }
    },
    onDragEnd: () => setDrag('x')
  });

  useEffect(() => {
    handleScroll(active);
  }, [active]);

  function handleDragSnap(_: MouseEvent, { offset: { x: dragOffset } }: PanInfo) {
    containerRef.current?.removeAttribute('data-dragging');
    animatedX.stop();

    const currentOffset = offsetX.get();
    if (
      activeDetails ||
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

  const handleScroll = (to: number) => {
    if (to < 0 || to >= eventLen) return;

    const width = itemsRef.current.at(0)?.getBoundingClientRect().width;
    if (width === undefined) return;
    const widthArr = [...Array(eventLen).keys()].map((_, i) => i * width);
    const nextWidth = widthArr[to];
    if (nextWidth === undefined) return;
    offsetX.set(-nextWidth);
    setActive(to);
  };

  const scrollPrev = () => {
    if (!canScrollPrev) return;

    const nextWidth = itemsRef.current.at(active - 1)?.getBoundingClientRect().width;
    if (nextWidth === undefined) return;
    offsetX.set(offsetX.get() + nextWidth);

    setActive((prev: number) => prev - 1);
  };

  const scrollNext = () => {
    if (!canScrollNext) return;

    const nextWidth = itemsRef.current.at(active + 1)?.getBoundingClientRect().width;
    if (nextWidth === undefined) return;
    offsetX.set(offsetX.get() - nextWidth);

    setActive((prev: number) => prev + 1);
  };

  return (
    <div className={`relative overflow-x-hidden min-h-screen`}>
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
          // if (activeDetails) setDrag(false);
          containerRef.current?.setAttribute('data-dragging', 'true');
        }}
        onDragEnd={handleDragSnap}
      >
        {Object.keys(events)?.map((key, index) => (
          <motion.li
            key={`${events[key].id}-${index}`}
            // @ts-ignore
            ref={el => (itemsRef.current[index] = el)}
            className={`relative group shrink-0 select-none transition-opacity duration-300`}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
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
