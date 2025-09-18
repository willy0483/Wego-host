import { LoginForm } from "@/components/logInForm";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
  pendingComponent: () => <Spinner />,
  head: () => ({
    meta: [
      {
        title: "Login | Wego",
      },
      {
        name: "description",
        content:
          "Login to access your account and explore the features of Wego.",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="p-8 w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold text-app-primary">Login</h1>
      <LoginForm />
    </div>
  );
}
