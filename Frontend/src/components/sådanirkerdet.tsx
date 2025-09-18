import { useModule } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useSådan } from "@/lib/query";
import { Spinner } from "./spinner";

const Sådanirkerdet = () => {
  const { isWorksOpen, setIsWorksOpen } = useModule();

  const { data: item, isPending, isError, error, refetch } = useSådan();

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-red-500 mb-2 font-semibold text-center">
            Something went wrong.
          </p>
          <p className="text-app-secondary text-sm mb-4 text-center break-words">
            Error: {error?.message}
          </p>
          <button
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => refetch}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <Dialog open={isWorksOpen} onOpenChange={setIsWorksOpen}>
      <DialogContent>
        {isPending ? (
          <Spinner />
        ) : (
          item.map(({ content, id, title }) => (
            <DialogHeader key={id}>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </DialogHeader>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
};
export default Sådanirkerdet;
