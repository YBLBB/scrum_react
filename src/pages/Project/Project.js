import React, { memo, useEffect } from 'react'
import Search from './Search/Search'
import ProjectTable from './Table/Table'


import { useDispatch } from 'react-redux'
import {  getProjectListAsync, set_projectmodal} from '../../redux/slice/project'
import Projectmodal from '../../components/Modal/projectmodal'



const Project = memo(() => {
 const dispatch= useDispatch()
  let create_project_click = () => {
      dispatch(set_projectmodal({
        show:true,
        type:'create'
      }))
  }
  // useEffect(() => {
  //   //拉取projectlist
  //   dispatch(getProjectListAsync())
  


  // }, [])

  return (
    <div className='project_body_wrap'>
      <div className='project_title_wrap'>
        <span className='project_list'>项目列表</span>
        <button onClick={create_project_click}>创建项目</button>
      </div>
      <div className='project_search_wrap'>
        <Search></Search>
      </div>
      <div className='project_table_wrap'>
        <ProjectTable></ProjectTable>
      </div>
       <Projectmodal></Projectmodal>
    </div>
  )
})

export default Project