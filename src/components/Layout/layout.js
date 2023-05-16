import React, { memo, useEffect } from 'react'
import Header from '../headers/Header'
import LeftMenu from '../../pages/LeftMenu'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = memo(() => {
  let location = useLocation()
  let is_project_page = location.pathname === '/project'


  return (
    <div className="layout_wrap">
      <div className='header_wrap'>
        <Header />

      </div>
      <div className="layout_wrap_project">
        {
          is_project_page ? null :
            <div className="project_side_menu_wrap">
              <LeftMenu />
            </div>
        }
        <div className="project_wrap">
          <Outlet></Outlet>

        </div>
      </div>
    </div>
  )
})

export default Layout