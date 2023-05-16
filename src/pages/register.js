import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import LoginWrap from '@components/Login/LoginWrap';
import { Link, useNavigate } from "react-router-dom"
import axiosinstance from '../axios/axios';

import eventBus from '../utils/event';


function Register() {
   const Navigate= useNavigate()
    const [form] = Form.useForm();

    function register_click() {

        form.validateFields().then((values) => {
             
               axiosinstance.post('/api/register', values).then((res)=>{
                console.log(res.data);
                if(res.data.code===0){
                    Navigate('/login')
                    eventBus.emit('success_register')
                }
               })
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            });


 


    }

    return (
        <LoginWrap>
            <Form
                form={form}
                id='register_form'
            >
                <div className='login_box_header'>
                    <button className='switch'>请注册</button>
                </div>
                <p className='login_box_p'>Register</p>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type="text" id="username" placeholder={'用户名'} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    < Input type="password" id="password" placeholder={'密码'} />
                </Form.Item>
                <Button onClick={() => register_click()} className='login_button' type="primary"
                    size='large'
                >注册</Button>
                <Divider />
                <Link className='login_enroll' to="/login">已有账号？直接登录</Link>
            </Form>
        </LoginWrap>
    )
}

export default Register