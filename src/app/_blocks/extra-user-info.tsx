"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { EditExtraUserInfo } from "@/core/actions/create-edit-extra-user-info";
import { getTrainers } from "@/core/actions/get-trainers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

type Sex = "MALE" | "FEMALE" | "OTHER";

const userInfoSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  height: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform(Number)
    .optional(),
  weight: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform(Number)
    .optional(),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  age: z.string().regex(/^\d+$/).transform(Number).optional(),
  trainerEmail: z.string().email().or(z.literal("")).optional(),
  fitnessGoals: z.string().optional(),
});

interface trainerSchema {
  name: string | null;
  image: string | null;
  email: string;
}
const UserInfoExtra = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trainers, setTrainers] = useState<trainerSchema[]>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await getTrainers();
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setTrainers(data.trainers || []);
        }
      } catch (error) {
        toast.error("Failed to fetch trainers");
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: session?.user?.name || "",
      height: undefined,
      weight: undefined,
      sex: undefined,
      age: undefined,
      trainerEmail: "",
      fitnessGoals: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof userInfoSchema>) => {
    try {
      const result = await EditExtraUserInfo(data);

      if (result.error) {
        toast.error(result.error);
      }
      if (result.success) {
        toast.success(result.message);
        router.push("/home");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update user");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="md:px-72 px-5 py-5 md:pb-20 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="md:text-4xl bg-gray-100 shadow-xl dark:bg-gray-800 dark:text-stone-300 text-slate-600 p-2 rounded-xl mx-2 mb-20 font-bold text-center">
            Enter Your Information
          </h1>
          <div className="text-center">
            {session?.user?.image && (
              <Image
                width={100}
                height={100}
                src={session.user.image}
                alt="Profile Picture"
                className="rounded-full mx-auto"
              />
            )}
          </div>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" value={session?.user?.email || ""} readOnly />
            </FormControl>
          </FormItem>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Change your name? (optional)"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your age (optional)"
                    type="number"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage>{errors.age?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your height in centimeters (optional)"
                    type="number"
                    step="0.1"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage>{errors.height?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your weight in kgs (optional)"
                    type="number"
                    step="0.1"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage>{errors.weight?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">MALE</SelectItem>
                      <SelectItem value="FEMALE">FEMALE</SelectItem>
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.sex?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="trainerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trainer</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem
                          key={trainer.email}
                          value={trainer.email}
                          onClick={() => field.onChange(trainer.email)} // Set email on click
                        >
                          <div className="flex items-center gap-4 cursor-pointer">
                            {trainer.image && (
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={trainer.image}
                                  alt={`${trainer.name}'s profile`}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                              </div>
                            )}
                            <span className="text-sm">{trainer.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.trainerEmail?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="fitnessGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Got any fitness goals? Please let us know"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage>{errors.fitnessGoals?.message}</FormMessage>
              </FormItem>
            )}
          />
          {isSubmitting && (
            <p className="text-blue-500">Updating user information...</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Proceed
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoExtra;
