import React from 'react';

const RenderCard = (props: any) => {
  const { card } = props;

  return (
    <div key={card.id} className="flex flex-col my-3 rounded-lg overflow-hidden shadow-2xl">
      <div className="relative" style={{ height: '215px' }}>
        <div className="absolute top-2 right-2 text-white text-xs p-1 rounded-xl bg-[linear-gradient(135deg,_#4f46e5,_#7c3aed)]">
          {card.time}
        </div>
        <img alt={card.id} src={card.imageUrl} width="100%" />
      </div>

      <div className="p-4">
        <div className="text-lg font-bold">{card.title}</div>
        <div className="text-sm text-gray-600">{card.description}</div>
      </div>
    </div>
  );
};

export default RenderCard;
