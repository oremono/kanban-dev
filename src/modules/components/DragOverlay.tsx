import React, { useEffect, useState } from 'react';
import { useDndMonitor, DragOverlay, useDndContext } from '@dnd-kit/core';

import RenderCard from '../board/components/RenderCard';

const DragOverlayComponent = () => {
  const { active } = useDndContext();
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
    return () => cleanup();
  }, []);

  return <DragOverlay>{active && <RenderCard card={card} disabled={true} preview={true} />}</DragOverlay>;
};

export default DragOverlayComponent;
