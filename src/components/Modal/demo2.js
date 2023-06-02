import { Button } from 'antd'
import React, { memo } from 'react'
import eventBus from '../../utils/event'

const Demo2 = memo(() => {
    let btn = () => {

        eventBus.emit('demo')
    }
    return (

        <div>
            <Button onClick={btn}></Button>
        </div>
    )
})

export default Demo2