"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import BookingForm from "./booking-form";

const FormSheet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="gap-2 px-4 flex items-center justify-end">
            <Button className="rounded-full bg-[#10715A] hover:bg-[#10715A]/90 text-white">
              Create Activity
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <span className="text-2xl text-[#10715A]">Book Court,</span>
              <span className="text-xs text-[#10715A]"> Wed Jul 30, 2025</span>
            </SheetTitle>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <BookingForm />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FormSheet;
