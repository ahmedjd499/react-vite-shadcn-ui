import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { CircleFadingPlus } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useTaskStore } from "@/store/Task";

export function TodoAdd() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2">
            <CircleFadingPlus /> Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Todo</DialogTitle>
            <DialogDescription>
              Create a new task for your to-do list.
            </DialogDescription>
          </DialogHeader>
          <AddForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" className="gap-2">
          <CircleFadingPlus /> Add Task
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>New Todo</DialogTitle>
          <DialogDescription>
            Create a new task for your to-do list.
          </DialogDescription>
        </DrawerHeader>
        <AddForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddForm() {
  const [taskName, setTaskName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!taskName) newErrors.taskName = "Task name is required";
    if (!description) newErrors.description = "Description is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!date) newErrors.date = "Due date is required";
    return newErrors;
  };

  const addTask = useTaskStore((state) => state.addTask);

  const submit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      name : taskName,
      description,
      due_date : date,
      priority,
    };
    addTask(formData);
    // Clear form and errors after submission
    setTaskName("");
    setDescription("");
    setPriority("");
    setDate(null);
    setErrors({});
  };

  return (
    <form className="grid items-start gap-4 p-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Task Name</Label>
        <Input
          id="name"
          placeholder="Buy groceries"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {errors.taskName && <span className="text-red-500">{errors.taskName}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Pick up milk, eggs, and bread"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className="text-red-500">{errors.description}</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <span className="text-red-500">{errors.date}</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priority">Priority</Label>
          <Select id="priority" value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && <span className="text-red-500">{errors.priority}</span>}
        </div>
      </div>
      <Button type="button" onClick={submit}>
        Save changes
      </Button>
    </form>
  );
}
