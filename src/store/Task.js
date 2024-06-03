import { addTaskApi, deleteTaskApi, getTasks, updateTaskApi } from "@/api/taskApi";
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
          tasks: [...state.tasks, result.data.object], // Add the newTask to the tasks array
        }));
        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when adding task";
      },
    });
  },

  updateTask: (taskId, newStatus) => {
    const myPromise = updateTaskApi({ status: newStatus }, taskId);

    toast.promise(myPromise, {
      loading: "Updating",
      duration: 5000,
      success: (result) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          ),
        }));
        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when updating task";
      },
    });
  },

  updateTaskData: (taskId, data) => {
    const myPromise = updateTaskApi(data, taskId);
    toast.promise(myPromise, {
      loading: "Updating",
      duration: 5000,
      success: (result) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId ? { ...task, ...data } : task
          ),
        }));
        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when updating task";
      },
    });
  },
  deleteTask: (taskId) => {
    const myPromise = deleteTaskApi( taskId);

    toast.promise(myPromise, {
      loading: "Updating",
      duration: 5000,
      success: (result) => {
        set((state) => ({
          tasks: state.tasks.filter((task) =>
            task._id !== taskId 
          ),
        }));
        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when deleting task";
      },
    });
  },
}));

