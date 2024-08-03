import { Activity, Dumbbell, Home } from "lucide-react";

function Footer() {
  return (
    <div className="w-full h-40 bg-background flex flex-row items-end justify-between p-3">
      <div className="w-fit flex flex-col justify-center items-center text-primary cursor-pointer">
        <Activity className="h-10 w-10" />
        <h2 className="text-2xl">Program</h2>
      </div>
      <div className="w-fit flex flex-col justify-center items-center text-primary cursor-pointer">
        <Home className="h-10 w-10" />
        <h2 className="text-2xl">Home</h2>
      </div>
      <div className="w-fit flex flex-col justify-center items-center text-primary cursor-pointer">
        <Dumbbell className="h-10 w-10" />
        <h2 className="text-2xl">Activity</h2>
      </div>
    </div>
  );
}

export default Footer;
