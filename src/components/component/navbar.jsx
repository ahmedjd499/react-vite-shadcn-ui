import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUserStore } from "@/store/User";
import { ListChecks, Youtube } from "lucide-react";
export function Navbar() {
  const logout = useUserStore((state) => state.removeUser);
  const user = useUserStore((state) => state.user);
  const url = import.meta.env.VITE_BACKEND_API || "http://localhost/";
  return (
    <>

    <header className="flex items-center justify-between h-[10vh] px-4 md:px-6 bg-white shadow-sm dark:bg-gray-950 w-full">
      <div className="flex items-center gap-4">
        <Link className="flex items-center" to="/main/home">
          <MountainIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-bold">Acme Inc</span>
        </Link>

        <div className="relative ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <Link
                  className="flex w-full items-center py-2 text-sm font-medium "
                  to="/main/home"
                >
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="flex w-full items-center py-2 text-sm font-medium"
                  to="/main/todos"
                >
                  <ListChecks className="mr-2"/>
                  TODO
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="flex w-full items-center py-2 text-sm font-medium"
                  to="/main/media-downloader"
                >
                  <Youtube className="mr-2"/>
                   Downloader
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="flex w-full items-center py-2 text-sm font-medium"
                  to="/"
                >
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            className="hover:underline underline-offset-4 flex items-center"
            to="/"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link
            className="hover:underline underline-offset-4 flex items-center"
            to="/"
          >
            <InfoIcon className="mr-2 h-4 w-4" />
            About
          </Link>
          <Link
            className="hover:underline underline-offset-4 flex items-center"
            to="/"
          >
            <BriefcaseIcon className="mr-2 h-4 w-4" />
            Services
          </Link>
          <Link
            className="hover:underline underline-offset-4 flex items-center"
            to="/"
          >
            <PhoneIcon className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </nav> */}
      </div>
      <div className="flex items-center gap-4">
        <form className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400 w-full"
              placeholder="Search..."
              type="search"
            />
          </div>
        </form>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" h-8 w-8 cursor-pointer">
                <AvatarImage
                  src={
                    user.file
                      ? url + "general/files/" + user.file
                      : "/src/assets/avatar.jpg"
                  }
                  alt="@shadcn"
                  className="rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Jared Palmer</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle></ModeToggle>
        </div>
      </div>
    </header>
   
    </>

  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function LogOutIcon(props) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
