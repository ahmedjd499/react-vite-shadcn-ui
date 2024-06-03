import { useEffect } from "react";
import { useTaskStore } from "@/store/Task";
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TodoAdd } from "../components/component/TodoAdd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TodoEdit } from "@/components/component/TodoEdit";
const ItemTypes = {
  TASK: 'task',
};

export function ToDos() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);




  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between mt-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">To-Do App</h1>
          <TodoAdd />
        </div>
        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <Column title="To Do" tasks={tasks.filter((task) => task.status === "To Do")}  />
          <Column title="In Progress" tasks={tasks.filter((task) => task.status === "In Progress")}  />
          <Column title="Completed" tasks={tasks.filter((task) => task.status === "Completed")}  />
        </main>
      </div>
    </DndProvider>
  );
}

const Column = ({ title, tasks }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      updateTaskStatus(item._id, title);
    },
  });
  const updateTaskStatus = useTaskStore((state) => state.updateTask);

  return (
    <div ref={drop} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task,index) => (
          <TaskCard key={`${task.id}-${index}`} task={task} />
        ))}
      </div>
    </div>
  );
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

const TaskCard = ({ task }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: task,
  });

  const formattedDate = format(new Date(task.due_date), 'MMMM dd, yyyy'); // Format the date



  
  return (
    <div ref={drag} className="cursor-grab relative">
      <Card >
        <CardHeader>
          <CardTitle className="truncate">{task.name}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
          <DropOptions task={task}/>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</span>
            </div>
            <Badge variant={getBadgeVariant(task.priority)} className="py-1 px-2">{task.priority}</Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

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
const DropOptions= ({ task })=> {
  const updateTaskStatus = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute right-0 top-0">
          <FlipVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open task menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-1">
      
        <TodoEdit task={task}/>
      
        <DropdownMenuItem onClick={() => deleteTask(task._id)} className="cursor-pointer">
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={task.status}>
          <DropdownMenuRadioItem value="To Do" onClick={() => updateTaskStatus(task._id, "To Do")} className="cursor-pointer" >
            <ListIcon className="mr-2 h-4 w-4" />
            To Do
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="In Progress" onClick={() => updateTaskStatus(task._id, "In Progress")} className="cursor-pointer" >
            <LoaderIcon className="mr-2 h-4 w-4" />
            In Progress
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Completed" onClick={() => updateTaskStatus(task._id, "Completed")} className="cursor-pointer" >
            <CheckIcon className="mr-2 h-4 w-4" />
            Completed
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function CheckIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}




function FlipVerticalIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
      <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
      <path d="M4 12H2" />
      <path d="M10 12H8" />
      <path d="M16 12h-2" />
      <path d="M22 12h-2" />
    </svg>
  )
}


function ListIcon(props) {
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
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function LoaderIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  )
}


function TrashIcon(props) {
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
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}