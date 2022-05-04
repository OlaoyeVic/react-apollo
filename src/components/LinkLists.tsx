import React from 'react'
import Links from './Links'
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
                        <Links key={link.id} link={link} />
                    ))}
                </>
            )}
        </div>
    )
}
export default LinkLists