import React from 'react';

import RenderWeek from './RenderWeek';
// import RenderDay from './RenderDay';

const View = (props: any) => {
  const { loading, events } = props;

  return (
    <div className="min-h-screen">
      {loading && <div className="flex justify-center items-center min-h-screen">Loading...</div>}

      {!loading && (
        <>
          {/* <div className="min-h-screen bg-[linear-gradient(135deg,_rgba(139,92,246,0)_0%,_rgba(59,130,246,0.1698)_2%,_rgba(139,92,246,0.518)_100%)]"> */}
          <div className="p-4 w-full bg-[linear-gradient(to_right,_#3b82f6,_#8b5cf6)]">
            <div className="text-4xl font-bold text-white">Your Schedule</div>

            {/* TODO */}
            <RenderWeek active={3} />
            {/* <RenderDay /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default View;
