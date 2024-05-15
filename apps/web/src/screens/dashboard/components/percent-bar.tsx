import { cn } from "pol-ui";

interface PercentBarProps {
  width: number;
  negative?: boolean;
}
const PercentBar = ({ width, negative = false }: PercentBarProps) => {
  const commonClasses = "flex w-full h-full relative border-secondary-800";

  const stateClasses = negative ? "justify-end" : "justify-start";

  const stateBarClasses = negative
    ? "bg-red-400 rounded-l-2xl "
    : "bg-green-400 rounded-r-2xl";

  return (
    <li className={cn(commonClasses, stateClasses)}>
      <div
        style={{ width: `${width}%` }}
        className={cn(stateBarClasses, "h-full")}
      ></div>
    </li>
  );
};

export default PercentBar;
