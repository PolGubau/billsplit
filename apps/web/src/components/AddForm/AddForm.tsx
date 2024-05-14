import { Button, Input, Select } from "pol-ui";
import { FormEvent, useState } from "react";
import { User } from "../../App";
import SlidersForm from "./sliders-form";
import { Amount, getAmountsPerUser } from "./helpers";

interface AddFormProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const AddForm = ({ users, setUsers }: AddFormProps) => {
  const [amount, setAmount] = useState(0);

  const [amountsPerUser, setAmountsPerUser] = useState<Amount[]>(
    getAmountsPerUser(users, amount)
  );

  const addPayment = (e: FormEvent) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") as string; // quien ha pagado
    const amount = parseFloat(formData.get("amount") as string); // la cuenta de la cena

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
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl text-center">Add new expense</h2>
      <form className="flex gap-4 flex-col" onSubmit={addPayment}>
        <Select name="name" id="name">
          {users.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </Select>
        <Input
          label="Amount"
          name="amount"
          id="amount"
          type="number"
          value={amount / 100}
          onChange={(e) => setAmount(Number(e.target.value) * 100)}
        />
        <SlidersForm
          users={users}
          amountToReach={amount}
          amountsPerUser={amountsPerUser}
          setAmountsPerUser={setAmountsPerUser}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddForm;
