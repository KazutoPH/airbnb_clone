"use client";

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import CustomButton from "../CustomButton";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-2xl font-semibold">${price}</p>
        <p className="text-neutral-600 font-light">night</p>
      </div>
      <hr />

      {/* Custom Calendar Component */}
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />

      {/* Submit  Button */}
      <div className="p-4">
        <CustomButton disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      {/* total price display */}
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
