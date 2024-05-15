import { FormEvent, useState } from "react";
import { Amount, getAmountsPerUser } from "./helpers";
import { User } from "../../../../types/base";

interface useAddExpenseProps {
  users: User[];
  setUsers: (users: User[]) => void;
}
export const useAddExpense = ({ users, setUsers }: useAddExpenseProps) => {
  const [amount, setAmount] = useState(0);

  const [amountsPerUser, setAmountsPerUser] = useState<Amount[]>(
    getAmountsPerUser(users, amount)
  );

  const addPayment = (e: FormEvent) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") as string; // quien ha pagado

    // amountsPerUser // lo que han gastado de verdad cada uno

    const user = users.find((user) => user.name === name);

    if (user) {
      // link with amountsPerUser and, for each user, add the amount they have to pay into the 'needsToPay' field, and the one with the name of who paid, the amount paid is sum into the 'paid' field
      const newUsers = users.map((user) => {
        const amount = amountsPerUser.find(
          (amount) => amount.name === user.name
        );
        if (amount) {
          return {
            ...user,
            needsToPay: user.needsToPay + amount.amount,
            paid: user.name === name ? user.paid + amount.amount : user.paid,
          };
        }
        return user;
      });

      setUsers(newUsers);
    } else {
      setUsers([...users, { name, needsToPay: 0, paid: amount }]);
    }

    form.reset();
    setAmount(0);
  };
  return { addPayment, amountsPerUser, amount, setAmount, setAmountsPerUser };
};
