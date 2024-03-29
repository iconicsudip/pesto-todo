import { Spin } from 'antd'
import React from 'react'

type Props = {
    loadingDesc?: string
}

export default function Loader({ loadingDesc }: Props) {
    return (
        <Spin
            size="large"
            tip={loadingDesc ?? 'Loading...'}
        />
    )
}
