import { Link } from "react-router-dom";

export function HomeApps() {
  return (
    (
      <main className="flex-1 content-center  ">
    <section
      className="flex flex-col items-center justify-center gap-8 py-12 md:py-24">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:max-w-2xl">
        <Link
          className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900 "
          to='/main/todos'>
          <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <CheckIcon className="h-8 w-8 text-gray-500 dark:text-gray-200" />
          </div>
          <h3 className="text-lg font-medium">To-Do</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Stay organized and productive.</p>
        </Link>
        <Link
          className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900"
          to='/main/media-downloader'>
          <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <DownloadIcon className="h-8 w-8 text-gray-500 dark:text-gray-200" />
          </div>
          <h3 className="text-lg font-medium">Media Downloader</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Download videos, music, and more.</p>
        </Link>
      </div>
    </section>
    </main>
    
    )
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}


function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>)
  );
}
