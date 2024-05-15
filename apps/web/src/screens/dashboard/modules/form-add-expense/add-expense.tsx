import { Button, Input, Select } from "pol-ui";
import { User } from "../../../../types/base";
import SlidersForm from "./sliders-form";
import { useAddExpense } from "./use-add-expense";

interface AddFormProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const AddForm = ({ users, setUsers }: AddFormProps) => {
  const { addPayment, amountsPerUser, amount, setAmount, setAmountsPerUser } =
    useAddExpense({ users, setUsers });

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
        {Boolean(amount) && (
          <SlidersForm
            users={users}
            amountToReach={amount}
            amountsPerUser={amountsPerUser}
            setAmountsPerUser={setAmountsPerUser}
          />
        )}
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddForm;
