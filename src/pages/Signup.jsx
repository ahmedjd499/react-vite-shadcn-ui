
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/api/userApi"
import toast, { Toaster } from "react-hot-toast"
import PasswordInput from "@/components/ui/PasswordInput"

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),  
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[.!@#%^&*)(+=._-]/, { message: "Password must contain at least one special character." }),
})

export default function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
    const myPromise = createUser(data);

    toast.promise(myPromise, {
        loading: 'Loading',
        duration: 5000,
        success: (result) => {
            if(result.status==200 && result.data.code==2)
            form.reset()    
            return result.data.message;

        },
        error: (error) => {
            if(error.response.data.code ==5 ) form.setError("email", {
                shouldFocus: true,message : error.response.data.message
            })
            return error.response.data.message || 'Error when creating user';
        }
    });
};

  return (
  
    <div className="flex w-full max-w-md items-center border justify-center  rounded  p-5">
    <Toaster
  position="top-center"
  reverseOrder={true}
/>
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-left">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      <hr/>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
          <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name..." {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <div className="space-y-2">
          <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name..." {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        </div>
        <div className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email </FormLabel>
              <FormControl>
                <Input placeholder="Enter your email name..." {...field} />
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
              <PasswordInput field={field}  />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>

    </div>
  </div>


  )
}
