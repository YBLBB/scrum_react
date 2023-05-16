import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstance from "../../axios/axios";
import { set_kanban_data } from "./drop";
import { set_active_project } from "./kanban";

const project = createSlice({
    name: 'project',
    initialState: {
        list: [],
        current_page: 1,
        total: 0,
        isLoading: false,
        task_type: [],
        users: [],
        organization: [],
        projectmodal: {
            show: false,
            type: 'create',
            id: ''
        },
        search_query: {

        }
    },
    reducers: {
        set_projectmodal: (state, action) => {
            state.projectmodal = {
                ...state.projectmodal,
                ...action.payload
            }
        },
        set_current_page: (state, action) => {
            state.current_page = action.payload
        },
        set_search_query: (state, action) => {
            state.search_query = action.payload
        },
         change_list: (state, action) => {
            const { _id, data } = action.payload;
            const index = state.list.findIndex((item) => {
                // debugger
                // console.log(item)
                return item._id === _id
            })
            // debugger
            state.list[index] = data;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(getProjectListAsync.pending, (state, res) => {
                state.isLoading = true
            })
            .addCase(getProjectListAsync.fulfilled, (state, res) => {
                const data = res.payload.data.data
                data.forEach(element => {
                    if (typeof element.collect === 'undefined') {
                        element.collect = false
                    }
                });
                state.total = res.payload.data.total
                state.list = data
                state.isLoading = false
            })
            .addCase(getUsersAsync.fulfilled, (state, res) => {

                state.users = res.payload.data
            })
            .addCase(getTaskAsync.fulfilled, (state, res) => {

                state.task_type = res.payload.data
            })
            .addCase(getOrganizationAsync.fulfilled, (state, res) => {

                state.organization = res.payload.data
            })


    }


})

export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async (data, store) => {
        const state = store.getState()
        const skip = (state.project.current_page - 1) * 10;
        const search_query = state.project.search_query

        const response = await axiosinstance.post('/api/projects/search', {
            ...search_query,
            skip
        });

        return response.data;
    }
)
export const get_project_async = createAsyncThunk(
    'project/get_project_byid',
    async (action, store) => {

        const response = await axiosinstance.get(`/api/project/${action}`)

        let kanban = response.data.data.kanban
        //设置看板data

        store.dispatch(set_kanban_data(kanban))
        //设置kanban当前的project信息(主要要projectid)

        store.dispatch(set_active_project(response.data.data))
        return kanban

    }
)
// export const getProjectListAsync = createAsyncThunk(
//     'project/get_project_list',
//     async (data, store) => {

//         const response = await axiosinstance.get('/api/projects');

//         return response.data;
//     }
// )
export const getTaskAsync = createAsyncThunk(
    'project/get_task',
    async () => {
        const response = await axiosinstance.get('/api/task/type_list');

        return response.data;
    }
)
export const getOrganizationAsync = createAsyncThunk(
    'project/get_Organization',
    async () => {
        const response = await axiosinstance.get('/api/organization');

        return response.data;
    }
)

export const getUsersAsync = createAsyncThunk(
    'project/get_users',
    async () => {
        const response = await axiosinstance.get('/api/users');

        return response.data;
    }
)



export const project_selector = (state) => {

    return state.project?.list
}
export const users_selector = (state) => {

    return state.project?.users
}
export const task_type_selector = (state) => {

    return state.project?.task_type
}
export const organization_selector = (state) => {

    return state.project.organization
}
export const project_modal_selector = (state) => {

    return state.project.projectmodal
}
export const project_list_data = (state) => {
    return {
        total: state.project.total,
        current_page: state.project.current_page,
        list: state.project.list
    }
}
export const { set_projectmodal, set_current_page, set_search_query,change_list } = project.actions
export default project.reducer