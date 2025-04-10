import React from 'react';
import { useDndMonitor, useDraggable } from '@dnd-kit/core';

const RenderCard = (props: any) => {
  const { card } = props;

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    node: draggingNode
  } = useDraggable({
    id: card.id,
    data: card
  });

  useDndMonitor({
    onDragStart(event) {
      if (draggingNode && card.id === event.active.id) {
        // handleDragStart(event);
      }
    },
    onDragEnd(event) {
      if (draggingNode) {
      }
    }
  });

  return (
    <div
      id={card.id}
      ref={setNodeRef}
      key={card.id}
      className={`flex flex-col my-3 rounded-lg overflow-hidden shadow-2xl${isDragging ? ' opacity-50' : ''}`}
      {...listeners}
      {...attributes}
    >
      <div className="relative overflow-hidden bg-sky-50 flex items-center" style={{ height: '200px' }}>
        <div className="absolute top-2 right-2 text-white text-xs p-1 rounded-xl bg-[linear-gradient(135deg,_#4f46e5,_#7c3aed)]">
          {card.time}
        </div>
        <img alt={card.id} src={card.imageUrl} width="100%" />
      </div>

      <div className="p-4">
        <div className="text-lg font-bold">{card.title}</div>
        <div className="text-sm text-gray-600">{card.description}</div>
      </div>
    </div>
  );
};

export default RenderCard;
