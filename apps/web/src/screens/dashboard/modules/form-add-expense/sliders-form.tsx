import { Alert, Input, RangeSlider } from "pol-ui";
import { useEffect, useMemo } from "react";
import { Amount, getAmountsPerUser, truncateNumber } from "./helpers";
import { User } from "../../../../types/base";
import { toEuro } from "../../../../utils/parsers";

export interface SliderFormProps {
  users: User[];
  amountToReach: number;
  amountsPerUser: Amount[];
  setAmountsPerUser: (amounts: Amount[]) => void;
}
const SlidersForm = ({
  users,
  amountToReach,
  amountsPerUser,
  setAmountsPerUser,
}: SliderFormProps) => {
  useEffect(() => {
    setAmountsPerUser(getAmountsPerUser(users, amountToReach));
  }, [amountToReach]);

  const sumAmounts = useMemo(() => {
    const amount = amountsPerUser.reduce(
      (acc, amount) => acc + amount.amount,
      0
    );
    return truncateNumber(amount);
  }, [amountsPerUser]);

  const onSlide = (newValue: string | number, who: User["name"]) => {
    // delete decimals
    const newAmount = truncateNumber(newValue);

    const newAmounts = amountsPerUser.map((amount) => {
      if (amount.name === who) {
        return { ...amount, amount: newAmount };
      }
      return amount;
    });

    setAmountsPerUser(newAmounts);
  };

  return (
    <div className="flex flex-col gap-2">
      {amountsPerUser.map((amount, index) => {
        return (
          <li
            key={index}
            className="grid grid-cols-[70px,1fr,1fr] gap-4 w-full"
          >
            {amount.name}
            <RangeSlider
              value={amount.amount}
              max={amountToReach}
              step={0.01}
              onChange={(v) => {
                onSlide(v.target.value, amount.name);
              }}
            />
            <Input
              size="sm"
              type="number"
              value={amount.amount / 100}
              onChange={(e) => {
                onSlide(Number(e.target.value) * 100, amount.name);
              }}
            />
          </li>
        );
      })}
      <div>
        <p className="text-sm flex flex-col gap-1 ">
          <span className="">Total: {toEuro(sumAmounts)}€</span>

          {Boolean(amountToReach) && sumAmounts != amountToReach && (
            <Alert color="warning">
              {/* some cents are lost in the way, show a warning  */}
              You are
              {sumAmounts > amountToReach
                ? " exceeding"
                : " not reaching"} by {` `}
              {Math.abs((amountToReach - sumAmounts) / 100)}€
            </Alert>
          )}
        </p>
      </div>
    </div>
  );
};

export default SlidersForm;
