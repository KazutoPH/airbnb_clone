import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../libs/actions/getCurrentUser.action";
import getFavoriteListings from "../libs/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  // get users favorite listing
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }
  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
