import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateVisibilityProps {
  visible: boolean;
  children: ReactNode;
  animatePresence?: boolean;
}

const AnimateVisibility = (props: AnimateVisibilityProps) => {
  const { visible, children, animatePresence = true } = props;

  const body = (
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
  );

  if (!animatePresence) {
    if (!visible) return <></>;
    return body;
  }

  return <AnimatePresence initial={false}>{visible && body}</AnimatePresence>;
};

export default AnimateVisibility;
