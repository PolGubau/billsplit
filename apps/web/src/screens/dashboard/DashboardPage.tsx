import { useAmount } from "../../hooks/use-amounts";
import Conclusions from "./modules/conclusions";
import AddForm from "./modules/form-add-expense/add-expense";
import AllBars from "./modules/graph/all-bars";

const DashboardPage = () => {
  const { users, setUsers, totalPaid, avgPaidPerUser } = useAmount();

  return (
    <main className="p-2 border-4 rounded-xl border-primary flex flex-col gap-8 justify-center ">
      <h1 className="text-primary-700 my-8">Billsplit</h1>

      <AllBars users={users} avgPaid={avgPaidPerUser} />

      {Boolean(totalPaid) && (
        <Conclusions
          totalPaid={totalPaid}
          avgPaidPerUser={avgPaidPerUser}
          users={users}
        />
      )}

      <AddForm users={users} setUsers={setUsers} />
    </main>
  );
};

export default DashboardPage;
