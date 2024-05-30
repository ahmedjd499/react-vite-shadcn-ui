
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TodoAdd } from "../components/component/TodoAdd";

export function ToDos() {
  return (
    (<div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex items-center justify-between mt-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">To-Do App</h1>
        <TodoAdd />
      </div>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">To Do</h2>
          <div className="space-y-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="truncate">Finish project proposal</CardTitle>
                  <CardDescription>Write up the project proposal for the client meeting next week.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">May 30, 2024</span>
                    </div>
                    <Badge variant="primary">High</Badge>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="truncate">Refactor homepage</CardTitle>
                  <CardDescription>Update the homepage design and layout to match the new branding.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">June 15, 2024</span>
                    </div>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">In Progress</h2>
          <div className="space-y-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="truncate">Implement new feature</CardTitle>
                  <CardDescription>Add the new feature to the application based on the requirements.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">June 1, 2024</span>
                    </div>
                    <Badge variant="warning">Medium</Badge>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Completed</h2>
          <div className="space-y-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="truncate">Update documentation</CardTitle>
                  <CardDescription>Revise the documentation for the latest product release.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">May 25, 2024</span>
                    </div>
                    <Badge variant="success">Low</Badge>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>)
  );
}

function CalendarDaysIcon(props) {
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
    </svg>)
  );
}
