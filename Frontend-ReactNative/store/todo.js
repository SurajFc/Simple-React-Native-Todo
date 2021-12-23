import create from "zustand";

const useTodoStore = create((set, get) => ({
  todo: [],
  setTodo: todo => set({ todo }),
}));

export default useTodoStore;
