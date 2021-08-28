import React, { useState, Fragment, lazy, useEffect } from "react";
import { ArrowDownOutlined, ExceptionOutlined, EditOutlined, DownSquareOutlined } from '@ant-design/icons';

import {
  Modal as AntModal,
  Button as AntdButton,
  Form as AntForm,
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
  Tooltip,
  message,
} from "antd";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";

import axios from "axios";
import { BusinessLoan } from '../../components/LoanTypes/BusinessLoan'
import { ConsumerLoan } from '../../components/LoanTypes/ConsumerLoan'
import { AgroLoan } from '../../components/LoanTypes/AgroLoan'
import { MortgageLoan } from '../../components/LoanTypes/MortgageLoan'
import { AutoLeasing } from '../../components/LoanTypes/AutoLeasing'
import { CreditCard } from '../../components/LoanTypes/CreditCard'

const Profile = () => {
  const [user, setUser] = useState();
  const [statements, setStatements] = useState([]);
  const [statement, setStatement] = useState([]);
  const [statementLoading, setStatementLoading] = useState(false);
  const [productTypeName, setProductTypeName] = useState("");
  const [validated, setValidated] = useState(false);
  const [show1, setShow1] = useState(false);
  const [sentLoading, setSentLoading] = useState(false);
  const [productType, setProductType] = useState(false);
  const [agroType, setAgroType] = useState("physical");

  const handleEdit = (item) => {
    // showModal(item)
    console.log('item', item)
    setStatement(item);
    setProductType(item.loantypeId);
    switch (item.loantypeId) {
      case 1:
        setProductTypeName("სამომხმარებლო");
        break;
      case 2:
        setProductTypeName("იპოთეკური");
        break;
      case 3:
        setProductTypeName("ბიზნეს სესხი");
        break;
      case 4:
        setProductTypeName("აგრო");
        break;
      case 5:
        setProductTypeName("საკრედიტო ბარათები");
        break;
      case 6:
        setProductTypeName("ავტო სესხი");
        break;

      default:
        break;
    }
    setShow1(true);
  }


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

  const handleChangeRadio = (e) => {
    console.log("aaaa", e.target);
    setAgroType(e.target.id);
  };



  const sendStatement = async (event) => {
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("11111", form);
      return;
    }

    console.log(statement);
    setSentLoading(true);
    // var result = await axios.post(
    //   `https://weblive.com.ge/api/Home`,
    //   statement
    // );
    // console.log("result WorkExperience", result);
    setSentLoading(false);
    setShow1(false);
    // message.success(result.data.meessage);
  };


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
        return "ავტო სესხი";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "მოქმედება",
      dataIndex: "action",
      key: "action",
      render: (text, row) => (
        <>
          <Space>
            <Tooltip placement="bottom" title="რედაქტირება">
              <Button type="primary" onClick={() => handleEdit(row)} icon={<EditOutlined style={{ color: 'white' }} />}>
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
      <br></br>
      <br></br>
      <br></br>
      <Modal show={show1} onHide={() => setShow1(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{productTypeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={sendStatement}
          >
            <div>
              {productType == 4 ? (
                <>
                  <div key={`inline-1`} className="mb-3">
                    <Form.Check
                      inline
                      label="ფიზიკური პირი"
                      name="group1"
                      type="radio"
                      id="physical"
                      defaultChecked
                      checked={agroType === "physical"}
                      onChange={(e) => handleChangeRadio(e)}
                    />
                    <Form.Check
                      inline
                      label="იურიდიული პირი"
                      name="group1"
                      type="radio"
                      id="legal"
                      checked={agroType === "legal"}
                      onChange={(e) => handleChangeRadio(e)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="form-row">
              {/* {productType == 3 ? businessLoan() : ""} */}
              {productType == 3 ?
                <BusinessLoan statement={statement} setStatement={setStatement} /> : ""}

              {/* {productType == 1 ? consumerLoan() : ""} */}
              {productType == 1 ?
                <ConsumerLoan statement={statement} setStatement={setStatement} />
                : ""}

              {/* {productType == 4 ? agroLoan() : ""} */}
              {productType == 4 ?
                <AgroLoan statement={statement} setStatement={setStatement} agroType={agroType} /> : ""}

              {/* {consumerLoan()} */}
              {/* {productType == 2 ? mortgageLoan() : ""} */}
              {productType == 2 ?
                <MortgageLoan statement={statement} setStatement={setStatement} /> : ""}

              {/* {productType == 6 ? autoLeasing() : ""} */}
              {productType == 6 ?
                <AutoLeasing statement={statement} setStatement={setStatement} />
                : ""}

              {/* {productType == 5 ? creditCard() : ""} */}
              {productType == 5 ?
                <CreditCard statement={statement} setStatement={setStatement} /> : ""}

            </div>
            <br></br>

            <AntdButton
              // onClick={sendStatement}
              htmlType="submit"
              type="primary"
              loading={sentLoading}
            >
              შენახვა
            </AntdButton>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>


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
