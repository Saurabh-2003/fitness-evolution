"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Loader, Video } from "lucide-react";
import { useState } from "react";
import { CreateScheduleAction } from "@/core/actions/create-schedule-action";
import { Matcher } from "react-day-picker";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.enum(
    [
      "6:00 AM",
      "8:00 AM",
      "11:00 AM",
      "12:00 PM",
      "2:00 PM",
      "4:00 PM",
      "6:00 PM",
      "8:00 PM",
      "9:00 PM",
    ],
    {
      message: "Time is required",
    }
  ),
  body: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Message must not be longer than 30 characters.",
    }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  meetingLink: z.string().min(2, {
    message: "meeting Link must be at least 2 characters.",
  }),
  memberId: z.string().min(2, {
    message: "Email is required",
  }),
});

const timeSlots = [
  "6:00 AM",
  "8:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "9:00 PM",
];
const ScheduleNewMeeting = ({ email }: { email: string }) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: "",
      body: "",
      memberId: email,
      date: undefined,
      meetingLink: "",
      time: "6:00 AM",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setIsPending(true);
      
      const data = await CreateScheduleAction(values);
      if (data?.error) {
        toast.error(data?.error);
        setIsPending(false);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
        setIsPending(false);
        form.reset();
        setTimeout(() => {
            router.push("/schedules");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(error.message);
      setIsPending(false);
      form.reset();
    } finally {
      setIsPending(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>Schedule a Meeting</CardTitle>
            <CardDescription className="flex gap-2">
              <Video className="w-6 h-6 " />
              Select out the details below to schedule a meeting with our team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Email</FormLabel>
                  <FormControl>
                    <Input placeholder="blabla@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Date of Meeting</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-2"
                    >
                      {timeSlots.map((time) => (
                        <FormItem
                          key={time}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={time} />
                          </FormControl>
                          <FormLabel className="font-normal">{time}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meetingLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://meet.google.com/meet..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Metting link</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormDescription>Your Subject</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Creating..." : "Create Schedule"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
export default ScheduleNewMeeting;
