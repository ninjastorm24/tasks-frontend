"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { activities, times } from "@/constants";

const formSchema = z.object({
  createdBy: z.string().email().min(1, "Email is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  activity: z.string().min(1, "Activity is required"),
});

const BookingForm = () => {
  // initialize form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdBy: "",
      startTime: "",
      endTime: "",
      activity: "",
    },
  });
  // define submit handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Created By</FormLabel>
                    <span className="text-[#03F181]">*</span>
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Ex: test@padelmates.se"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-start gap-2">
                      <FormLabel>Start Time</FormLabel>
                      <span className="text-[#03F181]">*</span>
                    </div>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="rounded-full w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        side="bottom"
                        sideOffset={4}
                        className="max-h-70 overflow-auto bg-white"
                      >
                        {times.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-start gap-2">
                      <FormLabel>End Time</FormLabel>
                      <span className="text-[#03F181]">*</span>
                    </div>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="rounded-full w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position="popper"
                        side="bottom"
                        sideOffset={4}
                        className="max-h-70 overflow-auto bg-white"
                      >
                        {times.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Choose Activity</FormLabel>
                    <span className="text-[#03F181]">*</span>
                  </div>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="rounded-full w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      sideOffset={4}
                      className=" overflow-auto bg-white max-w-md w-xs border-2 rounded-md border-gray-200"
                    >
                      {activities.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BookingForm;
