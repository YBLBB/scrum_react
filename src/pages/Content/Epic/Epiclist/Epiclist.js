import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { select_epic_list } from '../../../../redux/slice/epic'
import { List } from 'antd'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'



const Epiclist = memo(() => {
    const epic_list = useSelector(select_epic_list)
    const {id}=useParams()
    const navigate=useNavigate()
    let handle_click=(epic)=>{
     
        navigate({
            
            pathname: `/project/${id}/kanban`,
            search: createSearchParams({
                epic
            }).toString()
        })
    }
    let DeleteAlert=()=>{
            
    }
    return (

        <List
            itemLayout="horizontal"
            dataSource={epic_list}
            renderItem={(item) => (
                <List.Item style={{ height: '135px' }}>
                    <List.Item.Meta
                        title={
                            <div className='list_item_title'>
                                <div onClick={() => {
                                    handle_click(item)
                                }} style={{ fontSize: '18px', color: 'black' }}>{item}</div>
                                <DeleteAlert name={item}></DeleteAlert>
                            </div>

                        }
                        description={
                            <div style={{ fontSize: '16px' }}>
                                <div>开始时间：暂无</div>
                                <div>结束时间: 暂无</div>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
})

export default Epiclist