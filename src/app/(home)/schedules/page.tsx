export const dynamic = "force-dynamic";
import MeetingList from "@/app/_blocks/meeting-list";
import { auth } from "@/core/auth/auth";
import { db } from "@/core/client/client";

const ScheduleList = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return <div>Please log in to view your schedule.</div>;
    }

    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!user) {
      return <div>User not found.</div>;
    }

    let schedules;

    if (user.role === "TRAINER" || user.role === "USER") {
      schedules = await db.schedule.findMany({
        where: {
          OR: [{ userId: user?.id }, { memberId: user?.email }],
        },
        include: {
          User: true,
        },
      });
    } else {
      schedules = await db.schedule.findMany({
        include: {
          User: true,
        },
      });
    }

    return <MeetingList data={schedules} user={user} />;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return <div>Error loading schedules. Please try again later.</div>;
  }
};

export default ScheduleList;
