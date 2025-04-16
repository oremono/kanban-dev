import { useDraggable } from '@dnd-kit/core';
import * as React from 'react';

const Draggable = (props: any) => {
  const { card, activeDetails, showDetails } = props;
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: card.id,
    data: card,
    disabled: showDetails
  });

  return (
    <div
      id={card.id}
      ref={setNodeRef}
      key={card.id}
      className={`flex flex-col${activeDetails == null ? ' my-4' : ''}${isDragging ? ' opacity-50' : ''}`}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};

export default Draggable;
