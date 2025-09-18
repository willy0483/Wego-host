import { useRouter } from "@tanstack/react-router";

const NotFound = () => {
  const router = useRouter();
  const onBack = () => router.history.back();

  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center p-8 mx-auto max-w-md gap-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-red-500 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <h1 className="text-3xl font-bold text-red-500">404 Not Found</h1>
      <p className="text-slate-600 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        aria-label="Go back"
        onClick={onBack}
        className="mt-2 px-4 py-2 bg-red-500 hover:cursor-pointer text-white rounded transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
