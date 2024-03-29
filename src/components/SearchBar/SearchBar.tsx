import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import useDebounce from '../../utils/useDebounce'

type Props = {
    placeholder?: string
    setSearchText: React.Dispatch<React.SetStateAction<string>>
}
export default function SearchBar({placeholder,setSearchText}:Props) {
    const [search, setSearch] = useState('')
    const debounceText = useDebounce(search);

    useEffect(() => {
        setSearchText(debounceText)
    }, [debounceText])
    return (
        <Input
            placeholder={placeholder ?? 'Search...'}
            prefix={<TbSearch/>}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}
