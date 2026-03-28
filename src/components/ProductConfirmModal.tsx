import Modal from "./Modal";

interface ProductConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productPrice: string;
}

export default function ProductConfirmModal({
  isOpen,
  onClose,
  productId,
  productName,
  productPrice,
}: ProductConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>Product ID: {productId}</h3>
      <h1>{productName}</h1>
      <h3>Price: {productPrice}</h3>
      <button onClick={onClose}>Add to Cart</button>
    </Modal>
  );
}
