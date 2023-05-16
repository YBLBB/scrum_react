import { Menu, Switch } from 'antd'
import React, { memo, useEffect, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'


const LeftMenu = memo(() => {

    const navigate = useNavigate()
    const params = useParams()
    const items = [{
        label: '看板',
        key: 'kanban',
    }, {
        label: '任务组',
        key: 'epic',
    }]
    const location = useLocation()
    const [active, changemenu] = useState('kanban')
    const [Style, setStyle] = useState(false)

    useEffect(() => {
    
        changemenu(location.pathname.split('/')[3])

    }, [location])
    let changeStyle = () => {
        setStyle(!Style)
    }
    //Style?'vertical':'inline'
    function handlemenuchange(e) {

        // changemenu(e.key)

        navigate(`/project/${params.id}/${e.key}`)
    }

    return (
        <div className='left_menu'>
            <Menu
                style={{ height: '100%' }}
                theme={Style ? 'dark' : 'light'}
                onClick={handlemenuchange}
                mode={'inline'}
                items={items}
                selectedKeys={active}
            >

            </Menu>

            <Switch onChange={changeStyle}></Switch>

        </div>
    )
})



export default LeftMenu

