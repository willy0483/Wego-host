import type { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="submit form"
      disabled={pending}
      className="w-full bg-app-primary text-app-background py-2 rounded-2xl hover:cursor-pointer"
    >
      {pending ? "Submitting..." : children}
    </button>
  );
};

export default SubmitButton;
