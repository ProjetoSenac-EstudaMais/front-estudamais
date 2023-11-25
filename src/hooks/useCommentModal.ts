import { create } from 'zustand';

interface CommentModalStore {
    isOpen: boolean;
    postId: number | null; // Adding postId to store the ID of the selected post
    onOpen: (postId: number) => void; // Accepting postId as an argument
    onClose: () => void;
  }

  export const useCommentModal = create<CommentModalStore>((set) => ({
    isOpen: false,
    postId: null,
    onOpen: (postId) => set({ isOpen: true, postId }), // Setting the postId when opening the modal
    onClose: () => set({ isOpen: false, postId: null }) // Resetting postId on modal close
  }));