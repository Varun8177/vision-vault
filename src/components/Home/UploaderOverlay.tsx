import React from "react";

type Props = {};

const UploaderOverlay = (props: Props) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex h-[150px] w-[150px] rounded-md opacity-30">
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-slate-400 opacity-30"></div>
      </div>
    </div>
  );
};

export default UploaderOverlay;
