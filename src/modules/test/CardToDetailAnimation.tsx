import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CardToDetailAnimation = () => {
  const [showDetails, setShowDetails] = useState(!true);

  return (
    <>
      {!showDetails && Array.from({ length: 10 }, (_, i) => <div key={i}>some random shit</div>)}

      <div style={!showDetails ? { padding: '1rem' } : {}} onClick={() => setShowDetails(!showDetails)}>
        <motion.img
          layout
          transition={{
            duration: 1
          }}
          alt={'some'}
          src={'https://fastly.picsum.photos/id/145/1920/1080.jpg?hmac=745bp388SbDWrZpgXUHM5uRK5D4vdEC6XuPZPp9TvRs'}
          width="100%"
        />

        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              key="content"
              initial={'visible'}
              animate={'show'}
              exit={'hidden'}
              variants={{
                visible: {
                  opacity: 0,
                  transition: {
                    duration: 0,
                    delay: 0
                  }
                },
                hidden: {
                  opacity: 0,
                  transition: {
                    duration: 0,
                    delay: 0
                  }
                },
                show: {
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 1
                  }
                }
              }}
              // todo - delay only when visible, not during exit
              style={{ padding: '1rem' }}
            >
              <div>
                <p>This content fades in, expands, and gets padding smoothly!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CardToDetailAnimation;
