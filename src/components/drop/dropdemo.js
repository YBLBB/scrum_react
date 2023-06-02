
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import React from 'react';
import eventBus from '../../utils/event';
import { kanban_selector } from '../../redux/slice/drop';
import { useSelector } from 'react-redux';



function DropCp(props) {
     

    let { kanban } = props
    let task = kanban.task


    let edit_task = (kanban_key, task_id) => {

        eventBus.emit('task_modal_open', { title: '编辑任务', kanban_key, task_id, type: 'edit' })
    }
    return (

        <Droppable droppableId={kanban.kanban_key} type="task">
            {(provided, snapshot) => (
                <div
                    className='task_drop_wrap'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {task.map((item, index) => {
                        return (
                            <Draggable
                                key={`${kanban.kanban_key}_${item.name}`}
                                draggableId={`${kanban.kanban_key}_${item.name}`}
                                index={index}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className='task_drag_wrap'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => {
                                                edit_task(kanban.kanban_key, item.task_id)
                                            }}

                                        >
                                            <div className='task_card'>
                                                <div className='task_card_top'>
                                                    <div className='task_head_picture' alt='' ></div>
                                                    <p className='task_head-p'>{item.name}</p>
                                                </div>
                                                <div className='task_card_bottom'>
                                                    <div className='task_owner'>{item.owner}</div>
                                                    <div className={classNames({
                                                        new_task_type: true,
                                                        red: item.type === 'bug',
                                                        blue: item.type === 'task'
                                                    })}>
                                                        <span className='task_type-span'>{item.type}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>


    )
}


const DropCpMemo = React.memo(DropCp)
export default DropCpMemo;