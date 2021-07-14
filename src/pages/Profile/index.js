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

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const columns = [
    {
      title: "ტიპი",
      dataIndex: "type",
      key: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "თანხა",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "ვადა",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "შენატანი",
      dataIndex: "deposit",
      key: "deposit",
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
      dataIndex: "address",
      key: "address",
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
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="სახელი"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">გვარი</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="გვარი"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">მობილური</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="მობილური"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">ელ.ფოსტა</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="ელ.ფოსტა"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">დაბ.თარიღი</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="დაბ.თარიღი"
              />
            </div>

            <div className="form-group col-md-6">
              <label for="inputPassword4">მისამართი</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="წყარო"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <label>
                {" "}
                <input type="checkbox" value="" /> გავეცანი და ვეთანხმები
              </label>
            </div>
          </div>

          <Button type="primary">შენახვა</Button>

          <br></br>
          <br></br>
          <Table columns={columns} dataSource={data} />
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
