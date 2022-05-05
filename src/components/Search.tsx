import React from 'react'
import { useLazyQuery, gql } from '@apollo/client';
import Link from './Link';

interface ILink {
    link?: HTMLAnchorElement;
}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
    const [searchFilter, setSearchFilter] = React.useState('')
    const [executeSearch, { data }] = useLazyQuery(
        FEED_SEARCH_QUERY
    )
    return (
        <>
            <div>
                Search
                <input type='text' onChange={(e) => setSearchFilter(e.target.value)} />
                <button onClick={() =>
                    executeSearch({
                        variables: { filter: searchFilter }
                    })
                }>OK</button>
            </div>
            {data &&
                data.feed.links.map((link: ILink, index: number) => (
                    <Link link={link} index={index} />
                ))}
        </>
    )
}
export default Search