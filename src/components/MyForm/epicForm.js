import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { memo } from 'react'

const EpicForm = memo(({form}) => {

    return (
     
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="basic"
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Epic名称"
                name="epic_name"
                rules={[{ required: true, message: '请输入Epic名称' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
})

export default EpicForm