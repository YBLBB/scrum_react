import { Button, Divider, Form, Input, Menu } from 'antd';

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginWrap from '../components/Login/LoginWrap';
import { useForm } from 'antd/es/form/Form';
// import useMenusStates from '../hook/Menschangestatus';
import axiosinstance from '../axios/axios';



function LoginForm() {

  return (
    <>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}

      >

        <Input type="text"
          id="username"
          placeholder={'用户名'} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}

      >
        <Input type="password" id="password" placeholder={'密码'} />
      </Form.Item>


    </>
  )
}
function Login() {

  const [form] = useForm()
  const [active, set_active] = useState('username')
  const navigate = useNavigate()
  async function login_click() {

    form.validateFields().then((res) => {

      axiosinstance.post('/api/login', res).then((res) => {
        if (res.data.code === 0) {
          navigate('/project')
        }
      })

    }).catch((error) => {
      console.log(error);

    })





  }

  const items = [{
    label: '账号登录',
    key: 'username',
  }, {
    label: '手机验证',
    key: 'identifingcode',
  }]

  function loginToggle(e) {
    console.log(e);
    set_active(e.key)
  }



  return (

    <LoginWrap >

      <Form
        form={form}
        id='loginForm'
      >
        <Menu

          onClick={loginToggle}
          mode={'vertical'}
          items={items}
          selectedKeys={active}
        >
        </Menu>
        <p className='login_box_p'>Login</p>
        {/* {flag === 'username' ? <LoginForm /> : <LoginPhone />} */}
        <LoginForm></LoginForm>

        <Button onClick={login_click}
          className='login_button'
          type="primary"
          ghost={true}
          size={'large'}
        >登录</Button>

        <Divider />
        <Link className='login_enroll' to="/register">没有账号？注册新账号</Link>
      </Form>
    </LoginWrap>
  )
}

export default Login