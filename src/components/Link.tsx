import React from 'react'

const Link: React.FC = ({ linkk }: any) => {
    // const { link } = props
    return (
        <div>
            <div>
                {linkk.description} ({linkk.url})
            </div>
        </div>
    )
}
export default Link