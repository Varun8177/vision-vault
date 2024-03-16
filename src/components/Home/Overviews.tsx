import { useContext } from "react";
import OverviewCard from "./OverviewCard";
import { DataContext } from "../../contexts/DataContext";
import { OverviewItemType } from "../../utils/types";

type Props = {};

const Overviews = (props: Props) => {
  const dataContext = useContext(DataContext);

  const overviewData: OverviewItemType[] = [
    {
      title: "Total space used",
      value: "5GB",
    },
    {
      title: "Images Uploaded",
      value: `${dataContext?.imageSize}MB`,
    },
    {
      title: "Videos Uploaded",
      value: `${dataContext?.videoSize}MB`,
    },
  ];

  return (
    <div className="flex w-full flex-wrap gap-4">
      {overviewData.map((item, i) => (
        <OverviewCard key={i} {...item} index={i} />
      ))}
    </div>
  );
};

export default Overviews;
