import React, { useEffect, useState } from 'react';
import { useDndMonitor, DragOverlay } from '@dnd-kit/core';

import RenderCard from '../board/components/RenderCard';

const DragOverlayComponent = () => {
  const [card, setCard] = useState(null);

  useDndMonitor({
    onDragStart: event => {
      // @ts-ignore
      setCard(event?.active?.data?.current);

      // pauseScroll();
    },
    onDragEnd: () => cleanup(),
    onDragCancel: () => cleanup()
  });

  const cleanup = () => {
    setCard(null);
  };

  useEffect(() => {
    return () => cleanup(); // Cleanup on component unmount
  }, []);

  return (
    <DragOverlay dropAnimation={null}>
      <RenderCard card={card} />
    </DragOverlay>
  );
};

export default DragOverlayComponent;
