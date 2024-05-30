import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { Navhome } from "./Navhome";


export function Landing() {
  return (<>
<Navhome />
    <main className="min-h-[90vh] flex items-center">
      <section className="py-24 w-full h-full">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Acme Inc</h1>
          <p className="text-lg mb-8">Discover the best products and services for your business.</p>
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
        </div>
      </section>
    </main>
   
  </>);
}

