import { FC } from "react";
import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  openModal: (photo: Image) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  const { urls, alt_description, color } = image;
  return (
    <div
      className={css.thumb}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <img
        src={urls.small}
        alt={alt_description}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
