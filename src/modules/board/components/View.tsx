import React, { useState } from 'react';

import useResponsive from '@hooks/useResponsive';
import useAppContext from '@hooks/useAppContext';

import RenderWeek from './RenderWeek';
import AnimatedDays from './AnimatedDays';

const View = (props: any) => {
  const { loading, events, eventLen } = props;
  const { isMobile, isDesktop } = useResponsive();
  const [active, setActive] = useState(0);
  const { activeDetails } = useAppContext();

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

          <AnimatedDays active={active} setActive={setActive} events={events} eventLen={eventLen} />
        </>
      )}

      {!loading && isDesktop && (
        <>
          <div className="flex justify-center items-center min-h-screen">Under Dev Switch to Mobile mode</div>
        </>
      )}
    </div>
  );
};

export default View;
