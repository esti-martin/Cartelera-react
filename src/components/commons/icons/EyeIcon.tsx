import React, { ReactNode, MouseEventHandler } from "react";
import styles from "./icons-styles.module.css";
import { FaEye } from "react-icons/fa";

type IconProps = {
  onClick: () => void;
};

const EyeIcon: React.FC<IconProps> = ({
  onClick,
}) => (
  <button
    className={styles.icon}
    onClick={onClick}
    type="button"
  >
    <FaEye />
  </button>
);

export default EyeIcon;