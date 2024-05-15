import { cn } from "pol-ui";
import { toEuro } from "../../../utils/parsers";
import PercentBar from "./percent-bar";

interface AmountBarProps {
  paid: number;
  avg: number;
}

const AmountBar = ({ paid, avg }: AmountBarProps) => {
  // if you've paid exactly the avg = 0% of the bar.
  const paidWidth = (Math.abs(paid - avg) / avg) * 100; // the width of the line that represents the amount paid.

  const hasPaidMore = paid > avg; // if I've paid more than the avg, the line should go to the right and be green.
  const hasPaidLess = paid < avg; // if I've paid less than the avg, the line should go to the left and be red.

  const positiveWidth = hasPaidMore ? paidWidth : 0; // the width of the green line.
  const negativeWidth = hasPaidLess ? paidWidth : 0; // the width of the red line.

  const moneyToReceive = paid - avg;

  return (
    <ul className="grid grid-cols-2 w-full justify-center items-center relative">
      <PercentBar width={negativeWidth} negative />
      <PercentBar width={positiveWidth} />
      <span
        className={cn(
          "absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2",
          {
            "left-10": negativeWidth,
            "right-10": positiveWidth,
            "left-1/2": !negativeWidth && !positiveWidth,
          }
        )}
      >
        {toEuro(moneyToReceive)}€
      </span>
    </ul>
  );
};

export default AmountBar;
