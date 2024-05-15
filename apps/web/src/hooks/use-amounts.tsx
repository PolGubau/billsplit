import { useState } from "react";
import { User } from "../types/base";
import { mockUsers } from "../data/users";
import { truncateNumber } from "../screens/dashboard/modules/form-add-expense/helpers";

export const useAmount = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const totalPaid = users.reduce((acc, user) => acc + user.paid, 0);

  const avgPaidPerUser = truncateNumber(totalPaid / users.length);

  return { users, setUsers, totalPaid, avgPaidPerUser };
};
