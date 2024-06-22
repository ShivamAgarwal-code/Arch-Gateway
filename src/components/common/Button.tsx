import Image from "next/image";
import { MouseEventHandler } from "react";
import tw from "tailwind-styled-components";

export type ButtonStatus = "loading" | "error" | "active" | "disabled";
export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

interface ButtonProps {
  isLoading: boolean;
  hasValue: boolean;
  onClick?: () => void;
  buttonText: string;
}

const Button = ({ isLoading, hasValue, onClick, buttonText }: ButtonProps) => {
  if (isLoading) {
    return <Loading content={buttonText} />;
  } else {
    if (hasValue) return <Active onClick={onClick} content={buttonText} />;
    else {
      return <InActive content={buttonText} />;
    }
  }
};
export default Button;

export const Active = ({
  onClick,
  content,
}: {
  onClick?: ClickHandler;
  content: string;
}) => {
  return (
    <button
      className="flex flex-row w-full md:py-3 py-2 px-4 text-center items-center justify-center md:text-2xl md:rounded-xl rounded-lg text-yellow-500 bg-orange-500 hover:bg-orange-600 font-semibold transform duration-200 shadow-sm text-lg text-white"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const Loading = ({ content }: { content: string }) => {
  return (
    <button className="cursor-not-allowed flex flex-row w-full md:py-3 py-2 px-4 text-center items-center justify-center md:text-2xl md:rounded-xl rounded-lg text-gray-400 bg-black font-semibold transform duration-200 shadow-sm text-lg">
      {content}
      <div className=" h-full ml-4 flex items-center animate-spin">
        <Image src={"/loading.png"} width={20} height={20} alt={""} />
      </div>
    </button>
  );
};

export const InActive = ({ content }: { content: string }) => {
  return (
    <button className="cursor-not-allowed inline-block w-full md:py-3 py-2 px-4 text-center md:text-2xl md:rounded-xl rounded-lg text-gray-700 bg-gray-400 font-semibold transform duration-200 shadow-sm text-lg">
      {content}
    </button>
  );
};

export const ButtonLayout = tw.button`
    border-[1px] border-white
    rounded-[5px]
    md:px-4 md:py-2
    px-2 py-1
    hover:bg-gradient-to-r from-orange-400 to-orange-800
`;
