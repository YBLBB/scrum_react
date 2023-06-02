import React, { memo, useEffect, useRef } from 'react'
import { kanban_selector } from '../../redux/slice/drop'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import eventBus from '../../utils/event'
import { useReducer } from 'react';
const Demo = memo(() => {


    const initialState = { count: 0 ,type:false};

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 };
            case 'decrement':
                return { count: state.count - 1 };
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const kanbandata = useSelector(kanban_selector)

    const data = useRef(kanbandata)

    let btn1 = () => {
        console.log(kanbandata);
    }
    let btn = () => {
        // console.log(data);
        dispatch({type:'increment'})
        
    }
    useEffect(() => {
        // data.current = kanbandata
        // kanbandata,
        eventBus.on('demo', btn)
        // return ()=>{
        //     eventBus.off('demo', btn);
        // }
        // console.log(state);
    }, [state])
    return (
        <div>
            <Button onClick={btn1}>111</Button>
        </div>
    )
})

export default Demo