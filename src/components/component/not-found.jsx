import { Link } from "react-router-dom";


export function NotFound() {
  return (
    (<div
      className="flex  flex-col items-center justify-center  px-4 py-16 text-center text-white md:px-6">
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-center">
          <div className="text-9xl font-bold tracking-tighter">404</div>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops, page not found</h1>
        <p className="text-gray-400">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-500 px-6 text-sm font-medium text-white transition-colors hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          to="/">
          Go back home
        </Link>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-3xl" />
        <div
          className="absolute left-1/4 top-1/4 h-[200px] w-[200px] -translate-x-1/4 -translate-y-1/4 transform rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 blur-3xl" />
        <div
          className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] translate-x-1/4 translate-y-1/4 transform rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-30 blur-3xl" />
      </div>
    </div>)
  );
}
