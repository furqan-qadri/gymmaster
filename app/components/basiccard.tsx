import React from "react";

function BasicCard(props: any) {
  return (
    <div className="rounded-lg p-5 xl:min-w-[192px] bg-slate-100 ">
      <div className="mb-2 font-bold">{props.title}</div>
      <div className="text-2xl font-bold ">{props.content}</div>
    </div>
  );
}

export default BasicCard;
