import React from 'react'
import Link from './Link'
import { useQuery, gql } from '@apollo/client'
import { url } from 'inspector'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants'

interface ILinksToRender {
    linksToRender?: [] | any
}

const take = LINKS_PER_PAGE;
const skip = 0;
const orderBy = { createdAt: 'desc' }

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
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
`;

export const FEED_QUERY = gql`
  query FeedQuery(
    $take: Int
    $skip: Int
    $orderBy: LinkOrderByInput
  ) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
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
      count
    }
  }
`;

const LinkLists: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const isNewPage = location.pathname.includes(
        'new'
    );
    const pageIndexParams = location.pathname.split(
        '/'
    );
    const page = parseInt(
        pageIndexParams[pageIndexParams.length - 1]
    );
    const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0

    const getQueryVariables = (isNewPage: boolean, page: number) => {
        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
        const take = isNewPage ? LINKS_PER_PAGE : 100;
        const orderBy = { createdAt: 'desc' };
        return { take, skip, orderBy };
    }

    const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page),
    })

    subscribeToMore({
        document: NEW_LINKS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            const exists = prev.feed.links.find(
                ({ id }: any) => id === newLink.id
            );
            if (exists) return prev;

            return Object.assign({}, prev, {
                feed: {
                    links: [newLink, ...prev.feed.links],
                    count: prev.feed.links.length + 1,
                    __typename: prev.feed.__typename
                }
            });
        }
    })

    subscribeToMore({
        document: NEW_VOTES_SUBSCRIPTION
    })

    const getLinksToRender: any | [] = (isNewPage: boolean, data: { feed: { links: any[] } }) => {
        if (isNewPage) {
            return data.feed.links;
        }
        const rankedLinks = data.feed.links.slice();
        rankedLinks.sort(
            (l1: { votes: string | any[] }, l2: { votes: string | any[] }) => l2.votes.length - l1.votes.length
        );
        return rankedLinks;
    };

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {data && (
                <>
                    {getLinksToRender(isNewPage, data).map(
                        (link: { id: React.Key | null | undefined }, index: number) => (
                            <Link
                                key={link.id}
                                link={link}
                                index={index + pageIndex}
                            />
                        )
                    )}
                    {isNewPage && (
                        <div className="flex ml4 mv3 gray">
                            <div
                                className="pointer mr2"
                                onClick={() => {
                                    if (page > 1) {
                                        navigate(`/new/${page - 1}`);
                                    }
                                }}
                            >
                                Previous
                            </div>
                            <div
                                className="pointer"
                                onClick={() => {
                                    if (
                                        page <=
                                        data.feed.count / LINKS_PER_PAGE
                                    ) {
                                        const nextPage = page + 1;
                                        navigate(`/new/${nextPage}`);
                                    }
                                }}
                            >
                                Next
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
export default LinkLists