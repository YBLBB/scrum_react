import React, { memo } from 'react'
import logo from '@static/logo.png'

import PopoverItem from './Popover'
import { useNavigate } from 'react-router-dom'
import axiosinstance from '../../axios/axios'
import UserPopover from './userPopober'
const Header = memo(() => {
  const navigate = useNavigate()
 async function logout() {
    await axiosinstance.post('http://localhost:8000/api/logout')
    navigate('/login')
  }
  function home_click() {
    navigate('/project')
  }
  return (
    <div className='header_wrap_body'>
      <button className='header_button' onClick={home_click}>
        <img className="header_logo" src={logo} onClick={home_click}></img>
        <h2 >九剑scrum项目管理系统</h2>
      </button>
      <PopoverItem name="收藏项目"></PopoverItem>
      <UserPopover></UserPopover>
      <div onClick={logout} className="header_login_out_btn">退出登录</div>
    </div>
  )
})

export default Header