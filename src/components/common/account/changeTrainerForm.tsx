"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader } from "lucide-react";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  currentTrainer: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function ChangeTrainerForm({ AlertDialogFooter }: { AlertDialogFooter: any }) {
  const [isPending, setIsPending] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currentTrainer: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      // 3. Send the data to your backend.
      setIsPending(false);
      toast.success(values.message);
    } catch (error) {
      setIsPending(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <h2 className="text-xl font-bold">Change Trainer Request</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start justify-center gap-2">
                <FormLabel className="w-full">Full Name</FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Enter Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentTrainer"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start justify-center gap-2">
                <FormLabel className="w-full">Current Trainer</FormLabel>
                <FormControl className="w-full">
                  <Input placeholder="Enter Trainer Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start justify-center gap-2">
                <FormLabel className="w-full">Message</FormLabel>
                <FormControl className="w-full">
                  <Textarea
                    placeholder="Why want you change the trainer ? ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter className="w-full grid grid-cols-3 gap-2 items-center justify-center">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full col-span-2"
            >
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Requesting..." : "Send Request"}
            </Button>
            <AlertDialogCancel className="col-span-1">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default ChangeTrainerForm;
