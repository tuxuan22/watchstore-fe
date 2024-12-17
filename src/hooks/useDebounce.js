import { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debouncedValue, setDebouncedValue] = useState('value')
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeoutId)
        }
    }, [value, ms])
    return debouncedValue

}

export default useDebounce
