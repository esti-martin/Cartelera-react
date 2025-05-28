import React from 'react';
import { Heart as HeartIcon } from 'lucide-react';
import styles from "./icons-styles.module.css";

interface HeartProps {
  filled: boolean;
  onClick: () => void;
}

const Heart: React.FC<HeartProps> = ({ filled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles.icon}
         >
      <HeartIcon fill={filled ? 'currentColor' : 'none'} />
    </button>
  );
};

export default Heart;
