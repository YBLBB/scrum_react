import React, { memo } from 'react'
import { Form, Input, Select } from 'antd';
import Useformdata from '../../hook/get_formdata';
const ProjectForm = memo(({form}) => {
    let { usersResult, organizationResult } = Useformdata()
    return (
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
    );
})

export default ProjectForm