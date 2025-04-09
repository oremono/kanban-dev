import React from 'react';

import { Event } from '@/pages/api/board';
import { formatDate } from '@helpers/utils';

import RenderCard from './RenderCard';

const RenderDay = (props: any) => {
  const { date = '', day = [] } = props;

  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-row items-center">
        <div className="min-w-fit font-bold text-grey text-xl text-neutral-900">{formatDate(date)}</div>
        <div className="w-full mx-3">
          <hr />
        </div>
      </div>

      <div className="flex flex-col items-center">
        {day?.map((card: Event) => (
          <RenderCard card={card} />
        ))}
      </div>
    </div>
  );
};

export default RenderDay;
