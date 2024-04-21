import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import { categories } from '@/constants'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useMemo } from 'react'

interface ListingClientProps {
  reservations?: Reservation[]
  listing: Listing & {
    user: User
  }
  currentUser?: User | null
}

const ListingClient = ({
  listing,
  currentUser,
}: ListingClientProps) => {

  // get the category from constant
  const category = useMemo(() => {
    return categories.find((item) =>
      item.label === listing.category
    )
  }, [listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  )
}

export default ListingClient