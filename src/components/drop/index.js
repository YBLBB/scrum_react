import { Button, Input } from 'antd';
import React, { memo, useEffect, useRef } from 'react'

import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import DropCpMemo from './dropdemo';
import './css/drop.css'
import { useSelector } from 'react-redux';
import { add_task, add_kanban, kanban_order, kanban_selector, task_diff_order, task_same_order, update_kanban_async } from '../../redux/slice/drop';
import { useDispatch } from 'react-redux';
import eventBus from '../../utils/event';

const Drop = memo((props) => {
    
    let kanban = useSelector(kanban_selector)

    // let kanban = []
    // if (oldkanban.length !== 0) {
    //     oldkanban.forEach((item) => {
    //         let newItem = { ...item }

    //         Object.defineProperty(newItem, 'new_kanban_key', {
    //             value: item.kanban_key + `${Math.random().toString()}`,
    //             writable: true,
    //             enumerable: true,
    //             configurable: true
    //         });
    //         kanban.push(newItem)

    //     })
    // }


    const dispatch = useDispatch()
    let newkanbanvalue = useRef()
    function onDragEnd(e) {


        if (!e.destination) {
            return
        }
        if (e.type === 'kanban') {
            dispatch(kanban_order({
                start: e.source.index,
                end: e.destination.index
            }))

            dispatch(update_kanban_async())
        }
        if (e.type === 'task') {
            //相同看板task

            if (e.source.droppableId === e.destination.droppableId) {

                dispatch(task_same_order({
                    kanban_key: e.source.droppableId,
                    start: e.source.index,
                    end: e.destination.index
                }))
                dispatch(update_kanban_async())
            }
            else {
                dispatch(task_diff_order({
                    startkanban_key: e.source.droppableId,
                    endkanban_key: e.destination.droppableId,
                    start: e.source.index,
                    end: e.destination.index
                }))
                dispatch(update_kanban_async())
            }

        }
    }
    let add_task = (kanban_key) => {
     
        eventBus.emit('task_modal_open', { title: '创建任务', kanban_key, task_id: '', type: 'create' })


    }

    function input_keydown(e) {


        let kanban_key = e.target.value


        if (!kanban_key.toString().trim()) {

            return
        }


        if (kanban.length !== 0 && kanban.find((item) => item.kanban_key == e.target.value)) {
            eventBus.emit('global_error_tips', '请勿重复添加重复看板')
            return
        }

        dispatch(add_kanban({
            kanban_key: kanban_key.toString().trim()
        }))
        dispatch(update_kanban_async())



        e.target.value = ''
    }


    useEffect(() => {

        newkanbanvalue.current.input.value = ''

    })

    return (
        <DragDropContext
            onDragEnd={onDragEnd}

            className="drag_container"
        >
            <Droppable direction="horizontal"
                droppableId="droppable-kanban"
                type="kanban"
            >
                {(provided, snapshot) => {
                    return (
                        <div
                            className='kanban_drop_wrap'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {kanban.map((item, index) => {
                                return (
                                    <Draggable key={item.kanban_key}
                                        draggableId={item.kanban_key}
                                        index={index}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    className='kanban_drag_wrap'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}

                                                >
                                                    <h1>{item.kanban_key}</h1>
                                                    {/* <TaskDrop task={item} /> */}
                                                    <DropCpMemo kanban={item}></DropCpMemo>
                                                    <Button className='new_task_btn' type="primary" ghost
                                                        onClick={() => add_task(item.kanban_key)}
                                                    >

                                                        新建task
                                                    </Button>
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <div className='kanban_drag_wrap'>
                <Input onPressEnter={input_keydown} placeholder="新建看板名称" ref={newkanbanvalue} />

            </div>
        </DragDropContext>
    )
})

export default Drop



