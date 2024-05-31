import { addTaskApi, getTasks } from "@/api/taskApi";
import toast from "react-hot-toast";
import { create } from "zustand";

const fetchTasks = (set) => {
  const myPromise = getTasks();

  toast.promise(myPromise, {
    loading: "Loading",
    duration: 5000,
    success: (result) => {
      set(() => ({
        tasks: result.data.data, // Ensure tasks is an array
      }));
      return result.data.message;
    },
    error: (error) => {
      console.log(error);
      return error.response?.data.message || "Error when fetching tasks";
    },
  });
};

export const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: () => fetchTasks(set),
  addTask: (newTask) => {
    const myPromise = addTaskApi(newTask);

    toast.promise(myPromise, {
      loading: "Loading",
      duration: 5000,
      success: (result) => {
        set((state) => ({
          tasks: [...state.tasks, newTask], // Add the newTask to the tasks array
        }));
        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when adding task";
      },
    });
  },
  removeTask: () => {
    set((state) => {
      // Remove the last task from the tasks array
      state.tasks.pop();
      return { tasks: [...state.tasks] }; // Return the updated state
    });
  },
  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));
