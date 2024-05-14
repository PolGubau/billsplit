import { Avatar, Button, Input, Select } from "pol-ui";
import AmountBar from "./components/amount-bar";
import { FormEvent, useState } from "react";
// tricount clone

export interface User {
  name: string;
  paid: number;
}
const mockUsers: User[] = [
  {
    name: "Sandra",
    paid: 120,
  },
  {
    name: "John",
    paid: 25,
  },
  {
    name: "Alice",
    paid: 73,
  },
];

const amountTotal = mockUsers.reduce((acc, user) => acc + user.paid, 0);
const amountPerUser = amountTotal / mockUsers.length;

const parsedTotal = parseFloat(amountTotal.toString()).toFixed(2);
const parsedPerUser = parseFloat(amountPerUser.toString()).toFixed(2);

function App() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addPayment = (e: FormEvent) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const amount = parseFloat(formData.get("amount") as string);

    const user = users.find((user) => user.name === name);
    if (user) {
      user.paid += amount;
    } else {
      setUsers([...users, { name, paid: amount }]);
    }

    form.reset();
  };

  return (
    <main className="p-2 border-4 rounded-xl border-primary flex flex-col gap-8 justify-center ">
      <h1 className="text-primary-700 my-8">Billsplit</h1>

      <ul className="flex gap-4 flex-col justify-center items-center">
        {users.map((user, index) => (
          <li key={index} className="grid grid-cols-[auto,1fr] w-full">
            <div className="flex gap-2 items-center">
              <Avatar
                img={`https://api.multiavatar.com/${user.name}.svg`}
                alt="avatar"
                className="w-50 h-50 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <AmountBar paid={user.paid} avg={amountPerUser} />
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-2">
        Conclusions
        <p className="border border-secondary p-2 rounded-lg">
          The total amount is {parsedTotal}€, so the amount per user is{" "}
          {parsedPerUser}€.
        </p>
        {users.map((user, index) => {
          const moneyToReceive = parseFloat(
            (user.paid - amountPerUser).toString()
          ).toFixed(2);

          const isPositive = user.paid > amountPerUser;

          const receiveOrPay = isPositive ? "receive" : "pay";
          return (
            <p key={index} className="border border-primary p-2 rounded-lg">
              {user.name} has paid {user.paid}€, so they should {receiveOrPay}{" "}
              {moneyToReceive}€.
            </p>
          );
        })}
      </section>

      <section>
        <form className="flex gap-4 flex-col" onSubmit={addPayment}>
          <Select name="name" id="name">
            {users.map((user, index) => (
              <option key={index} value={user.name}>
                {user.name}
              </option>
            ))}
          </Select>
          <Input label="Amount" name="amount" id="amount" />
          <Button type="submit">Add</Button>
        </form>
      </section>
    </main>
  );
}

export default App;
