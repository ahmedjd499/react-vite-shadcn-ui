import { addTaskApi } from "@/api/taskApi";
import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (newTask) => {
    addTaskApi(newtask)
      .then(() => {
        set((state) => {
          state.tasks.puch(newTask);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeUser: () => {
    set((state) => {
      state.tasks.pop(newTask);
    });
  },
}));
