import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Row, Col, Space, Tooltip, Popconfirm, Button, message, Modal, Input, Form, Select } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import constants from '../../constants'


import axios from 'axios';


const { Option } = Select;


const Validation = ({ bank , loantype}) => {

    const columns = [
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) =>
                <div>
                    <Space>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        // okButtonProps={{ loading: confirmLoading }}
                        // visible={true}


                        >
                            <Tooltip placement="bottom" title="წაშლა">
                                <Button type="primary" icon={<DeleteOutlined />} />
                            </Tooltip>
                        </Popconfirm>

                        <Tooltip placement="bottom" title="რედაქტირება">
                            <Button onClick={() => clickEdit(record)} type="primary" icon={<EditOutlined />} />
                        </Tooltip>
                    </Space>
                </div>
        },
        // {
        //     title: 'Id',
        //     dataIndex: 'id',
        // },
        {
            title: 'ბანკი',
            dataIndex: 'bankId',
            filters: [
                {
                    text: 'რებანკი',
                    value: 'რებანკი',
                },
                {
                    text: 'ბაზისბანკი',
                    value: 'ბაზისბანკი',
                },
                {
                    text: 'MBC',
                    value: 'MBC',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, row) => getBankId(row).indexOf(value) === 0,
            sorter: (a, b) => getBankId(a) > getBankId(b),//console.log('234223432',a,b),
            // sortDirections: ['descend'],
            render: (item, row) => <p>{getBankId(row)}</p>,
        },
        {
            title: 'სესხის ტიპი',
            dataIndex: 'loantypeId',
            filters: [
                {
                    text: 'სამომხმარებლო',
                    value: 'სამომხმარებლო',
                },
                {
                    text: 'იპოთეკური',
                    value: 'იპოთეკური',
                },
                {
                    text: 'აგრო',
                    value: 'აგრო',
                },
                {
                    text: 'ავტოლიზინგი',
                    value: 'ავტოლიზინგი',
                },
                {
                    text: 'ბიზნეს სესხი',
                    value: 'ბიზნეს სესხი',
                },
                {
                    text: 'ბიზნეს სესხი',
                    value: 'ბიზნეს სესხი',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, row) => getLoantypeId(row).indexOf(value) === 0,
            sorter: (a, b) => getLoantypeId(a) > getLoantypeId(b),//console.log('234223432',a,b),
            render: (item, row) => <p>{getLoantypeId(row)}</p>,

        },
        {
            title: 'მინ. თანხა',
            dataIndex: 'amountMin',
            sorter: (a, b) => a.amountMin - b.amountMin,//console.log('234223432',a,b),
            // render: (item, row) => <p>{getAmountMin(row)}</p>,
        },
        {
            title: 'მაქს. თანხა',
            dataIndex: 'amountMax',
            sorter: (a, b) => a.amountMax - b.amountMax,
        },




        {
            title: 'შემოსავლის ტიპი',
            dataIndex: 'incomesourceId',
            render: (item, row) => <p>{getIncomesourceId(row)}</p>,

        },

        {
            title: 'საკრედიტო ისტორია/ ვადაგადაცილება',
            dataIndex: 'currentOverdue',
            render: (item, row) => <p>{row?.currentOverdue ? <p style={{ color: 'red' }}>აქვს ვადაგადაცილება</p> : <p >არ აქვს ვადაგადაცილება</p>}</p>,

        },

        {
            title: 'Pti',
            dataIndex: 'pti',
        },
        {
            title: 'რეგიონი',
            dataIndex: 'regionId',
            render: (item, row) => <p>{getRegionId(row)}</p>,
        },
        {
            title: 'DateCreated',
            dataIndex: 'dateCreated',
        },
    ];


    const [customersToBanks, setCustomersToBanks] = useState([]);
    const [incomesource, setIncomesource] = useState([]);
    // const [loantype, setLoantype] = useState([]);
    const [region, setRegion] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState(null);



    const [isModalVisible, setIsModalVisible] = useState(false);

    const [post, setPost] = useState({
        id: null,
        amountMax: null,
        amountMin: null,
        bankId: null,
        dateCreated: null,
        dateDeleted: null,
        incomesourceId: null,
        loantypeId: null,
        pti: "",
        regionId: null
    })

    const confirm = async (record) => {
        setTableLoading(true);
        const result = await axios.delete(constants.API_PREFIX + `/api/RedistributionCustomersToBanks?customersToBankId=${record.id}`,
            {
                params: {
                    token: user?.token
                }
            });
        if (result.data.isSuccess) {
            message.success(result.data.meessage);
            fetchData();
        }
        else {
            message.error(result.data.meessage);
        }
        setTableLoading(false);
    }



    const clickEdit = (record) => {
        setIsEdit(true)
        setIsModalVisible(true);
        setPost(record);

    }

    const handleOk = async () => {
        setButtonLoading(true)
        // console.log("result", result, post)z
        if (!isEdit) {
            const result = await axios.post(constants.API_PREFIX + '/api/RedistributionCustomersToBanks', post,
                {
                    params: {
                        token: user?.token
                    }
                });
            if (result.data.isSuccess) {
                fetchData();
                setIsModalVisible(false);
                message.success(result.data.meessage);
            }
            else {
                message.error(result.data.meessage);
            }
        }
        else {
            const result = await axios.put(constants.API_PREFIX + '/api/RedistributionCustomersToBanks', post,
                {
                    params: {
                        token: user?.token
                    }
                });
            if (result.data.isSuccess) {
                fetchData();
                setIsModalVisible(false);
                message.success(result.data.meessage);
            }
            else {
                message.error(result.data.meessage);
            }
        }
        // console.log("post1", post)
        setButtonLoading(false)

        setPost({
            ...post,
            id: null,
            amountMax: null,
            amountMin: null,
            bankId: null,
            dateCreated: null,
            dateDeleted: null,
            incomesourceId: null,
            loantypeId: null,
            pti: "",
            regionId: null
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const fetchData = async (us) => {
        setTableLoading(true);
        const result = await axios(constants.API_PREFIX + '/api/RedistributionCustomersToBanks', {
            params: {
                token: us ? us.token : user.token
            }
        });
        setCustomersToBanks(result.data)
        setTableLoading(false)
    }

    const fetchIncomesource = async (us) => {
        const result = await axios(constants.API_PREFIX + '/api/IncomeSource', {
            params: {
                token: us ? us.token : user.token
            }
        });
        setIncomesource(result.data)
    }



    const fetchRegion = async (us) => {
        const result = await axios(constants.API_PREFIX + '/api/Region', {
            params: {
                token: us ? us.token : user.token
            }
        });
        setRegion(result.data)
    }




    async function showModal() {
        setIsEdit(false);

        setPost({
            ...post,
            id: null,
            amountMax: null,
            amountMin: null,
            bankId: null,
            dateCreated: null,
            dateDeleted: null,
            incomesourceId: null,
            loantypeId: null,
            pti: "",
            regionId: null
        })

        setIsModalVisible(true);


        // setPost(result.data);
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setPost({ ...post, [name]: value })
    }

    const selectChange = (value, name) => {
        // console.log("event", value, name)
        // const { name, value } = event

        setPost({ ...post, [name]: value })
        if (name == 'currentOverdue') {
            setPost({ ...post, [name]: JSON.parse(value) })
        }
    }



    const getBankId = (row) => {
        const res = bank.filter(item => item.id == row.bankId)[0]?.bankName;
        return res
    }

    const getIncomesourceId = (row) => {
        const res = incomesource.filter(item => item.id == row.incomesourceId)[0]?.incomeSourceName;
        return res
    }

    const getLoantypeId = (row) => {
        const res = loantype.filter(item => item.id == row.loantypeId)[0]?.loanTypeName;
        return res
    }

    const getRegionId = (row) => {
        const res = region.filter(item => item.id == row.regionId)[0]?.regionName;
        return res
    }

    useEffect(() => {
        let us = JSON.parse(localStorage.getItem("user"));

        setUser(us);

        fetchData(us);
        fetchIncomesource(us);
        // fetchLoantype(us);
        fetchRegion(us);
    }, []);




    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />

            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Button onClick={showModal} type="primary">დამატება</Button>
                    <br />
                    <br />
                    <Table
                        loading={tableLoading}
                        columns={columns}
                        dataSource={customersToBanks}
                        pagination={{ pageSize: 50 }}
                    />
                </Col>
                <Col span={1}></Col>
            </Row>
            <Modal
                title={isEdit ? 'რედაქტირება' : "დამატება"}

                cancelText={"გაუქმება"}
                okText={"შენახვა"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={buttonLoading}
                width={950}
            >
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Input type="number" name="amountMin" value={post?.amountMin} onChange={e => handleChange(e)} placeholder="მინიმალური თანხა" />
                        </div>

                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Input type="number" name="amountMax" value={post?.amountMax} onChange={e => handleChange(e)} placeholder="მაქსიმალური თანხა" />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select
                                onChange={(value) => selectChange(value, 'bankId')}
                                placeholder="ბანკი"
                                style={{ width: "100%" }}
                                value={post?.bankId}
                            >
                                {bank.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id} >{item.bankName}</Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select onChange={(value) => selectChange(value, 'incomesourceId')}
                                placeholder="შემოსავლის წყარო"
                                style={{ width: "100%" }}
                                value={post?.incomesourceId}
                            >
                                {incomesource.map(item => {
                                    return (
                                        <Option value={item.id} >{item.incomeSourceName}</Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select
                                onChange={(value) => selectChange(value, 'loantypeId')}
                                placeholder="სესხის ტიპი"
                                style={{ width: "100%" }}
                                value={post?.loantypeId}
                            >
                                {loantype.map(item => {
                                    return (
                                        <Option value={item.id} >{item.loanTypeName}</Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Input type="text" name="pti" value={post?.pti} onChange={e => handleChange(e)} placeholder="Pti" />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select
                                onChange={(value) => selectChange(value, 'regionId')}
                                placeholder="რეგიონი"
                                style={{ width: "100%" }}
                                value={post?.regionId}
                            >
                                {region.map(item => {
                                    return (
                                        <Option value={item.id} >{item.regionName}</Option>
                                    );
                                })}
                            </Select>
                        </div>

                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select
                                onChange={(value) => selectChange(value, 'currentOverdue')}
                                placeholder="საკრედიტო ისტორია/ვადაგადაცილება"
                                style={{ width: "100%" }}
                                value={post?.currentOverdue}
                            >
                                <option value={true}>აქვს ვადაგადაცილება</option>
                                <option value={false}>არ აქვს ვადაგადაცილება</option>
                            </Select>
                        </div>

                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div >
                            <Select
                                onChange={(value) => selectChange(value, 'incomeAccrue')}
                                placeholder="ხელფასი ერიცხება"
                                style={{ width: "100%" }}
                                value={post?.incomeAccrue}
                            >
                                <option value="ყველა">ყველა</option>
                                <option value="ბანკში">ბანკში</option>
                                <option value="ხელზე">ხელზე</option>
                            </Select>
                        </div>

                    </Col>
                </Row>

            </Modal>

        </div>
    );
};

export default Validation;

