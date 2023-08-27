"use client";

interface Props {
  type: "sucess" | "error";
  children: string;
}

export const Message = ({ type, children }: Props) => {

  let typeStyle = "";

  switch (type) {
    case "sucess":
      typeStyle = "bg-green-500/30"
      break;

    case "error":
      typeStyle = "bg-red-500/30"
      break;
  }

  return (
    <div className={`p-2 text-zinc-300 text-center rounded-lg ${typeStyle}`}>{ children }</div>
  )
}
