import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function Stats({
  recentBookings,
  confirmStays,
  numDays,
  numCabins,
}) {
  //1
  const numBookings = recentBookings.length;

  //2
  const numSales = recentBookings.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );

  //3
  const numCheckins = confirmStays.length;

  //4
  const occupation =
    confirmStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * numCabins);
  //num checked in nights / all available nights
  //(num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        title="Sales"
        value={formatCurrency(numSales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="Checked ins"
        value={numCheckins}
        icon={<HiOutlineCalendarDays />}
        color="yellow"
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineArrowTrendingUp />}
        color="green"
      />
    </>
  );
}
