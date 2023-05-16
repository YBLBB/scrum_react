import { Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { organization_selector, task_type_selector, users_selector } from '../redux/slice/project';
import { get_active_project_epic } from '../redux/slice/kanban';
function render_task_options(arr) {
    return arr.map((item) => {
        return <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>
    })
}
function render_users_options(arr) {
    return arr.map((item) => {
        return <Select.Option key={item._id} value={item.username}>{item.username}</Select.Option>
    })
}
function render_organization_options(arr) {
    return arr.map((item) => {
        return <Select.Option key={item._id} value={item.name}>{item.name}</Select.Option>
    })
}
function render_epic_options(arr, epic_type) {
    if (epic_type) {
        return arr.filter(item => item == epic_type).map((item) => {
            return <Select.Option key={item} value={item}>{item}</Select.Option>
        })
    }
    else {
        return arr.map((item) => {
            return <Select.Option key={item} value={item}>{item}</Select.Option>
        })
    }
}

function Useformdata(epic_type) {
    let users = useSelector(users_selector, shallowEqual)
    let epic = useSelector(get_active_project_epic, shallowEqual)
    let task = useSelector(task_type_selector, shallowEqual)

    let organization = useSelector(organization_selector, shallowEqual)
    let usersResult = render_users_options(users)
    let taskResult = render_task_options(task)
    let organizationResult = render_organization_options(organization)
    let epicResult = render_epic_options(epic, epic_type)
    return { usersResult, taskResult, organizationResult, epicResult }
}
export default Useformdata