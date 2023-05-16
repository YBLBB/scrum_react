import { configureStore } from "@reduxjs/toolkit";
import dropSlice from './slice/drop'
import project from "./slice/project";
import kanban from "./slice/kanban";
import epic from "./slice/epic";



const store=configureStore({
    reducer:{
        drop:dropSlice,
        project,
        kanban,
        epic
    }
})
export default store