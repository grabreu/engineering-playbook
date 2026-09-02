import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return (
    <div>
      <h1>My Day</h1>
    </div>
  );
};

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});
