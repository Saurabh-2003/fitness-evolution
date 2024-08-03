"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Key, useEffect, useState } from "react";
import { Loader, X } from "lucide-react";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getTrainers } from "@/core/actions/get-trainers";
import { updateUser } from "@/core/actions/update-user-role-and-trainermail";

import { ROLE } from "@prisma/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  role: z.enum([ROLE.ADMIN, ROLE.USER, ROLE.TRAINER]),
  sex: z.string(),
  age: z.string(),
  weight: z.string(),
  height: z.string(),
  goal: z.string(),
  trainerName: z.string().optional(),
  studentsNames: z.array(z.string()),
});

interface TrainersSchema {
  email: string;
  name: string | null;
  image: string | null;
}

function MembersDetailsForm({
  AlertDialogFooter,
  data,
}: {
  data: any;
  AlertDialogFooter: any;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const roles = ["ADMIN", "USER", "TRAINER"];
  const [trainers, setTrainers] = useState<TrainersSchema[] | null>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { trainers: fetchedTrainers } = await getTrainers();
        if (Array.isArray(fetchedTrainers)) {
          const trainersData = fetchedTrainers as TrainersSchema[];
          setTrainers(trainersData);
        } else {
          console.error("Invalid trainers data format:", fetchedTrainers);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      sex: "",
      age: "",
      weight: "",
      height: "",
      goal: "",
      role: data?.role,
      trainerName: "",
      studentsNames: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    try {
      const res = await updateUser(data?.id, {
        role: values?.role,
        trainerEmail: values?.trainerName,
      });
      setIsPending(false);
      toast.success("User Updated Successfully");
      router.refresh();
    } catch (error) {
      setIsPending(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    <Table>
      <AlertDialogFooter>
        <div className="w-full h-[90vh]">
          <ScrollArea className="w-full h-full p-4">
            <div className="w-full mb-10 flex items-center justify-between">
              <h2 className="text-xl font-bold">View & Change Details</h2>
              <AlertDialogCancel className="p-1">
                <Button variant={"ghost"} size={"icon"}>
                  <X className="h-5 w-5" />
                </Button>
              </AlertDialogCancel>
            </div>
            <div className="w-full flex items-center justify-center mb-5">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={data?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {data?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Name</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          disabled
                          placeholder="Enter Name"
                          {...field}
                          value={field?.value || data?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Email</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="Enter Email"
                          {...field}
                          value={field?.value || data?.email}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Gender</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          disabled
                          placeholder="Enter gender"
                          {...field}
                          value={field?.value || data?.sex}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Age</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          disabled
                          placeholder="Enter Age"
                          {...field}
                          value={field?.value || data?.age}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Weight</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          disabled
                          placeholder="Enter Weight"
                          {...field}
                          value={field?.value || data?.weight}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Height</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          disabled
                          placeholder="Enter Height"
                          {...field}
                          value={field?.value || data?.height}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                      <FormLabel className="w-full">Role</FormLabel>
                      <FormControl className="w-full">
                        <Select
                          value={field?.value || data?.role}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles?.map((role, index) => (
                              <SelectItem key={index} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("role") === "USER" && (
                  <FormField
                    control={form.control}
                    name="trainerName"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">
                          Current Trainer
                        </FormLabel>
                        <FormControl className="w-full">
                          <Select
                            value={
                              field?.value ||
                              data?.trainerEmail ||
                              "No trainer selected"
                            }
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Trainer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="No trainer selected">
                                No trainer selected
                              </SelectItem>
                              {trainers &&
                                trainers?.map((trainer) => (
                                  <SelectItem
                                    key={trainer?.email}
                                    value={trainer?.email}
                                  >
                                    {trainer?.name} ({trainer?.email})
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {data?.role === "TRAINER" && (
                  <FormField
                    control={form.control}
                    name="studentsNames"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">Students Names</FormLabel>
                        <FormControl className="w-full">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-full border rounded-xl text-sm px-4 py-2">
                              List of students
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {data?.studentsData &&
                              data?.studentsData?.length > 0 ? (
                                data?.studentsData?.map(
                                  (
                                    { name, email, image }: any,
                                    index: Key | null | undefined
                                  ) => (
                                    <DropdownMenuItem
                                      key={index}
                                      className="w-full flex flex-col"
                                    >
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <Separator />
                                        <TableBody>
                                          <TableRow>
                                            <TableCell>
                                              <Image
                                                className={`size-8 rounded-full`}
                                                height={100}
                                                width={100}
                                                alt="User Image"
                                                src={image}
                                              />
                                            </TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                      <DropdownMenuSeparator />
                                    </DropdownMenuItem>
                                  )
                                )
                              ) : (
                                <p className="text-sm px-3 py-2 text-center">
                                  No students yet
                                </p>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {data?.role === "USER" && (
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col items-start justify-center gap-1">
                        <FormLabel className="w-full">Goal</FormLabel>
                        <FormControl className="w-full">
                          <Textarea
                            disabled
                            placeholder="Enter Goal..."
                            {...field}
                            value={field?.value || data?.fitnessGoals}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="w-full grid grid-cols-3 gap-2 items-center justify-center">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full col-span-2"
                  >
                    {isPending && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                  <AlertDialogCancel className="col-span-1">
                    Close
                  </AlertDialogCancel>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </div>
      </AlertDialogFooter>
    </Table>
  );
}

export default MembersDetailsForm;
