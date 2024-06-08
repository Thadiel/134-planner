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
        <h1 className=' text-gray-700 text-3xl mb-3 justify-center text-center'>Add New Event</h1>
          <div className=' h-0.5 rounded mb-3 w-[50vw] bg-gray-700'/>
        {children}
      </div>
    </div>
  );
};

export default Create;