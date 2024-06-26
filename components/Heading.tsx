"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <p className="text-2xl font-bold">{title}</p>
      <p className="font-light text-neutral-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Heading;
