import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Image from "next/image";
import getListings, {
  IListingsParams,
} from "./libs/actions/getListings.action";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./libs/actions/getCurrentUser.action";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // if empty display custom empty page
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
}
