import styles from "./ButtonFancy.module.css";

import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from "react";

interface IButtonProps {
  type: string;
  color: string;
  children: JSX.Element;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
}

const ButtonFancy: React.FC<IButtonProps> = ({
  type,
  color,
  clickHandler,
  children,
}) => {
  return (
    <button
      className={[styles[color], styles.fancyButton].join(" ")}
      type="submit"
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default ButtonFancy;
