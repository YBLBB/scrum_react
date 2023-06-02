import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { memo } from 'react'
import Useformdata from '../../../../hook/get_formdata'
import axiosinstance from '../../../../axios/axios'
import { useParams } from 'react-router-dom'
import kanban from '../../../../redux/slice/kanban'
import { useDispatch } from 'react-redux'
import { set_kanban_data } from '../../../../redux/slice/drop'

const KanbanSearch = memo(() => { 
    const [form] = useForm()
    const { usersResult, taskResult, epicResult } = Useformdata()
    const { id } = useParams()
    const dispatch=useDispatch()
    let reset = () => {
        form.resetFields()
    }
    let search_click = async () => {
        let search_query = await form.validateFields()
        if (search_query) {
            let { name, owner, TaskType, epic } = search_query
            const res = await axiosinstance.get(`/api/project/${id}`);
            let kanban = res.data.data.kanban

            let newkanban  =await kanban.map((item) => {
                let task = item.task
                let filter_task = task.filter((taskitem) => {
                    let isName = true;
                    let isType = true;
                    let isOwner = true;
                    let isEpic = true;
                    if (name) {
                        if (taskitem.indexOf(name) < 0) {
                            isName = false
                        }
                    }
                    if (owner) {
                        if (taskitem.owner !== owner) {
                            isOwner = false
                        }
                    }
                    if (TaskType) {
                        if (taskitem.type !== TaskType) {
                            isType = false
                        }
                    }
                    if (epic) {
                        if (taskitem.epic !== epic) {
                            isEpic = false
                        }
                    }
                    return isName && isType && isOwner && isEpic
                })
       
                let filter_kanban = {
                    ...item,
                    task: filter_task
                }
                console.log(filter_kanban, '1111');
                return filter_kanban
            })
            console.log(newkanban);
            dispatch(set_kanban_data(newkanban))

        }


    }
    return (
        <div className='SearchWrapper'>
            <Form
                layout='inline'
                form={form}

            >
                <Form.Item
                    name="name"
                    style={{ width: 180 }}
                >
                    <Input type='text'
                        placeholder='任务名'
                    ></Input>
                </Form.Item>
                <Form.Item
                    name="owner"
                    label='负责人'
                >
                    <Select

                        style={{ width: 140 }}

                    >
                        {usersResult}
                    </Select>

                </Form.Item>
                <Form.Item
                    name="TaskType"
                    label='任务类型'
                >
                    <Select

                        style={{ width: 120 }}

                    >
                        {taskResult}

                    </Select>

                </Form.Item>
                <Form.Item
                    name="epic"
                    label='epic'
                >
                    <Select

                        style={{ width: 140 }}

                    >
                        {epicResult}
                    </Select>

                </Form.Item>
                <Button onClick={reset} type="">重置</Button>
                <Button onClick={search_click} type="primary">查询</Button>


            </Form>
        </div>
    )
})

export default KanbanSearch