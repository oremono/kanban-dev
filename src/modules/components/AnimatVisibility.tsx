import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

const AnimateVisibility = (props: { visible: boolean; children: ReactNode }) => {
  const { visible, children } = props;
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="content"
          initial={'hidden'}
          animate={'show'}
          exit={'hidden'}
          variants={{
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
                delay: 0.5
              }
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateVisibility;
