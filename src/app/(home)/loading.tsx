import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center
      h-full w-full animate-pulse text-neutral-300 p-4"
    >
      <div role="status">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
