"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    if (selected) {
      router.push(`/`);
    } else {
      router.push(`/?category=${label}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </div>
  );
};

export default CategoryBox;
