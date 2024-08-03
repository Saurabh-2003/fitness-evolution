import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center
     h-screen w-full animate-pulse  backdrop-blur-sm p-4"
    >
      <div role="status">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
