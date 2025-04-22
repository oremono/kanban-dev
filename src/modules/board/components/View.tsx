import React, { useEffect, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

import useResponsive from '@hooks/useResponsive';
import useAppContext from '@hooks/useAppContext';
import { EventsByDate, EventsByWeek } from '@/pages/api/board';

import RenderWeek from './RenderWeek';
import AnimatedDays from './AnimatedDays';
import RenderDay from './RenderDay';

const View = (props: any) => {
  const { loading } = props;
  const { isMobile, isDesktop } = useResponsive();
  const [active, setActive] = useState(0);
  const [events, setEvents] = useState<EventsByDate>({});
  const [weekEvents, setWeekEvents] = useState<EventsByWeek>({});
  const { activeDetails } = useAppContext();

  useEffect(() => {
    if (!loading && Object.keys(props.weekEvents).length) {
      const weeks = Object.keys(props.weekEvents);
      setEvents(props.weekEvents[weeks[0]]);
      setWeekEvents(props.weekEvents);
    }
  }, [loading]);

  const handleMoveEvent = (from: string, to: string, id: UniqueIdentifier) => {
    if (from == to) return;
    if (isMobile) {
      const activeDate = Object.keys(events)[active];
      if (activeDate != to) return;
      setEvents(prev => {
        const newEvents = { ...prev };
        const event = newEvents[from].find((event: any) => event.id === id);
        if (!event) return prev;
        newEvents[from] = newEvents[from].filter((event: any) => event.id !== id);
        newEvents[to] = [...newEvents[to], { ...event, date: to }];
        return newEvents;
      });
      return;
    }

    setWeekEvents(prev => {
      const newWeekEvents: EventsByWeek = { ...prev };
      const week = parseInt(Object.keys(newWeekEvents).find((week: string) => newWeekEvents[parseInt(week)][from]) ?? '0');
      if (!week) return prev;
      const event = newWeekEvents[week][from].find((event: any) => event.id === id);
      if (!event) return prev;
      newWeekEvents[week][from] = newWeekEvents[week][from].filter((event: any) => event.id !== id);
      newWeekEvents[week][to] = [...newWeekEvents[week][to], { ...event, date: to }];
      return newWeekEvents;
    });
  };

  return (
    <div className="min-h-screen">
      {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>}

      {!loading && isMobile && (
        <>
          {!activeDetails && (
            <div className="p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
              <div className="text-xl font-bold text-white">Your Schedule</div>

              <RenderWeek active={active} setActive={setActive} />
            </div>
          )}

          <AnimatedDays active={active} setActive={setActive} eventLen={Object.keys(events).length}>
            {Object.keys(events)?.map(key => (
              <RenderDay
                key={`render_day-${key}`}
                week={0}
                active={0}
                date={key}
                day={events[key]}
                handleMoveEvent={handleMoveEvent}
              />
            ))}
          </AnimatedDays>
        </>
      )}

      {!loading && isDesktop && (
        <>
          <div className="flex flex-row items-center p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
            <div className="text-xl font-bold text-white">Your Schedule</div>
          </div>

          <AnimatedDays active={active} setActive={setActive} eventLen={Object.keys(weekEvents).length} showControls={true}>
            {Object.keys(weekEvents)?.map(week => (
              <div key={`weekEvents-${week}`} className="flex flex-row justify-between overflow-x-auto w-full">
                {Object.keys(weekEvents[parseInt(week)])?.map(key => (
                  <div key={`render_day-${key}`} className="mx-2">
                    <RenderDay
                      week={parseInt(week) - 1}
                      active={active}
                      date={key}
                      day={weekEvents[parseInt(week)][key]}
                      handleMoveEvent={handleMoveEvent}
                    />
                  </div>
                ))}
              </div>
            ))}
          </AnimatedDays>
        </>
      )}
    </div>
  );
};

export default View;
