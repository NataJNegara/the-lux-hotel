import styled from "styled-components";

import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStay";
import { useCabins } from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, recentBookings } = useRecentBooking();
  const { isLoading: isLoading2, confirmStays, numDays } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoading || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmStays={confirmStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
