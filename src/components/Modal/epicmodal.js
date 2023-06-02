import { Form, Modal } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import EpicForm from '../MyForm/epicForm'
import eventBus from '../../utils/event'
import axiosinstance from '../../axios/axios'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { get_project_async } from '../../redux/slice/project'


const Epicmodal = memo(({form}) => {
  const [Tittle, setTittle] = useState('Tittle')
  const [open, setopen] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  
  let onOk = async () => {
    let res = await form.validateFields()
    const epic_name = res.epic_name;
    axiosinstance.post(`/api/epic/${id}`, {
      epic_name
    })
    dispatch(get_project_async(id))

    setopen(false)

  }
  let onCancel = () => {
     setopen(false)
  }
  let openEpicModal = () => {


    setopen(true)

  }
  useEffect(() => {

    eventBus.on('epic', openEpicModal)
  }, [])
  return (
    <>
      <Modal
        title={Tittle}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
      >

        <div className='epic_form'>
          <EpicForm
            form={form}
          ></EpicForm>
        </div>
      </Modal>

    </>
  )
})

export default Epicmodal