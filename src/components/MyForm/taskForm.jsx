import React, { memo, useEffect } from 'react'

import { Form, Input, Select } from 'antd';


import Useformdata from '../../hook/get_formdata';
import { useSearchParams } from 'react-router-dom';

const MyForm = memo(({ form }) => {
    const [search_params]=useSearchParams()
    const  epic_params=search_params.get('epic')
    let { usersResult, taskResult, epicResult } = Useformdata()
    useEffect(() => {
        
    }, [])
    return (
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
    );
})

export default MyForm



