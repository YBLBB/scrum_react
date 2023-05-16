import { Divider, List, Popover, Typography, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { users_selector } from '../../redux/slice/project'
import InfiniteScroll from 'react-infinite-scroll-component';

function UserPopover() {

    const users = useSelector(users_selector)

    let content = (
        <div className='project_create'>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>

            <div style={{
                height: 400,
                overflow: 'scroll'
            }}>
                <List>
                    {
                        users.map((item, key) => {
                            return (
                                <List.Item key={key} className="user_listItem">
                                    <p>{item.username}</p>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </div>


            {/* <Divider /> */}
        </div>
    )

    return (
        <Popover placement={'bottom'} content={content}>
            <div className='popoveritem' style={{ cursor: 'pointer', }}>组员</div>
        </Popover>
    )
}

export default UserPopover