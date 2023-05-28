
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Layout from './components/Layout/layout';
import Project from './pages/Project/Project';
import KanBan from './pages/Content/Kanban/KanBan';
import Epic from './pages/Content/Epic/Epic';
import { useEffect } from 'react';
import eventBus from './utils/event';
import { notification } from 'antd';
import { getOrganizationAsync, getTaskAsync, getUsersAsync } from './redux/slice/project'
import { useDispatch } from 'react-redux';
import Loading from './components/loading/Loading';
import { getProjectListAsync } from './redux/slice/project';
function throttle(func, wait) {
  let timeoutId = null;
  let lastArgs = null;

  function throttled() {
    const args = arguments;

    if (timeoutId === null) {
      func.apply(this, args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (lastArgs !== null) {
          throttled.apply(this, lastArgs);
          lastArgs = null;
        }
      }, wait);
    } else {
      lastArgs = args;
    }
  }

  return throttled;
}

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorNotification = (msg) => {
    notification.error({
      message: msg,
      placement: 'topRight',
      duration: 2
    });
  };
  const openNotification = (msg = '注册成功') => {

    notification.open({
      message: msg,
      placement: 'topRight',
      duration: 2
    })
  };


  useEffect(() => {
    eventBus.on('global_error_tips', (msg) => {
      errorNotification(msg)
    })
    eventBus.on('success_register', () => {
      openNotification()
    })
    eventBus.on('global_not_login', (msg) => {

      navigate('/login')

    })
    //拉取user
    dispatch(getUsersAsync())
    //task
    dispatch(getTaskAsync())
    //organizationpr
    dispatch(getOrganizationAsync())

    dispatch(getProjectListAsync())

  }, [])
  return (
    <div className="App"  >

      <Routes>
        <Route path='' element={<Navigate to='/project' />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<Layout />}>
          <Route path='/project' element={<Project />}></Route>
          <Route path='/project/:id/kanban' element={<KanBan />}></Route>
          <Route path='/project/:id/epic' element={<Epic />}></Route>

        </Route>



      </Routes>
      {/* <Loading></Loading> */}
    </div>
  );
}

export default App;
