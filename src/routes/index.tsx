import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="mx-4 h-12 flex items-center">
      <h1 className="text-2xl font-medium">runde.tips</h1>
    </div>
  );
}
