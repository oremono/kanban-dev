import React from 'react';
import { IDX_TO_DAY_MAP } from '@helpers/constants';

const RenderWeek = (props: any) => {
  const { active } = props;
  const bg_color = (i: number) => (i == active ? 'bg-[linear-gradient(135deg,_#4f46e5,_#7c3aed)]' : 'bg-white/30');

  return (
    <div className="flex flex-row justify-between my-2 overflow-x-auto w-full">
      {Array.from({ length: 7 }, (_, i) => {
        //  TODO - date
        const date = 10 + i;

        return (
          <div className={`flex flex-col items-center rounded-xl py-2 px-3 text-white ${bg_color(date)}`}>
            <span className="text-xs">{IDX_TO_DAY_MAP[i]}</span>
            <span className="font-bold">{date}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RenderWeek;
