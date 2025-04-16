import React, { useEffect, useState } from 'react';

import useResponsive from '@hooks/useResponsive';
import useAppContext from '@hooks/useAppContext';
import { EventsByDate } from '@/pages/api/board';

import RenderWeek from './RenderWeek';
import AnimatedDays from './AnimatedDays';
import RenderDay from './RenderDay';

const View = (props: any) => {
  const { loading, weekEvents } = props;
  const { isMobile, isDesktop } = useResponsive();
  const [active, setActive] = useState(0);
  const [events, setEvents] = useState<EventsByDate>({});
  const { activeDetails } = useAppContext();

  useEffect(() => {
    if (!loading && Object.keys(weekEvents).length) {
      if (isMobile) {
        const weeks = Object.keys(weekEvents);
        setEvents(weekEvents[weeks[0]]);
        return;
      }
    }
  }, [loading]);

  const handleMoveEvent = (from: string, to: string, id: string) => {
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

          <AnimatedDays
            active={active}
            setActive={setActive}
            eventLen={Object.keys(events).length}
            handleMoveEvent={handleMoveEvent}
          >
            {Object.keys(events)?.map(key => (
              <RenderDay key={`render_day-${key}`} date={key} day={events[key]} handleMoveEvent={handleMoveEvent} />
            ))}
          </AnimatedDays>
        </>
      )}

      {!loading && isDesktop && (
        <>
          <div className="flex flex-row items-center p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
            <div className="text-xl font-bold text-white">Your Schedule</div>
          </div>

          <AnimatedDays
            active={active}
            setActive={setActive}
            eventLen={Object.keys(weekEvents).length}
            showControls={true}
            handleMoveEvent={handleMoveEvent}
          >
            {Object.keys(weekEvents)?.map(week => (
              <div key={`weekEvents-${week}`} className="flex flex-row justify-between my-2 overflow-x-auto w-full">
                {Object.keys(weekEvents[week])?.map(key => (
                  <RenderDay
                    key={`render_day-${key}`}
                    date={key}
                    day={weekEvents[week][key]}
                    handleMoveEvent={handleMoveEvent}
                  />
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
