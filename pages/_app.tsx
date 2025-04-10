import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  KeyboardSensor,
  rectIntersection
} from '@dnd-kit/core';
import DragOverlay from '@/src/modules/components/DragOverlay';

export default function App({ Component, pageProps }: AppProps) {
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
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        autoScroll={{
          enabled: false,
          layoutShiftCompensation: false
        }}
      >
        <Component {...pageProps} />;
        <DragOverlay />
      </DndContext>
    </>
  );
}
