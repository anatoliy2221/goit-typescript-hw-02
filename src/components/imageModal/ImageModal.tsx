import Modal from "react-modal";
import { FC } from "react";
import css from "./ImageModal.module.css";
import { Image } from "../App/App.types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface imageModalProps {
  image: Image | null;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ImageModal: FC<imageModalProps> = ({
  image,
  modalIsOpen,
  closeModal,
}) => {
  if (image === null) {
    return null;
  }
  const { urls, alt, likes, user } = image;
  return (
    <div className={css.modalOverlay}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className={css.img} src={urls.regular} alt={alt} />
        <div className={css.wrapper}>
          <p>{alt}</p>
          <div className={css.contentWrap}>
            <p className={css.text}>Author: {user.name}</p>
            <p className={css.text}>Location: {user.location}</p>
            <p className={css.text}>Likes: {likes}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
