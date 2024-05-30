
import { Button, buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
export function Navhome() {


  return (
    (<header
      className="flex items-center justify-between h-[10vh] px-4 md:px-6 bg-white shadow-sm dark:bg-gray-950 w-full">
      <div className="flex items-center gap-4">
      <Link className="flex items-center" to="/">
        <MountainIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Acme Inc</span>
      </Link>
   
      </div>
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-4">

          
          <div className="flex space-x-4 items-center">
          <Link className={`${buttonVariants({ variant: "secondary" })} w-full`} to="/login">Log in</Link>
          <span>
           OR

          </span>
          <Link
              className={`${buttonVariants({ variant: "default" })} w-full`}
              to="/signup"
            >
              Create an account
            </Link>
          </div>

      
          <ModeToggle></ModeToggle>

        </div>
      </div>
    </header>)
  );
}


function MountainIcon(props) {
  return (
    (<svg
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}


