import {
  DndContext,
  DragOverlay,
  rectIntersection,
  UniqueIdentifier,
  useDndContext,
  useDraggable,
  useDroppable
} from '@dnd-kit/core';
import { useState } from 'react';
import { useSensor, MouseSensor, TouchSensor, useSensors, KeyboardSensor } from '@dnd-kit/core';

function Droppable({ children, id }: { children: React.ReactNode; id: number }) {
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
        background: 'blue'
      }}
    >
      {children}
    </div>
  );
}

function DraggableItem({}) {
  const { isDragging, setNodeRef, listeners } = useDraggable({
    id: 'draggable-item'
  });

  return (
    <div
      style={{
        opacity: isDragging ? 0 : undefined
      }}
    >
      <button {...listeners} ref={setNodeRef}>
        Drag me
      </button>
    </div>
  );
}

export function DraggableOverlay() {
  const { active } = useDndContext();

  return <DragOverlay>{active ? <DraggableItem /> : null}</DragOverlay>;
}

export default function DroppableStory() {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const item = <DraggableItem />;
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5
    }
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={({ over }) => {
        setParent(over ? over.id : null);
      }}
    >
      <div
        style={{
          height: '100px',
          width: '100px'
        }}
      >
        {parent === null ? item : null}
      </div>

      <div
        style={{
          height: '100px',
          width: '100px'
        }}
      >
        <Droppable id={1}>{parent === 1 ? item : null}</Droppable>
      </div>
      <DraggableOverlay />
    </DndContext>
  );
}
