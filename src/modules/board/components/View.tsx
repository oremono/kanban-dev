import React, { useState } from 'react';

import RenderWeek from './RenderWeek';
import AnimatedDays from './AnimatedDays';

const View = (props: any) => {
  const { loading, events, eventLen } = props;
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen">
      {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>}

      {!loading && (
        <>
          <div className="p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
            <div className="text-xl font-bold text-white">Your Schedule</div>

            {/* TODO - active */}
            <RenderWeek active={active} setActive={setActive} />
          </div>

          <AnimatedDays active={active} setActive={setActive} events={events} eventLen={eventLen} />
        </>
      )}
    </div>
  );
};

export default View;
