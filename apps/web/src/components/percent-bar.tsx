import { cn } from "pol-ui";

interface PercentBarProps {
  width: number;
  negative?: boolean;
  moneyToReceive?: string
}
const PercentBar = ({
  width,
  negative = false,
  moneyToReceive,
}: PercentBarProps) => {
  const commonClasses = "flex w-full h-full relative";

  const stateClasses = negative ? "justify-end" : "justify-start";

  const stateBarClasses = negative
    ? "bg-red-400 rounded-l-2xl rounded-r-md"
    : "bg-green-400 rounded-r-2xl rounded-l-md";

  return (
    <li className={cn(commonClasses, stateClasses)}>
      <div
        style={{ width: `${width}%` }}
        className={cn(stateBarClasses, "h-full")}
      >
        {Boolean(moneyToReceive) && (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {moneyToReceive}€
          </span>
        )}
      </div>
    </li>
  );
};

export default PercentBar;
