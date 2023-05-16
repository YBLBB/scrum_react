import { Popover, List } from 'antd'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { project_selector } from '../../redux/slice/project'
import { Link } from 'react-router-dom'

const PopoverItem = memo(({ name }) => {
    const projectlist = useSelector(project_selector)

    let list = projectlist.filter((item) => {
        return item.collect === true
    })


    const content = <div className='project_create'>
        <List>
            {
                list.map((item) => {
                    return (
                        <List.Item key={item._id} className="project_listItem">
                            
                            <Link to={`/project/${item._id}/kanban`}>{item.name}</Link>
                        </List.Item>
                    )
                })
            }

        </List>
    </div>
    return (
        <div>


            <Popover content={content} placement={'bottom'}>
                <div className='popoveritem'>
                    {name}
                </div>
            </Popover>
        </div>
    )
})

export default PopoverItem