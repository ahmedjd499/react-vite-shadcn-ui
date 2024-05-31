import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast  from "react-hot-toast";
import PasswordInput from "@/components/ui/PasswordInput";
import { logInUser } from "@/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { LineWithText } from "@/components/component/line-with-text";
import { LogIn } from "lucide-react";
import { useUserStore } from "@/store/User";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const addUser = useUserStore((state) => state.addUser);

   const navigate=useNavigate()
  const onSubmit = (data) => {
    const myPromise = logInUser(data);

    toast.promise(myPromise, {
      loading: "Loading",
      duration: 5000,
      success: (result) => {
        if (result.status === 200 && result.data.code === 1) {
          form.reset();
        }
        if (result.data.token) {
          sessionStorage.setItem("token", result.data.token);
        }
        if (result.data.user) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          addUser(result.data.user);
          navigate("/main/TODOS")
        }

        return result.data.message;
      },
      error: (error) => {
        console.log(error);
        return error.response?.data.message || "Error when creating user";
      },
    });
  };

  return (
    <div className="w-full h-[90vh] grid">
      <div className="flex w-full max-w-md items-center border justify-center rounded p-5 m-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account.
            </p>
            <hr />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full flex gap-2" type="submit">
                <LogIn size={16} />
                Log In
              </Button>
              <LineWithText text="OR" />
              <Link
                className={`${buttonVariants({ variant: "outline" })} w-full`}
                to="/signup"
              >
                Create an account
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
