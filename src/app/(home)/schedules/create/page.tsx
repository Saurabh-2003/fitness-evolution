import ScheduleNewMeeting from "@/app/_blocks/schedule-new-meeting";

const ScheduleList = async ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  return <ScheduleNewMeeting email={searchParams.email} />;
};

export default ScheduleList;
