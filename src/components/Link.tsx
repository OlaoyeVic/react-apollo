import React from 'react'

const Link: React.FC = ({ link }: any) => {
    // const { link } = props
    return (
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    )
}
export default Link