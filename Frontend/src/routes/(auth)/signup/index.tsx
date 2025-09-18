import { SignUpForm } from "@/components/signUpForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "SignUp | Wego",
      },
      {
        name: "description",
        content:
          "Create a new account to get started and unlock all the features of Wego. Join our community today!",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="p-8 w-96 flex flex-col justify-center items-center gap-10">
      <h1 className="text-center text-2xl font-bold text-app-primary">
        Sign Up
      </h1>
      <SignUpForm />
    </div>
  );
}
