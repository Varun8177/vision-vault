import { twMerge } from "tailwind-merge";

type Props = {
  index: number;
  title: string;
  value: string;
};

const OverviewCard = ({ index = 0, title = "", value = "" }: Props) => {
  return (
    <div
      className={twMerge(
        `relative h-[159px] w-[250px] min-w-[250px] grow cursor-pointer select-none rounded-md p-4 text-black`,
        index === 0 && "bg-[#0BF4C8]",
        index === 1 && "bg-[#FAD85D]",
        index === 2 && "bg-[#F2A0FF]",
      )}
    >
      <div className="space-y-4">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
      <img
        src="https://res.cloudinary.com/megamart/image/upload/f_auto,q_auto/v1/Analytics%20Dashboard/qp483ydrergexxbp2bv7"
        alt="strokes"
        className="absolute right-0 top-0 h-20 object-contain lg:h-auto lg:w-auto"
        draggable="false"
      />
    </div>
  );
};

export default OverviewCard;
