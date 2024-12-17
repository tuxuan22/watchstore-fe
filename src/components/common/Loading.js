import React, { memo } from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div>
            <HashLoader color='#d63838' />
        </div>
    )
}

export default memo(Loading)
