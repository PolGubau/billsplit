import { Card } from "pol-ui";
import { User } from "../../../types/base";
import { toEuro } from "../../../utils/parsers";

interface ConclusionsProps {
  totalPaid: number;
  avgPaidPerUser: number;
  users: User[];
}
const Conclusions = ({
  totalPaid,
  avgPaidPerUser,
  users,
}: ConclusionsProps) => {
  return (
    <section className="flex flex-col gap-2">
      <Card className="border border-secondary">
        The total amount paid is {toEuro(totalPaid)}€, so the amount per user is{" "}
        {toEuro(avgPaidPerUser)}€.
      </Card>
      {users.map((user, index) => {
        const moneyToReceive = user.paid - avgPaidPerUser;

        const isPositive = user.paid > avgPaidPerUser;

        const receiveOrPay = isPositive ? "receive" : "pay";
        return (
          <p key={index} className="border border-primary p-2 rounded-lg">
            {user.name} has paid {toEuro(user.paid)}€, so should {receiveOrPay}{" "}
            {Math.abs(toEuro(moneyToReceive))}€.
          </p>
        );
      })}
    </section>
  );
};

export default Conclusions;
