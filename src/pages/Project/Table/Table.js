import React, { memo } from 'react'
import { Space, Table, Button, Pagination } from 'antd'
import { shallowEqual, useSelector } from 'react-redux';
import { change_list, getProjectListAsync, project_list_data, project_selector, set_current_page, set_projectmodal } from '../../../redux/slice/project';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import axiosinstance from '../../../axios/axios';
const ProjectTable = memo(() => {
    const dispatch = useDispatch()
    const list = useSelector(project_selector, shallowEqual)
    let data = []
    list.map((item, index) => {
        data[index] = { ...item }
    })
    data.map((item, index) => {

        Object.defineProperty(item, 'key', {
            value: `${index}_${Math.random().toString(36)}`,
            writable: true,
            enumerable: true,
            configurable: true
        });
        return item

    })
    const projectlistdata = useSelector(project_list_data, shallowEqual)


    async function hand_collect_click(record) {


        const data = {
            ...record,
            collect: !record.collect
        }


        dispatch(change_list({
            _id: record._id,
            data
        }))
        // 跟服务器同步
        axiosinstance.put(`/api/projects/${record._id}`, {
            collect: data.collect
        })
    }
    function edit_click(id) {

        dispatch(set_projectmodal({
            show: true,
            type: 'edit',
            id
        }))
    }
    async function del_click(id) {
        await axiosinstance.delete(`/api/projects/${id}`);
        dispatch(getProjectListAsync())
    }
    const columns = [
        {
            title: '收藏',
            dataIndex: 'collect',
            key: 'collect',
            render: (text, record) => {
                return (
                    <div onClick={() => {
                        hand_collect_click(record)
                    }} className='iconfont icon-shoucang shoucang-item' style={{ color: text ? '#dfd50c' : '' }}></div>
                )
            },
            width: '10%'
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => {
                // console.log(text, data)

                return <NavLink to={`/project/${data._id}/kanban`}>{text}</NavLink>
            },
            sorter: (a, b) => a.title - b.title,
            width: '30%',
        },
        {
            title: '部门',
            dataIndex: 'organization',
            key: 'organization',
            width: '15%'
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            key: 'owner',
            render: text => <div>{text}</div>,
            width: '15%'
        },
        {
            title: '创建时间',
            key: 'created',
            dataIndex: 'created',
            render: (_, record) => (
                <Space size="middle">
                    <div>{dayjs(_).format('DD/MM/YYYY')}</div>
                </Space>

            ),
        },
        {
            title: '操作',
            key: 'handle',
            dataIndex: 'handle',
            render: (_, record) => (
                <div id="btns">
                    <Button type='primary' onClick={() => {
                        edit_click(record._id)
                    }}>编辑</Button>
                    <Button type="primary" danger onClick={() => {
                        del_click(record._id)
                    }}>删除</Button>
                </div>



            ),
        },
    ];

    let onChange = (page) => {

        dispatch(set_current_page(page))
        dispatch(getProjectListAsync())
    }
    return (
        <div id='Project_Table'>
            <Table dataSource={data} columns={columns}
                pagination={
                    false
                }
            />
            <Pagination
                onChange={onChange}
                total={projectlistdata.total}
                current={projectlistdata.current_page}
            />

        </div>
    )
})

export default ProjectTable