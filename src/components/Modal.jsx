import { X } from "lucide-react";
const Modal = ({ title, message, buttons, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          {buttons?.map(({ label, onClick, style }, i) => (
            <button
              key={i}
              onClick={() => {
                onClick?.();
                onClose();
              }}
              className={style || "px-4 py-2 border rounded hover:bg-gray-100"}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
