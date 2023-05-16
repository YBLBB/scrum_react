import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../axios/axios";

function reorderList(arr, start, end) {

    let [removeitem] = arr.splice(start, 1)

    arr.splice(end, 0, removeitem)

}
export const update_kanban_async = createAsyncThunk(
    'kanban/update',
    async (actions, state) => {
    
        let newkanban_data=state.getState().drop.kanban_data
        let id=state.getState().kanban.active_project._id
        axiosinstance.put(`/api/projects/${id}/kanban`,newkanban_data)
    }

)

const dropSlice = createSlice({
    name: 'dropSlice',
    initialState: {
        kanban_data: []
    },
    reducers: {
        set_kanban_data: (store, actions) => {
    
            store.kanban_data=actions.payload
            
        },
        kanban_order: (store, actions) => {
            reorderList(store.kanban_data, actions.payload.start, actions.payload.end)
        },
        task_same_order: (store, actions) => {
            let kanban = store.kanban_data.find((item) => {
                return item.kanban_key = actions.payload.kanban_key
            })
            reorderList(kanban.task, actions.payload.start, actions.payload.end)

        },
        task_diff_order: (store, actions) => {
            let startkanban = store.kanban_data.find((item) => {
                return item.kanban_key === actions.payload.startkanban_key
            })

            let [deltask] = startkanban.task.splice(actions.payload.start, 1)

            let endkanban = store.kanban_data.find((item) => {
                return item.kanban_key === actions.payload.endkanban_key
            })
            endkanban.task.splice(actions.payload.end, 0, deltask)
        },
        add_kanban: (store, actions) => {
            store.kanban_data.push({
                kanban_key: actions.payload.kanban_key,
                task: []
            })
        },
        
        add_task: (state, action) => {
       
        
            const kanban_key = action.payload.kanban_key;
            const task_data = action.payload.task;

            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === kanban_key
            });

            kanban.task.push(task_data)
        }, 
        update_task: (state, action) => {
          
            const kanban_key = action.payload.kanban_key;
            let task_data = action.payload.task;
            const task_id = action.payload.task_id;
            
            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === kanban_key
            });

            const index = kanban.task.findIndex((item) => {
                return item.task_id === task_id
            })
            
            // 补充id
            task_data.task_id = kanban.task.task_id

            kanban.task[index] = task_data
        }
    }
}

)
export const kanban_selector = (state) => {
    return state.drop.kanban_data
}

export const { kanban_order,
    task_same_order,
    task_diff_order,
    add_task, add_kanban,
    set_kanban_data,
    update_task
} = dropSlice.actions
export default dropSlice.reducer