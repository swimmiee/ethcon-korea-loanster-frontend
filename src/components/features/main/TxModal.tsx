import Modal from "components/materials/Modal";

interface TxModalProps {
  close: () => void;
}
export const TxModal = ({ close }: TxModalProps) => {
  return (
    <Modal title="Lend & Invest" closeModal={close}>
      <div className="py-8"></div>
    </Modal>
  );
};
