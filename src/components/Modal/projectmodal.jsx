import React, { memo, useEffect, useState } from 'react'
import ProjectForm from '../MyForm/projectForm'
import { Form, Modal } from 'antd';
import { shallowEqual, useDispatch } from 'react-redux';
import { getProjectListAsync, project_modal_selector, project_selector, set_projectmodal } from '../../redux/slice/project';
import { useSelector } from 'react-redux';
import axiosinstance from '../../axios/axios';
import { Input, Select } from 'antd';
import Useformdata from '../../hook/get_formdata'

const Projectmodal = memo(() => {
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const project_list = useSelector(project_selector)
    let { type, show, id } = useSelector(project_modal_selector, shallowEqual)
    let onOk = async () => {

        const form_data = await form.validateFields()
        if (form_data) {

            if (type === 'create') {
                const res = await axiosinstance.post('/api/projects', form_data)
            }

            if (type === 'edit') {
                const res = await axiosinstance.put(`/api/projects/${id}`, form_data)
            }
        }

        dispatch(set_projectmodal({
            show: false
        }))

        dispatch(getProjectListAsync())
    }
    let handleCancel = () => {

        dispatch(set_projectmodal({
            show: false
        }))
    }




    useEffect(() => {

        if (type === 'edit') {
            const data = project_list.find((item) => {
                return item._id === id
            })
    
            const form_data = {
                name: data.name,
                organization: data.organization,
                owner: data.owner
            }

           console.log(form_data);

            form.setFieldsValue(form_data)
        }
        if (type === 'create') {
            form.resetFields();
        }

    }, [show])
    let { usersResult, organizationResult } = Useformdata()
    return (
        <>

            <Modal
                title={type == 'create' ? '创建项目' : '编辑项目'}
                open={show}
                onOk={onOk}
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
                            label="项目名称"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="所在部门"
                            name="organization"
                            rules={[{ required: true }]}
                        >
                            <Select

                            >

                                {organizationResult}
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

                    </Form>
                </div>

            </Modal>
        </>
    )
})

export default Projectmodal