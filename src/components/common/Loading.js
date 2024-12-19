import React, { memo } from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Loading = () => {
    return (
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#ff0000"
            secondaryColor="#ff0000"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default memo(Loading)
