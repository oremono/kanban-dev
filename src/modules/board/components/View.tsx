import React, { useState, useEffect } from 'react';

import RenderWeek from './RenderWeek';
import RenderDay from './RenderDay';

const View = (props: any) => {
  const { loading, events } = props;
  const [active, setActive] = useState(12);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    if (loading) return;
    const dates = Object.keys(events) ?? [];
    if (!dates?.length) return;
    const activeDate: string = dates.find(i => i.includes(String(active)))! ?? events[dates[0]];
    setActiveDate(activeDate);
    setActiveData(events[activeDate]);
  }, [loading, events, active]);

  return (
    <div className="min-h-screen">
      {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>}

      {!loading && (
        <>
          <div className="p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
            <div className="text-xl font-bold text-white">Your Schedule</div>

            {/* TODO - active */}
            <RenderWeek active={active} />
          </div>

          <RenderDay date={activeDate} day={activeData} />
        </>
      )}
    </div>
  );
};

export default View;
