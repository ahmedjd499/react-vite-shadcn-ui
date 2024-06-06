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

        <Link
          className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl dark:bg-gray-900"
          to='/main/tic-tak-Toe'>
          <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <TikTakToeIcon className="h-8 w-8 text-gray-500 dark:text-gray-200" />
          </div>
          <h3 className="text-lg font-medium">Tik Tak Toe</h3>
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



function TikTakToeIcon(props) {
  return (
    (
      <svg fill="gray" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	 viewBox="0 0 512 512" xmlSpace="preserve">
<g>
	<g>
		<path d="M508.852,167.869v-16.787H347.279V0h-16.787v151.082H179.41V0h-16.787v151.082H3.148v16.787h159.475v151.082H3.148v16.787
			h159.475V512h16.787V335.738h151.082V512h16.787V335.738h161.574v-16.787H347.279V167.869H508.852z M330.492,318.951H179.41
			V167.869h151.082V318.951z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,184.656c-32.398,0-58.754,26.356-58.754,58.754s26.356,58.754,58.754,58.754s58.754-26.356,58.754-58.754
			S288.398,184.656,256,184.656z M256,285.377c-23.141,0-41.967-18.827-41.967-41.967s18.826-41.967,41.967-41.967
			s41.967,18.827,41.967,41.967S279.141,285.377,256,285.377z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,16.787c-32.398,0-58.754,26.356-58.754,58.754s26.356,58.754,58.754,58.754s58.754-26.356,58.754-58.754
			S288.398,16.787,256,16.787z M256,117.508c-23.141,0-41.967-18.827-41.967-41.967c0-23.14,18.826-41.967,41.967-41.967
			s41.967,18.827,41.967,41.967C297.967,98.681,279.141,117.508,256,117.508z"/>
	</g>
</g>
<g>
	<g>
		<path d="M423.869,184.656c-32.398,0-58.754,26.356-58.754,58.754s26.356,58.754,58.754,58.754s58.754-26.356,58.754-58.754
			S456.267,184.656,423.869,184.656z M423.869,285.377c-23.141,0-41.967-18.827-41.967-41.967s18.826-41.967,41.967-41.967
			s41.967,18.827,41.967,41.967S447.01,285.377,423.869,285.377z"/>
	</g>
</g>
<g>
	<g>
		<path d="M88.131,352.525c-32.398,0-58.754,26.356-58.754,58.754s26.356,58.754,58.754,58.754s58.754-26.356,58.754-58.754
			S120.529,352.525,88.131,352.525z M88.131,453.246c-23.141,0-41.967-18.827-41.967-41.967s18.826-41.967,41.967-41.967
			s41.967,18.827,41.967,41.967S111.273,453.246,88.131,453.246z"/>
	</g>
</g>
<g>
	<g>
		<path d="M100,243.41l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.275-3.277-8.594-3.277-11.869,0L88.131,231.54
			l-44.426-44.426c-3.275-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871l44.426,44.425l-44.426,44.425
			c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458l44.426-44.426l44.426,44.426
			c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L100,243.41z"/>
	</g>
</g>
<g>
	<g>
		<path d="M100,75.541l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.275-3.277-8.594-3.277-11.869,0L88.131,63.671
			L43.705,19.245c-3.275-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871l44.426,44.425l-44.426,44.425
			c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458l44.426-44.426l44.426,44.426
			c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L100,75.541z"/>
	</g>
</g>
<g>
	<g>
		<path d="M435.738,75.541l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.275-3.277-8.594-3.277-11.869,0l-44.426,44.426
			l-44.426-44.426c-3.275-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871L412,75.541l-44.426,44.425
			c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458l44.426-44.426l44.426,44.426
			c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L435.738,75.541z"/>
	</g>
</g>
<g>
	<g>
		<path d="M435.738,411.279l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.275-3.277-8.594-3.277-11.869,0l-44.426,44.426
			l-44.426-44.426c-3.275-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871L412,411.279l-44.426,44.425
			c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458l44.426-44.426l44.426,44.426
			c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L435.738,411.279z"/>
	</g>
</g>
<g>
	<g>
		<path d="M267.869,411.279l44.426-44.425c3.279-3.279,3.279-8.592,0-11.871c-3.274-3.277-8.594-3.277-11.869,0L256,399.409
			l-44.426-44.426c-3.274-3.277-8.594-3.277-11.869,0c-3.279,3.279-3.279,8.592,0,11.871l44.426,44.425l-44.426,44.425
			c-3.279,3.279-3.279,8.592,0,11.871c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458L256,423.148l44.426,44.426
			c1.637,1.638,3.787,2.458,5.934,2.458s4.297-0.82,5.934-2.458c3.279-3.279,3.279-8.592,0-11.871L267.869,411.279z"/>
	</g>
</g>
</svg>
    )
  );
}