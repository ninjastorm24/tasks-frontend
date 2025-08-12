"use client";
import React, { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
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
import { Switch } from "./ui/switch";

// shadcn helper components used for the multiselect
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { SheetClose, SheetFooter } from "./ui/sheet";

const COURTS = [
  { id: "c1", label: "Court 1" },
  { id: "c2", label: "Court 2" },
  { id: "c3", label: "Court 3" },
  { id: "c4", label: "Court 4" },
  { id: "c5", label: "Court 5" },
  { id: "c6", label: "Court 6" },
  { id: "c7", label: "Court 7" },
];

const currencyOptions = [
  { label: "$", value: "USD" },
  { label: "৳", value: "BDT" },
  { label: "€", value: "EUR" },
];

const discountOptions = [
  { value: "fixed", label: "Fixed" },
  { value: "percent", label: "%" },
];

const formSchema = z.object({
  createdBy: z.string().email().min(1, "Email is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  activity: z.string().min(1, "Activity is required"),
  recurrentActivity: z.boolean().optional(),
  multiCourts: z.array(z.string()).optional(),
  bookingCheckin: z.boolean().optional(),
  cancelTime: z.number().min(0).max(24, "Max 24 hours allowed"),
  priceCurrency: z.string().min(1, "Currency is required"),
  priceValue: z.number().min(0, "Price must be a positive number"),
  doorCode: z.string().optional(),
  type: z.string().min(1, "Type is required"),
  amount: z.number().min(0, "Discount must be a positive number"),
  discountType: z.string().min(1, "Discount type is required"),
  discountValue: z.number().min(0, "Discount must be a positive number"),
});

const MultiSelect = ({
  value = [],
  onChange,
  options = [],
}: {
  value?: string[];
  onChange: (v: string[]) => void;
  options: { id: string; label: string }[];
}) => {
  // derived label
  const selectedLabels = useMemo(
    () => options.filter((o) => value.includes(o.id)).map((o) => o.label),
    [value, options]
  );

  const toggle = (id: string) => {
    if (value.includes(id)) onChange(value.filter((v) => v !== id));
    else onChange([...value, id]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start rounded-full">
          <div className="flex-1 text-left">
            {selectedLabels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedLabels.map((l) => (
                  <Badge key={l} variant="secondary" className="rounded-full">
                    {l}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">
                Select Courts
              </span>
            )}
          </div>
          <ChevronDown color="#ccc" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-2">
        <Command>
          <CommandInput placeholder="Search Courts..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            {options.map((opt) => (
              <CommandItem
                key={opt.id}
                onSelect={() => toggle(opt.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={value.includes(opt.id)}
                    onCheckedChange={() => toggle(opt.id)}
                  />
                  <span>{opt.label}</span>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const BookingForm = () => {
  // initialize form with zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdBy: "",
      startTime: "",
      endTime: "",
      activity: "",
      multiCourts: [],
      recurrentActivity: false,
      bookingCheckin: false,
      cancelTime: 0,
      doorCode: "",
      amount: 0,
      type: "USD", // default to Dollar
      discountType: "percent", // default to fixed discount
      discountValue: 0,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="">
            <FormField
              control={form.control}
              name="recurrentActivity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-full border p-3 shadow-sm ">
                  <div className="space-y-0.5">
                    <FormLabel>Recurrent Activity</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className="data-[state=checked]:bg-[#10715A] "
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="multiCourts"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-start gap-2">
                    <FormLabel>Choose Multiple Courts</FormLabel>
                  </div>

                  <FormControl>
                    <MultiSelect
                      options={COURTS}
                      value={field.value || []}
                      onChange={(v) => field.onChange(v)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*  */}
          <div className="">
            <FormField
              control={form.control}
              name="bookingCheckin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-full border p-3 shadow-sm ">
                  <div className="space-y-0.5">
                    <FormLabel>Booking Check In</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      className="data-[state=checked]:bg-[#10715A] "
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="cancelTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancellation Time (Hours)</FormLabel>
                    <div className="flex items-center justify-between gap-2 border rounded-full p-2">
                      <Button
                        className="rounded-full h-6 w-6"
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          field.onChange(Math.max(0, (field.value || 0) - 1))
                        }
                      >
                        <Minus className="w-2 h-2" />
                      </Button>
                      <span className="w-12 text-center">{field.value}</span>
                      <Button
                        className="rounded-full h-6 w-6"
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          field.onChange(Math.min(24, (field.value || 0) + 1))
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
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
                    <FormLabel>Door Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Door Code"
                        {...field}
                        className="rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid   grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Price</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-full overflow-hidden">
                        {/* Left Select */}
                        <Controller
                          name="type"
                          control={form.control}
                          render={({ field: selectField }) => (
                            <Select
                              onValueChange={selectField.onChange}
                              value={selectField.value}
                            >
                              <SelectTrigger className="w-28 rounded-none rounded-l-full border-r-0">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent
                                position="popper"
                                className="w-40 bg-white border-2 rounded-md border-gray-200 "
                              >
                                {/* Combine currencies and discount types */}
                                {currencyOptions.map((c) => (
                                  <SelectItem key={c.value} value={c.value}>
                                    {c.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {/* Vertical separator */}
                        <div className="w-px h-6 bg-gray-300" />

                        {/* Right Input */}
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          className="rounded-none rounded-r-full border-l-0 flex-grow"
                          min={0}
                          step="any"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-full overflow-hidden">
                        {/* Left Select */}
                        <Controller
                          name="discountType"
                          control={form.control}
                          render={({ field: selectField }) => (
                            <Select
                              onValueChange={selectField.onChange}
                              value={selectField.value}
                            >
                              <SelectTrigger className="w-20 rounded-none rounded-l-full border-r-0">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent
                                position="popper"
                                className="w-28 bg-white border-2 rounded-md border-gray-200"
                              >
                                {discountOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {/* Vertical separator */}
                        <div className="w-px h-6 bg-gray-300" />

                        {/* Right Input */}
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          className="rounded-none rounded-r-full border-l-0 flex-grow"
                          min={0}
                          step="any"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* sheet footer */}
        <SheetFooter>
          <div className="flex items-center justify-between gap-2">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="bg-[#ccc] hover:bg-[#bbb] rounded-full text-black"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className="rounded-full bg-[#10715A] hover:bg-[#10715A]/90 text-white"
            >
              Book Court
            </Button>
          </div>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default BookingForm;
