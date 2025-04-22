import React from 'react';
import { UniqueIdentifier, useDndContext, useDndMonitor, useDroppable } from '@dnd-kit/core';

import { Event } from '@/pages/api/board';
import { formatDate } from '@helpers/utils';
import useAppContext from '@hooks/useAppContext';
import useResponsive from '@/src/hooks/useResponsive';
import AnimateVisibility from '@modules/components/AnimatVisibility';

import RenderCard from './RenderCard';
import Draggable from '../../components/Draggable';

interface RenderDayProps {
  date: string;
  day: Event[];
  handleMoveEvent: (from: string, to: string, id: UniqueIdentifier) => void;
  week: number;
  active: number;
}

const RenderDay = (props: RenderDayProps) => {
  const { date = '', day = [], handleMoveEvent, week, active: page } = props;
  const { active } = useDndContext();
  const { activeDetails } = useAppContext();
  const { isMobile, isDesktop } = useResponsive();

  const { isOver, setNodeRef } = useDroppable({
    id: date,
    data: {
      date,
      day,
      activeDetails
    },
    disabled: false
  });

  const renderCard = (card: Event, idx: number) => <RenderCard key={idx} card={card} />;

  useDndMonitor({
    onDragEnd: event => {
      if (!event.active.data.current) return;
      if (isDesktop && !isOver) return;
      handleMoveEvent(event.active.data.current.date, date, event.active.id);
    }
  });

  return (
    <div ref={setNodeRef} className={`flex flex-col${!activeDetails && isMobile ? ' m-6' : ''}`}>
      <AnimateVisibility visible={!activeDetails}>
        <div className="flex flex-row items-center">
          <div className="min-w-fit font-bold text-grey text-xl text-neutral-900 line-limit">{formatDate(date)}</div>
          <div className="w-full mx-3">
            <hr />
          </div>
        </div>
      </AnimateVisibility>

      <div className="flex flex-col items-center min-h-screen">
        {day?.map((card: Event, idx: number) =>
          week == page ? (
            <Draggable key={`Draggable-${idx}`} card={card} activeDetails={activeDetails ?? null}>
              {renderCard(card, idx)}
            </Draggable>
          ) : (
            renderCard(card, idx)
          )
        )}

        {!isOver && day?.length === 0 && (
          <AnimateVisibility visible={!activeDetails}>
            <div className="flex flex-col items-center justify-center w-full h-[50vh]">
              <div className="text-xl font-bold text-gray-500">No events</div>
            </div>
          </AnimateVisibility>
        )}

        <div className={`m-4${isOver && active?.data?.current?.date != date ? ' opacity-100' : ' opacity-0'}`}>
          <div className="flex flex-col items-center justify-center border border-dashed border-4 text-gray-500 py-4 px-10">
            <div className="text-gray-500" style={{ fontSize: '5rem' }}>
              &oplus;
            </div>
            <div className="text-xl font-bold">Drop Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderDay;
