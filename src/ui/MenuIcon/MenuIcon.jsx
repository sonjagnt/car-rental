import { IoClose, IoMenu } from 'react-icons/io5';
import { motion } from 'motion/react';
import s from './MenuIcon.module.css';

export default function MenuButton({ isOpen, toggleFn }) {
  return (
    <button onClick={toggleFn} className={s.btn}>
      {isOpen ? (
        <motion.span
          key="close"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoClose size={32} />
        </motion.span>
      ) : (
        <motion.span
          key="menu"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoMenu size={32} />
        </motion.span>
      )}
    </button>
  );
}
