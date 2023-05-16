import { createSlice } from "@reduxjs/toolkit";

const epic=createSlice({
    name:'epic',
    initialState:{
       
    },
    reducers:{
        
    }
})
export const select_epic_list = (state) => {
    return state.kanban.active_project.epic
}
export const {}=epic.actions
export default epic.reducer