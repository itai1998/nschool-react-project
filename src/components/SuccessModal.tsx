import Modal from "./Modal";
import successIcon from "../img/icons/mark.png";
import styles from "../scss/SuccessModal.module.scss";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.successModalContainer}>
        <img src={successIcon} alt="successIcon" />
        <h2>成功完成結帳</h2>
        <button onClick={onClose}>確定</button>
      </div>
    </Modal>
  );
}
