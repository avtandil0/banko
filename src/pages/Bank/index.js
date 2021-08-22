import React, { useState, Fragment, lazy, useEffect } from "react";
import { ArrowDownOutlined, ExceptionOutlined, EditOutlined, DownSquareOutlined } from '@ant-design/icons';

import {
  Modal,
  Button as AntdButton,
  Form,
  Input,
  Row,
  Col,
  Drawer,
  Select,
  Statistic,
  DatePicker,
  Divider,
  Popconfirm,
  Table,
  Tag,
  Space,
  Button,
  Tooltip,
  PageHeader

} from "antd";
import axios from "axios";

const { Option } = Select;

const Bank = () => {
  const [user, setUser] = useState();
  const [statements, setStatements] = useState([]);
  const [statementLoading, setStatementLoading] = useState(false);

  useEffect(async () => {
    window.scrollTo(0, 0);
    console.log(JSON.parse(localStorage.getItem("user")));
    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))
    setUser(us);
    console.log("us", us);

    setStatementLoading(true);
    var result = await axios.get(`https://weblive.com.ge/api/Home`, {
      params: { userId: us.id },
    });
    console.log("data", result.data);
    setStatements(result.data);
    setStatementLoading(false);
  }, []);


  const handleEdit = (item) => {
    console.log('item', item)
  }

  const getIncomeSourceName = (id) => {
    switch (id) {
      case 1:
        return "სამომხმარებლო";
      case 2:
        return "იპოთეკური";
      case 3:
        return "ბიზნეს სესხი";
      case 4:
        return "აგრო";
      case 5:
        return "საკრედიტო ბარათები";
      case 6:
        return "ავტოლიზინგი";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "მოქმედებები",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <>
          <Space>

            <Tooltip placement="bottom" title="ჩამოტვირთვა">
              {/* <Popconfirm title="გსურთ მიღება? " okText="დიახ" cancelText="არა"> */}

              <Button type="primary" icon={<ArrowDownOutlined style={{ color: 'white' }} />}>
              </Button>
              {/* </Popconfirm> */}

            </Tooltip>

            <Tooltip placement="bottom" title="რედაქტირება">
              <Button type="primary" onClick={() => handleEdit(id)} icon={<EditOutlined style={{ color: 'white' }} />}>
              </Button>
            </Tooltip>
          </Space>

        </>
      ),
    },
    {
      title: "სტატუსი",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          <Tag color="cyan">ახალი</Tag>
        </>
      ),
    },
    {
      title: "ტიპი",
      dataIndex: "loantypeId",
      key: "loantypeId",
      render: (loantypeId) => <a>{getIncomeSourceName(loantypeId)}</a>,
    },
    {
      title: "თანხა",
      dataIndex: "requestedAmount",
      key: "requestedAmount",
    },
    {
      title: "სახელი/გვარი",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <a>
          {user.name} {user.lastName}
        </a>
      ),
    },
    {
      title: "მობ. ნომერი",
      dataIndex: "user",
      key: "user",
      render: (user) => <a>{user.phoneNumber}</a>,
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "მისამართი",
      dataIndex: "actualAddress",
      key: "actualAddress",
    },
  ];

  const data = [
    {
      key: "1",
      type: "სამომხმარებლო",
      amount: 70000,
      term: "12",
      address: "მსიამართი 111",
      deposit: "700",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      type: "იპოთეკური",
      amount: 15000,
      term: "24",
      address: "მსიამართი 12222",
      deposit: "900",
      tags: ["loser"],
    },
    {
      key: "3",
      type: "ლიზინგი",
      amount: 15000,
      term: "8",
      address: "მსიამართი 222111",
      deposit: "200",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <br></br>
      <br></br>

      <Row justify="center">
        <Col span={16}>
          <PageHeader
            title="Title"
            tags={<Tag color="blue">Running</Tag>}
            subTitle="This is a subtitle"
            extra={[
              <Button key="3">Operation</Button>,
              <Button key="2">Operation</Button>,
              <Button key="1" type="primary">
                Primary
              </Button>,
            ]}
          >
            <Row>
              <Statistic title="Status" value="Pending" />
              <Statistic
                title="Price"
                prefix="$"
                value={568.08}
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic title="Balance" prefix="$" value={3345.08} />
            </Row>
          </PageHeader>
          {/*  */}
          {/* <div className="form-group">
            <div className="form-check">
              <label>
                {" "}
                <input type="checkbox" value="" /> გავეცანი და ვეთანხმები
              </label>
            </div>
          </div> */}

          {/* <Button type="primary">შენახვა</Button> */}
          <br></br>
          <Select defaultValue="სტატუსი" style={{ width: 200 }}>
            <Option value="ახალი">ახალი</Option>
            <Option value="მიღებული">მიღებული</Option>
            <Option value="ავტოლიზინგი">უარყოფილი</Option>
            <Option value="ავტოლიზინგი">დამტკიცებული</Option>
          </Select>
          <Select defaultValue="პროდუქტის ტიპი" style={{ width: 200, marginLeft: 24 }}>
            <Option value="იპოთეკური">იპოთეკური</Option>
            <Option value="სამომხმარებლო">სამომხმარებლო</Option>
            <Option value="აგრო">აგრო</Option>
            <Option value="საკრედიტო ბარათები">საკრედიტო ბარათები</Option>
            <Option value="ავტოლიზინგი">ავტოლიზინგი</Option>
          </Select>
          <Select defaultValue="რეგიონი" style={{ width: 200, marginLeft: 24 }}>
            
          </Select>
          <Select defaultValue="რაიონი" style={{ width: 200, marginLeft: 24 }}>
           
          </Select>
          <br></br>
          <br></br>
          <br></br>
          <Table
            loading={statementLoading}
            columns={columns}
            dataSource={statements}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Col>
        {/* <Col span={4}></Col>
        <Col span={4}>col-4</Col> */}
        {/* <Col span={8}>col-4</Col> */}
      </Row>
    </div>
  );
};

export default Bank;
