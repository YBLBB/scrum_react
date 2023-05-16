import React, { memo, useEffect } from 'react'

import eventBus from '../../../utils/event'
import Epicmodal from '../../../components/Modal/epicmodal'
import { useDispatch } from 'react-redux'
import { get_project_async } from '../../../redux/slice/project'
import { useParams } from 'react-router-dom'
import Epiclist from './Epiclist/Epiclist'
import { Form } from 'antd'

const Epic = memo(() => {
  const [form]=Form.useForm()
  const dispatch = useDispatch()
  const { id } = useParams()
  let handle_click = () => {
    form.resetFields()
    eventBus.emit('epic')
  }
  useEffect(() => {
    dispatch(get_project_async(id))
  }, [])
  return (
    <div className='epic_body'>
      <div className='epic_title'>
        <button onClick={handle_click} className='epic_title_button'>创建任务组</button>


      </div>
      <Epiclist></Epiclist>

      <Epicmodal form={form}></Epicmodal>
    </div>
  )
})

export default Epic