import React, { useState, Fragment, lazy, useEffect } from "react";

import {
  Modal,
  Button as AntdButton,
  Form,
  Input,
  Row,
  Col,
  Drawer,
  Select,
  DatePicker,
  Divider,
  Table,
  Tag,
  Space,
  Button,
} from "antd";
import axios from "axios";

const Profile = () => {
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
    console.log("res", result);
    setStatements(result.data);
    setStatementLoading(false);
  }, []);

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
      <br></br>
      <br></br>
      <br></br>
      <Row justify="center">
        <Col span={16}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">სახელი</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="სახელი"
                value={user?.name}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">გვარი</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="გვარი"
                value={user?.lastName}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">მობილური</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="მობილური"
                value={user?.phoneNumber}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">ელ.ფოსტა</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="ელ.ფოსტა"
                value={user?.email}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">დაბ.თარიღი</label>
              {/* <DatePicker
                  value={user?.birthDate}
                  onChange={handleChangeDate}
                /> */}
              <input
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="დაბ.თარიღი"
                value={user?.birthDate}
              />
            </div>

            <div className="form-group col-md-6">
              <label for="inputPassword4">მისამართი</label>
              <input
                disabled
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="წყარო"
                value={user?.address}
              />
            </div>
          </div>
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

export default Profile;
