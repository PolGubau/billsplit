import { User } from "../../App";

export const truncateNumber = (number: string | number) =>
  Number(number.toString().split(".")[0]);

export const getAmountsPerUser = (users: User[], amountToReach: number) => {
  return users.map((user) => {
    return {
      name: user.name,
      amount: truncateNumber(amountToReach / users.length),
    };
  });
};

export interface Amount {
  name: string;
  amount: number;
}
