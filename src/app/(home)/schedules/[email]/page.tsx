import ScheduleMeeting from "@/app/_blocks/schedule-meeting";
import { db } from "@/core/client/client";
import React from "react";

const SchedulesPage =async ({ params }: { params: { email: string } }) =>  {
    const data = await db.schedule.findMany();
    return <ScheduleMeeting />;  
}

export default SchedulesPage;
