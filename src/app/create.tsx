import { ReactNode } from 'react';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Create = ({ isVisible, onClose, children }: ModalProps) => {
  if (!isVisible) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="bg-white p-4 rounded-3xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Create;