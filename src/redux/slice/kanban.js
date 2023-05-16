import { createSlice } from "@reduxjs/toolkit";

const kanban=createSlice({
    name:'kanbanSlice',
    initialState:{
       active_project:{}
    },
    reducers:{
        set_active_project:(store, actions)=>{
             store.active_project=actions.payload
        }
        
    }
})
export const active_project_selector = (state) => {

    return state.kanban.active_project
}
export const get_active_project_epic=(state)=>{
    return state.kanban.active_project.epic||[]
}
export const {set_active_project}=kanban.actions
export default kanban.reducer