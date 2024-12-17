import React from 'react'
import usePagination from 'hooks/usePagination'
import { PagiItem } from 'components'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams()

    const page = +params.get('page') || 1

    const pagination = usePagination(totalCount, page)
    return (
        <div className='flex items-center'>
            {pagination?.map(el => (
                <PagiItem key={el}>
                    {el}
                </PagiItem>
            ))}
        </div>
    )
}

export default Pagination
