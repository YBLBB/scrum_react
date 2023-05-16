import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { memo } from 'react'
import Useformdata from '../../../hook/get_formdata'
import { useDispatch } from 'react-redux'
import { getProjectListAsync, set_current_page, set_search_query } from '../../../redux/slice/project'


const Search = memo(() => {
    const [form] = useForm()
    const dispatch = useDispatch()
    let { usersResult, organizationResult } = Useformdata()

    let reset = () => {
        form.resetFields()
    }
    let search_click = async () => {

        let search_query = await form.validateFields()
        if (search_query) {
            dispatch(set_search_query(search_query))
            dispatch(set_current_page(1))
            dispatch(getProjectListAsync())
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
                    name="organization"
                    label='部门'
                >
                    <Select

                        style={{ width: 120 }}
                    >{
                            organizationResult
                        }

                    </Select>

                </Form.Item>
                <Form.Item
                    name="owner"
                    label='负责人'
                >
                    <Select

                        style={{ width: 120 }}

                    >
                        {usersResult}
                    </Select>

                </Form.Item>
                <Button onClick={reset} type="">重置</Button>
                <Button onClick={search_click} type="primary">查询</Button>


            </Form>
        </div>
    )
})

export default Search