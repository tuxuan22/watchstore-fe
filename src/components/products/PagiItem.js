import React from 'react'
import clsx from 'clsx'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import withBaseComponent from 'hocs/withBaseComponent'

const PagiItem = ({ children, location, navigate }) => {

    const [params] = useSearchParams()

    const handlePaginaiton = () => {

        const queries = Object.fromEntries([...params])

        if (Number(children)) queries.page = children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        })

    }
    return (
        <button
            className={clsx('w-10 h-10 mx-1 flex items-center justify-center border rounded hover:text-white hover:bg-gray-500',
                +params.get('page') === +children && 'text-white bg-gray-500',
                !+params.get('page') && children === 1 && 'text-white bg-gray-500'
            )}
            onClick={handlePaginaiton}
            disabled={!Number(children)}
            type='button'
        >
            {children}
        </button>
    )
}

export default withBaseComponent(PagiItem)
