import getCurrentUser from "@/app/libs/actions/getCurrentUser.action"
import getListingById from "@/app/libs/actions/getListingById"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  console.log(params)
  // server action getting list by params Id and Current User
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <EmptyState />
    )
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
    />
  )
}

export default ListingPage