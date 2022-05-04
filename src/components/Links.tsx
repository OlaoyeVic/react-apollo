import { link } from 'fs'
import React from 'react'

const Link: React.FC = ({ link }) => {
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