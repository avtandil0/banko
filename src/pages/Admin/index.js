import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Row, Col, Space, Tooltip, Popconfirm, Button, message, Modal, Input, Form, Select } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import constants from '../../constants'


import axios from 'axios';

import { Tabs } from 'antd';
import Validation from './Validation'
import Statement from './Statement'

const { TabPane } = Tabs;

const { Option } = Select;


const Admin = () => {

    const [user, setUser] = useState(null);
    const [bank, setBank] = useState([]);

    useEffect(() => {
        let us = JSON.parse(localStorage.getItem("user"));

        setUser(us);

        fetchBank(us)
    }, []);

    const fetchBank = async (us) => {
        const result = await axios(constants.API_PREFIX + '/api/Bank',{
            params: {
                token: us? us.token: user.token
            }});
        setBank(result.data)
    }



    return (
        <div style={{ marginLeft:27, marginTop: 7}}>
            <Button onClick={() => window.location.href = '/'} icon={<ArrowLeftOutlined />} type="text">უკან</Button>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="ვალიდაციები" key="1" >
                <Validation bank={bank}/>
                </TabPane>
                <TabPane tab="განცხადებები" key="2">
                    <Statement bank={bank}/>
                </TabPane>

            </Tabs>
        </div>
    );
};

export default Admin;

