import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeCurrentUser } from "@/types";
import { Listing, User } from "@prisma/client";

interface FavoriteCLientProps {
  listings: Listing[];
  currentUser?: SafeCurrentUser | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoriteCLientProps) => {
  return (
    <Container>
      <Heading title="favorites" subtitle="List of places you have fovirited" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
