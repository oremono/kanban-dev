import React from 'react';

import { Event } from '@/pages/api/board';
import { formatDate } from '@helpers/utils';
import useAppContext from '@hooks/useAppContext';
import AnimateVisibility from '@modules/components/AnimatVisibility';

import RenderCard from './RenderCard';

const RenderDay = (props: any) => {
  const { date = '', day = [] } = props;
  const { activeDetails } = useAppContext();

  return (
    <div className={`flex flex-col${!activeDetails ? ' m-6' : ''}`}>
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
          <RenderCard key={idx} card={card} />
        ))}
      </div>
    </div>
  );
};

export default RenderDay;
