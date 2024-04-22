import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../libs/actions/getCurrentUser.action";
import getReservations from "../libs/actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  // check if logged in user
  if (!currentUser) {
    return <EmptyState title="Unathorized" subtitle="Please Login" />;
  }

  // get all reservation
  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
