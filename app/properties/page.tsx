import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../libs/actions/getCurrentUser.action";
import getListings from "../libs/actions/getListings.action";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  // check if logged in user
  if (!currentUser) {
    return <EmptyState title="Unathorized" subtitle="Please Login" />;
  }

  // get all listings owned by current User
  const userId = currentUser.id
  const listings = await getListings({ userId: userId });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
