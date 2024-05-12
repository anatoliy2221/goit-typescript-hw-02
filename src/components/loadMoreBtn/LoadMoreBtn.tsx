import { FC } from "react";
import css from "./LoadMoreBtn.module.css";

interface loadMoreBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const LoadMoreBtn: FC<loadMoreBtnProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={css.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
