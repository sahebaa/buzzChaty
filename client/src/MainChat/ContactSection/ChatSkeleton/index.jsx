import React from "react";

const inde = () => {
  return (
    <div className="w-[30vw] h-[100%] flex justify-start flex-col gap-[1rem] flex-1 pl-[0.3rem] pr-[0.3rem] pt-[1vh]">
      {[...Array(7)].map((i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default inde;
