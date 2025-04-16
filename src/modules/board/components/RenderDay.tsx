import React from 'react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';

import { Event } from '@/pages/api/board';
import { formatDate } from '@helpers/utils';
import useAppContext from '@hooks/useAppContext';
import AnimateVisibility from '@modules/components/AnimatVisibility';

import RenderCard from './RenderCard';
import Draggable from '../../components/Draggable';

const RenderDay = (props: any) => {
  const { date = '', day = [], handleMoveEvent } = props;
  const { activeDetails } = useAppContext();

  const { setNodeRef } = useDroppable({
    id: date,
    data: {
      date,
      day,
      activeDetails
    },
    disabled: false
  });

  useDndMonitor({
    onDragEnd: event => {
      if (!event.active.data.current) return;
      handleMoveEvent(event.active.data.current.date, date, event.active.id);
    }
  });

  return (
    <div ref={setNodeRef} className={`flex flex-col${!activeDetails ? ' m-6' : ''}`} style={{ border: '1px solid red' }}>
      <AnimateVisibility visible={!activeDetails}>
        <div className="flex flex-row items-center">
          <div className="min-w-fit font-bold text-grey text-xl text-neutral-900">{formatDate(date)}</div>
          <div className="w-full mx-3">
            <hr />
          </div>
        </div>
      </AnimateVisibility>

      <div className="flex flex-col items-center min-h-screen">
        {day?.map((card: Event, idx: number) => (
          <Draggable card={card} activeDetails={activeDetails}>
            <RenderCard key={idx} card={card} />
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default RenderDay;
