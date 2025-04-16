import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

import useAppContext from '@hooks/useAppContext';
import AnimateVisibility from '@modules/components/AnimatVisibility';
import { useDndContext } from '@dnd-kit/core';

const RenderCard = (props: any) => {
  const { card, preview = false } = props;
  const { activeDetails, setActiveDetails } = useAppContext();
  const { active } = useDndContext();

  const showDetails = activeDetails == card.id;
  const hideCard = !showDetails && activeDetails != null;

  const details = (
    <>
      <div className={`p-4${!showDetails ? ' bg-white border border-t-0 shadow-2xl rounded-b-lg border-gray-500' : ''}`}>
        <div className="text-lg font-bold">{card.title}</div>
        <div className={`text-sm text-gray-600${!showDetails ? ' line-limit' : ''}`}>{card.description}</div>
      </div>
      {showDetails && (
        <>
          <div className="px-4 text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
          </div>
          <div className="mx-4 my-2 px-4 p-1 bg-red-300 border w-fit rounded" onClick={() => setActiveDetails?.(null)}>
            {'<- Exit'}
          </div>
        </>
      )}
    </>
  );

  const animatedDetails = (visible: boolean, children: ReactNode) => {
    return <AnimateVisibility visible={visible}>{children}</AnimateVisibility>;
  };

  const IMG = preview ? 'img' : motion.img;

  const mainBody = (
    <div
      // TODO -> Need to add snapToCursorCenter modifier
      // className={`${preview ? ' scale-[0.4]' : ''}`}
      onClick={() => {
        if (active) return;
        if (showDetails) return;
        setActiveDetails?.(card.id);
      }}
    >
      <div className="relative flex items-center">
        {!showDetails && (
          <div className="absolute top-2 right-2 text-white text-xs p-1 rounded-xl bg-[linear-gradient(135deg,_#4f46e5,_#7c3aed)]">
            {card.time}
          </div>
        )}

        <IMG layout transition={{ duration: 0.5 }} alt={card.id} src={card.imageUrl} width="100%" />
      </div>

      {animatedDetails(!showDetails, details)}
      {animatedDetails(showDetails, details)}
    </div>
  );

  // if (hideCard) return <></>;
  // return mainBody;
  return animatedDetails(!hideCard, mainBody);
};

export default RenderCard;
