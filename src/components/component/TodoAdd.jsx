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
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
import { DatePicker } from "../ui/DatePicker";
import { CircleFadingPlus } from "lucide-react";
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
            <DialogTitle> New Todo</DialogTitle>
            <DialogDescription>
              Create a new task for your to-do list.
              <hr></hr>
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
        <DialogTitle> New Todo</DialogTitle>
            <DialogDescription>
              Create a new task for your to-do list.
              <hr></hr>
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

function AddForm(className) {
  return (
    <form className="grid items-start gap-4 p-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Task Name</Label>
        <Input id="name" placeholder="Buy groceries" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Pick up milk, eggs, and bread"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priority">Priority</Label>
          <Select id="priority">
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
