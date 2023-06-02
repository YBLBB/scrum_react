import React, { memo, useEffect, useReducer, useRef, useState } from 'react'
import { Button, Form, Modal } from 'antd';
import { Input, Select } from 'antd';

import eventBus from '../../utils/event';
import { add_task, kanban_selector, update_kanban_async, update_task } from '../../redux/slice/drop';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Useformdata from '../../hook/get_formdata';

const Taskmodal = memo(() => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [title, settitle] = useState('TITLE')
    const [form] = Form.useForm();
    const kanbandata = useSelector(kanban_selector)
    const [search_params] = useSearchParams()
    const epic_type = search_params.get('epic')
     
    let { usersResult, taskResult, epicResult } = Useformdata(epic_type)
    let dispatch = useDispatch()
    function reducer(state, action) {
        switch (action.type) {
            case 'kanban_key':
                return { kanban_key: action.payload };
            case 'task_id':
                return { task_id: action.payload };
            case 'type':
                return { type: action.payload };
            case 'modal':
                return { modal: action.payload }
            default:
                throw new Error();
        }
    }

    const [state, modaldispatch] = useReducer(reducer, { modal: { kanban_key: '', task_id: '', type: 'create' } });
    const stateref = useRef(state)
   
    useEffect(() => {


        stateref.current = state

    }, [state])
    useEffect(() => {
        eventBus.on('task_modal_open', showModal)
        return () => {
            eventBus.off('task_modal_open', showModal)
        }
    }, [kanbandata])

    const showModal = ({ title, kanban_key, task_id, type, kanban_data }) => {

        setOpen(true);
        settitle(title)

        modaldispatch({ type: "modal", payload: { title, kanban_key, task_id, type } })

        if (type === 'create') {


            form.resetFields()
        }
        if (type === 'edit') {




            const kanban = kanbandata.find((item) => {
                return item.kanban_key === kanban_key
            })


            const task_data = kanban.task;

            const task = task_data.find((item) => {
                return item.task_id === task_id
            })

            // 设置表单
            form.setFieldsValue(task)

        }
    };


    function onOk() {

        form.validateFields().then((res) => {




            // 创建

            if (state.modal.type === 'create') {
                res.task_id = Math.random().toString(32).substring(2)



                dispatch(add_task({
                    kanban_key: state.modal.kanban_key,
                    task: res

                }))


                // 更新kanban
                dispatch(update_kanban_async())

                setOpen(false);
                // setConfirmLoading(false);


            }

            // 编辑
            if (state.modal.type === 'edit') {

                dispatch(update_task({
                    task: res,
                    task_id: state.modal.task_id,
                    kanban_key: state.modal.kanban_key
                }))

                setOpen(false);
                setConfirmLoading(false);



                // 更新kanban
                dispatch(update_kanban_async())
            }



        }).catch((error) => {

        })


    }

    const handleCancel = () => {

        setOpen(false);
    };


    return (
        <>

            <Modal
                title={title}
                open={open}
                onOk={onOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >


                <div className='task_modal'>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        name="basic"
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="任务名称"
                            name="name"
                            rules={[{ required: true, message: '请输入任务名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="任务类型"
                            name="type"
                            rules={[{ required: true, message: '请选择任务类型' }]}
                        >
                            <Select

                            >

                                {taskResult}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="负责人"
                            name="owner"
                            rules={[{ required: true, message: '请选择负责人' }]}
                        >
                            <Select

                            >

                                {usersResult}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="epic"
                            name="epic"
                        // style={{ width: 200 }}
                        >
                            <Select

                            >

                                {epicResult}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    )
})

export default Taskmodal




