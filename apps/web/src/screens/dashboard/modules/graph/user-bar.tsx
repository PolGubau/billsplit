import { Avatar } from "pol-ui";
import AmountBar from "../../components/amount-bar";
import { User } from "../../../../types/base";

interface UserBarProps {
  user: User;
  avgPaid: number;
}

const UserBar = ({ user, avgPaid }: UserBarProps) => {
  return (
    <li className="grid grid-cols-[auto,1fr] w-full pt-2">
      <div className="flex gap-2 items-center min-w-[120px]">
        <Avatar
          img={`https://api.multiavatar.com/${user.name}.svg`}
          alt="avatar"
          className="w-50 h-50 rounded-full"
        />
        <span className="text-lg color-secondary-800">{user.name}</span>
      </div>
      <AmountBar paid={user.paid} avg={avgPaid} />
    </li>
  );
};

export default UserBar;
