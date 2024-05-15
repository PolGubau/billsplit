import { User } from "../../../../types/base";
import UserBar from "./user-bar";
interface AllBarsProps {
  users: User[];
  avgPaid: number;
}
const AllBars = ({ users, avgPaid }: AllBarsProps) => {
  return (
    <ul className="flex gap flex-col justify-center items-center divide divide-y gap-2">
      {users.map((user, index) => (
        <UserBar key={index} user={user} avgPaid={avgPaid} />
      ))}
    </ul>
  );
};

export default AllBars;
