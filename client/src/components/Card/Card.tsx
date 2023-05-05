import React from "react";

//Styling
import styles from "./Card.module.css";

//Types
import { IUserData } from "../../types/users";
import { IUserDataGet } from "../../types_updated/users";

interface Props {
  employee: IUserDataGet;
  clickCallback: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({ employee, clickCallback }: Props) => {
  function clickHandler(e: any) {
    e.currentTarget.classList.toggle(`${styles.selected}`);
    clickCallback(e);
  }

  return (
    <div className={styles.card} onClick={clickHandler}>
      <img className={styles.avatar} src={employee.imageUrl} alt="avatar" />
      <div>
        <h3 className={styles.name}>{employee.displayName}</h3>
        <p className={styles.title}>{employee.title}</p>
      </div>
    </div>
  );
};

export default Card;
