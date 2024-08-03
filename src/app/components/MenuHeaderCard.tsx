import React from "react";
import styles from "./MenuHeaderCard.module.css";

interface MenuHeaderCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

export const MenuHeaderCard: React.FC<MenuHeaderCardProps> = ({
  iconSrc,
  title,
  description,
}) => {
  return (
    <div className={styles["menu-header-card"]}>
      <img
        className={styles["menu-header-card__icon"]}
        src={iconSrc}
        alt="Filter Icon"
      />
      <div className={styles["menu-header-card__content"]}>
        <p className={styles["menu-header-card__title"]}>{title}</p>
        <p className={styles["menu-header-card__description"]}>{description}</p>
      </div>
    </div>
  );
};

export default MenuHeaderCard;
