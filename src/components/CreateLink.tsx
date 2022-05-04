import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const CREATE_LINK_MUTATION = gql`
    mutation postMutation(
        $description: String!
        $url: String!
    ) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`

const CreateLink: React.FC = () => {
    const navigate = useNavigate()

    const [formState, setFormState] = React.useState({
        description: '',
        url: ''
    })

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url
        },
        onCompleted: () => navigate('/')
    })

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                createLink()
            }}
            >
                <div className='flex flex-column mt3'>
                    <input
                        className='mb2'
                        type="text"
                        placeholder="A description for the link"
                        value={formState.description}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                description: e.target.value
                            })
                        }
                    />
                    <input
                        className="mb2"
                        value={formState.url}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                url: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateLink