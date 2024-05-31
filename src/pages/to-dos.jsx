import { useEffect } from "react";
import { useTaskStore } from "@/store/Task";
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TodoAdd } from "../components/component/TodoAdd";
import { buttonVariants } from "@/components/ui/button";

export function ToDos() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const renderTasks = (tasks) => {
    return tasks.map((task,index) => (
      <div key={`${task.id}-${index}`} className="cursor-grab	"> {/* Use a unique key */}
        <Card>
          <CardHeader>
            <CardTitle className="truncate">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</span>
              </div>
              <Badge variant={ getBadgeVariant(task.priority)} className="py-1 px-2">{task.priority}</Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
    ));
  };

  const getBadgeVariant = (priority) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="flex flex-col  bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between mt-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">To-Do App</h1>
        <TodoAdd />
      </div>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">To Do</h2>
          <div className="space-y-4">
            {Array.isArray(tasks) && renderTasks(tasks.filter((task) => task.status === "To Do"))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">In Progress</h2>
          <div className="space-y-4">
            {Array.isArray(tasks) && renderTasks(tasks.filter((task) => task.status === "In Progress"))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Completed</h2>
          <div className="space-y-4">
            {Array.isArray(tasks) && renderTasks(tasks.filter((task) => task.status === "Completed"))}
          </div>
        </div>
      </main>
    </div>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
