import { Avatar } from "pol-ui";
import { useState } from "react";
import AddForm from "./components/AddForm/AddForm";
import AmountBar from "./components/amount-bar";
// tricount clone

export interface User {
  name: string;
  paid: number;
  needsToPay: number;
}
const mockUsers: User[] = [
  {
    name: "Sandra",
    paid: 0,
    needsToPay: 0,
  },
  {
    name: "John",
    paid: 0,
    needsToPay: 0,
  },
  {
    name: "Alice",
    paid: 0,
    needsToPay: 0,
  },
];

const amountTotal = mockUsers.reduce((acc, user) => acc + user.paid, 0);
const amountPerUser = Number((amountTotal / mockUsers.length).toFixed(0));

function App() {
  const [users, setUsers] = useState<User[]>(mockUsers);

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
          The total amount is {amountTotal / 100}€, so the amount per user is{" "}
          {amountPerUser / 100}€.
        </p>
        {users.map((user, index) => {
          const moneyToReceive = user.paid - amountPerUser;

          const isPositive = user.paid > amountPerUser;

          const receiveOrPay = isPositive ? "receive" : "pay";
          return (
            <p key={index} className="border border-primary p-2 rounded-lg">
              {user.name} has paid {user.paid / 100}€, so they should{" "}
              {receiveOrPay} {moneyToReceive / 100}€.
            </p>
          );
        })}
      </section>

      <AddForm users={users} setUsers={setUsers} />

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}

export default App;
