import React from 'react'
import Link from './Link'
import { useQuery, gql } from '@apollo/client'
import { url } from 'inspector'

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

const LinkLists: React.FC = () => {
    const { data } = useQuery(FEED_QUERY)
    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map((link: { id: React.Key | null | undefined }) => (
                        <Link key={link.id} link={link} />
                    ))}
                </>
            )}
        </div>
    )
}
export default LinkLists