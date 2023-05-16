import React, { memo } from 'react'
import { Alert, Space, Spin } from 'antd';

const Loading = () => (
    <Space direction="vertical" style={{
        width: '100%', height: '100%', position: 'absolute'
        , inset: '0'
    }}>
        <Space>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>

        </Space>


    </Space>
);
export default Loading