import { create } from "zustand";

interface LogInModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLogInModal = create<LogInModal>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLogInModal;
