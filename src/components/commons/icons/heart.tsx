import React from 'react';
import { Heart as HeartIcon } from 'lucide-react';
import styles from "./icons-styles.module.css";

interface HeartProps {
    filled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }

const Heart: React.FC<HeartProps> = ({ filled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.icon} ${styles.iconHeart} ${filled ? styles.filled : ''}`}
        >
      <HeartIcon
        fill={filled ? 'currentColor' : 'none'}
        color="currentColor"
      />
    </button>
  );
};

export default Heart;
