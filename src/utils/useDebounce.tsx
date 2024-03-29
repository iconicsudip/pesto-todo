import React, { useEffect, useState } from 'react'

interface Props {
    value: string
    timeout?: number
}

export default function useDebounce(value: string, timeout: number = 1000) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, timeout);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}