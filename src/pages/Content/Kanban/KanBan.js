
import React, { memo, useEffect } from 'react'


import Drop from '../../../components/drop/index';

import KanbanSearch from './KanbanSearch/KanbanSearch';
import { useParams, useSearchParams } from 'react-router-dom';
import { shallowEqual, useDispatch } from 'react-redux';
import { get_project_async } from '../../../redux/slice/project';
import { useSelector } from 'react-redux';
import { active_project_selector } from '../../../redux/slice/kanban';
import Normal_modal from '../../../components/Modal/task_modal';
import { set_kanban_data } from '../../../redux/slice/drop';
// import Demo from '../../../components/Modal/demo';
// import Demo2 from '../../../components/Modal/demo2';



const KanBan = memo(() => {
  const { id } = useParams()
  let project = useSelector(active_project_selector, shallowEqual)
  const [search_params]=useSearchParams()
  const dispatch = useDispatch()
  const search_epic = search_params.get('epic');
  useEffect(() => {

    dispatch(get_project_async(id)).then((res) => {
      const kanban_arr = res.payload;

      if(search_params) {
        
          const form_data = {
              epic: search_epic
          }

          let fliter_drop_data = kanban_arr.map((item) => {
              let task_list = item.task;
              task_list = task_list.filter((task) => {
                  let isName = true;
                  let isType = true;
                  let isOwner = true;
                  let isEpic = true;
  
                  if (form_data.name) {
                      if (task.name.indexOf(form_data.name) < 0) {
                          isName = false
                      }
                  }
                  if (form_data.owner) {
                      if (task.owner !== form_data.owner) {
                          isOwner = false
                      }
                  }
                  if (form_data.type) {
                      if (task.type !== form_data.type) {
                          isType = false
                      }
                  }
  
                  if (form_data.epic) {
                      if (task.epic !== form_data.epic) {
                          isEpic = false
                      }
                  }
  
                  return isName && isType && isOwner && isEpic
              })
              return {
                  ...item,
                  task: task_list
              }
          })
          dispatch(set_kanban_data(fliter_drop_data))
          
      }
  })


  }, [id])

  return (

    <div className='kanban_body'>
      <div className='kanban_title'>
        <h1 className='kanban_title_content'>{project?.name}-研发看板</h1>
      </div>
      <div className="kanban_serch_wrap">
        <KanbanSearch></KanbanSearch>
      </div>
      <div className="drop_wrap">
        <Drop ></Drop>

      </div>
      <div >
        <Normal_modal></Normal_modal>
      </div>
     {/* <div>
      <Demo></Demo>
      <Demo2/>
     </div> */}


    </div>

  )
})

export default KanBan