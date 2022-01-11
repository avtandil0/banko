import React, { useState, Fragment, lazy, useEffect } from "react";

import { ArrowDownOutlined,
   CheckOutlined, EditOutlined, FundViewOutlined,
   FilePdfOutlined,
    CloseOutlined, ArrowLeftOutlined,SyncOutlined } from '@ant-design/icons';

import {
  Modal as AntModal,
  Button as AntdButton,
  Form as AntForm,
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
  PageHeader,
  InputNumber,
  message,

} from "antd";
import axios from "axios";
import constants from '../../constants'
import { modalGlobalConfig } from "antd/lib/modal/confirm";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { sumBy } from 'lodash'


import { BusinessLoan } from '../../components/LoanTypes/BusinessLoan'
import { ConsumerLoan } from '../../components/LoanTypes/ConsumerLoan'
import { AgroLoan } from '../../components/LoanTypes/AgroLoan'
import { MortgageLoan } from '../../components/LoanTypes/MortgageLoan'
import { AutoLeasing } from '../../components/LoanTypes/AutoLeasing'
import { CreditCard } from '../../components/LoanTypes/CreditCard'

const { Option } = Select;

const Bank = () => {

  let history = useHistory();

  const [user, setUser] = useState(null);
  const [statements, setStatements] = useState([]);
  const [loanTypesOptions, setLoanTypesOptions] = useState([]);
  const [statementLoading, setStatementLoading] = useState(false);
  const [statement, setStatement] = useState([]);
  const [show1, setShow1] = useState(false);
  const [productTypeName, setProductTypeName] = useState("");
  const [productType, setProductType] = useState(false);
  const [validated, setValidated] = useState(false);
  const [agroType, setAgroType] = useState("physical");
  const [sentLoading, setSentLoading] = useState(false);
  const [receiveLoading, setReceiveLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [approvaloading, setApprovaloading] = useState(false);
  const [rejectionLoading, setRejectionLoading] = useState(false);


  const [modal, setModal] = useState({
    visible: false,
    type: '',
    amount: 0,
    loading: false
  });

  const changeStatus = async (status) => {
    switch (status) {
      case 3:
        setApprovaloading(true)
        break;
      case 4:
        setRejectionLoading(true)
        break;
    }
    var result = await axios.put(
      // `https://weblive.com.ge/api/Home`,
      constants.API_PREFIX + `/api/Statement/${user.id}/${statement.id}/${status}`,//დამუშავების პროცესში
      null, {
      params: {
        token: user?.token
      }
    }
    );

    message.open({
      key: 'updatable',
      type: result.data.isSuccess ? 'success' : 'error',
      content: result.data.meessage
    });

    setApprovaloading(false)
    setRejectionLoading(false)

    setShow1(false)

    if (result.data.isSuccess) {
      search()
    }

  }

  const modalSelectChange = (type) => {
    console.log(modal, type)
    setModal({ ...modal, type: type });
  }


  const modalAmountChange = (amount) => {
    console.log(modal, amount)
    setModal({ ...modal, amount: amount });
  }

  const showModal = (item) => {
    console.log(item)
    setModal({ ...modal, id: item.id, visible: true, amount: item.requestedAmount, type: item.loantypeId.toString() });
  };

  const handleOk = async () => {
    console.log(modal)
    setModal({ ...modal, loading: true });
    var result = await axios.post(
      // `https://weblive.com.ge/api/Home`,
      constants.API_PREFIX + `/api/Statement/${user.id}/${modal.id}/${modal.type}/${modal.amount}`,
      null, {
      params: {
        token: user?.token
      }
    }
    );

    message.open({
      key: 'updatable',
      type: result.data.isSuccess ? 'success' : 'error',
      content: result.data.meessage
    });
    console.log(result)

    setModal({ ...modal, visible: false, loading: false });

    if (result.data.isSuccess) {
      search()
    }

  };

  const handleCancel = () => {
    setModal({ ...modal, visible: false });
  };
  useEffect(async () => {
    window.scrollTo(0, 0);

    console.log(JSON.parse(localStorage.getItem("user")));
    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))


    // search(us)

    setUser(us);
    console.log("us", us, constants.API_PREFIX);

    //setLoanTypesOptions
    var loanTypes = await axios.get(
      constants.API_PREFIX + `/api/BankToLoan/${us.id}`,
      {
        params: {
          token: us?.token
        }
      });


    let newArlloanto = loanTypes.data.map(el => { return { value: el.loantypeId.toString(), text: el.loantype.loanTypeName } })
    // console.log('newArlloanto', newArlloanto)
    setLoanTypesOptions(newArlloanto)
    console.log('loanTypes', loanTypes)



  }, []);

  useEffect(async () => {

    let us = JSON.parse(localStorage.getItem("user"));


    if (user) {
      search(us)
    }
  }, [user]);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const search = async (us) => {
    setStatementLoading(true);

    console.log('usssseeer0000', us, user)
    var result = await axios.get(
      constants.API_PREFIX + `/api/Home?userId=${us ? us.id : user?.id}&token=${us ? us.token : user?.token}`);
    console.log("data123", result.data);
    setStatements(result.data);
    setStatementLoading(false);
  }

  const confirmReceive = async (item) => {
    setReceiveLoading(true)
    setVisible(true)
    message.loading({ content: 'Loading...', key: 'updatable' });

    var result = await axios.put(
      // `https://weblive.com.ge/api/Home`,
      constants.API_PREFIX + `/api/Statement/${user.id}/${item.id}/${2}`//დამუშავების პროცესში
      , null, {
      params: {
        token: user?.token
      }
    }
    );
    setReceiveLoading(false)
    setVisible(false)
    console.log(result)
    // if(resu)
    message.open({
      key: 'updatable',
      type: result.data.isSuccess ? 'success' : 'error',
      content: result.data.meessage
    });

    if (result.data.isSuccess) {
      search()
    }
    // console.log(item)
  }

  const handleEdit = (item) => {
    showModal(item)
    console.log('item', item)
  }

  const handleChangeRadio = (e) => {
    console.log("aaaa", e.target);
    setAgroType(e.target.id);
  };

  const download = (row) => {
    history.push(`detail/${row.id}`)
    console.log('aaaa',row)
   


  }

  const handleView = (item) => {
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
    console.log('item', item)
  }


  const getStatementStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return "ახალი";
      case 2:
        return "დამუშავების პროცესში";
      case 3:
        return "დაკმაყოფილდა";
      case 4:
        return "უარი ეთქვა";
      default:
        return "";
    }
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
        return "ავტო სესხი";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "მოქმედებები",
      dataIndex: "id",
      key: "id",
      render: (id, row) => (
        <>
          <Space>
            <Tooltip placement="bottom" title="მიღება">
              <Popconfirm
                title="გსურთ მიღება?"
                onConfirm={() => confirmReceive(row)}
                // onCancel={cancel}
                // visible={visible}
                okText="დიახ"
                disabled={row.statementStatus != 1}
                cancelText="არა"
              >
                <Button type="primary" disabled={row.statementStatus != 1} key={id} icon={<CheckOutlined style={{ color: 'white' }} />}>
                </Button>
              </Popconfirm>

            </Tooltip>


            <Tooltip placement="bottom" title="რედაქტირება">
              <Button type="primary" disabled={row.statementStatus != 2} onClick={() => handleEdit(row)} icon={<EditOutlined style={{ color: 'white' }} />}>
              </Button>
            </Tooltip>
            <Tooltip placement="bottom" title="ნახვა">
              <Button type="primary" onClick={() => handleView(row)} icon={<FundViewOutlined style={{ color: 'white' }} />}>
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="ჩამოტვირთვა">
              <Button type="primary" onClick={() => download(row)} icon={<FilePdfOutlined  style={{ color: 'white' }} />}>
              </Button>
            </Tooltip>

          </Space>

        </>
      ),
    },
    {
      title: "სტატუსი",
      dataIndex: "statementStatus",
      key: "statementStatus",
      render: (statementStatus) => (
        <>
          <Tag color="cyan">{getStatementStatus(statementStatus)}</Tag>
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
          {user?.name} {user?.lastName}
        </a>
      ),
    },
    {
      title: "მობ. ნომერი",
      dataIndex: "user",
      key: "user",
      render: (user) => <a>{user?.phoneNumber}</a>,
    },
    {
      title: "შევსების თარიღი",
      dateCreated: "t",
      key: "t",
      render: (t) => <a>{t.dateCreated? t.dateCreated.substring(0,10) : ''}</a>,
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
    // {
    //   title: "მისამართი",
    //   dataIndex: "actualAddress",
    //   key: "actualAddress",
    // },
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


      <Modal show={show1} onHide={() => setShow1(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{productTypeName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
          // onSubmit={sendStatement}
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

            {statement.statementStatus == 2 ?
              <div style={{ margin: 'auto', width: '50%' }}>
                <Space size="large">
                  <Button
                    size="large"
                    icon={<CheckOutlined />}
                    loading={approvaloading}
                    onClick={() => changeStatus(3)}
                  >
                    დამტკიცება
                  </Button>

                  <Button
                    danger
                    size="large"
                    icon={<CloseOutlined />}
                    loading={rejectionLoading}
                    onClick={() => changeStatus(4)}
                  >
                    უარყოფა
                  </Button>
                </Space>
              </div>
              : ''}


            {/* <AntdButton
              // onClick={sendStatement}
              htmlType="submit"
              type="primary"
              loading={sentLoading}
            >
              გაგზავნა
            </AntdButton> */}
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <AntModal title="რედაქტირება" visible={modal.visible} okButtonProps={{ loading: modal.loading }} onOk={handleOk} okText="შენახვა" onCancel={handleCancel}
        cancelText="დახურვა">
        <Space size="large">
          <Select value={modal.type} style={{ width: 200 }} onChange={modalSelectChange}>
            {loanTypesOptions.map((option) => (
              // <Select.Option key={option} value={option}>{option}</Select.Option>
              <Option value={option.value}>{option.text}</Option>
            ))}
            {/* <Option value="1">სამომხმარებლო</Option>
            <Option value="2">იპოთეკური</Option>
            <Option value="3">ბიზნეს სესხი</Option>
            <Option value="4">აგრო</Option>
            <Option value="5">საკრედიტო ბარათები</Option>
            <Option value="6">ავტო სესხი</Option> */}
          </Select>
          <InputNumber value={modal.amount} onChange={modalAmountChange} />
        </Space>

      </AntModal>
      <br></br>
      <br></br>

      <Row justify="center">
        <Col span={16}>
          <Button onClick={() => window.location.href = '/'} icon={<ArrowLeftOutlined />} type="text">უკან</Button>
          <br/>
          <h2>{user?.name?.toUpperCase()}</h2>
          <PageHeader
            // title={user?.name?.toUpperCase()}
            // tags={<Tag color="blue">აქტიური</Tag>}
            // subTitle="This is a subtitle"
            // extra={[
            //   <Button key="3">Operation</Button>,
            //   <Button key="2">Operation</Button>,
            //   <Button key="1" type="primary">
            //     Primary
            //   </Button>,
            // ]}
          >
            <Row>
              {/* <Statistic title="Status" value="Pending" /> */}
              <Statistic
                title="სულ განცხადებები"
                value={statements.length}
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic title="დამტკიც. რაოდენობა" 
                value={statements.filter(r => r.statementStatus == 3).length} />
              <Statistic title="დამტკიც. თანხა" prefix="₾" 
              value={sumBy(statements.filter(r => r.statementStatus == 3), function(o) { return o.requestedAmount; })} style={{
                  margin: '0 32px',
                }}/>
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
          {/* <Space size="large">
            <Select defaultValue="სტატუსი" style={{ width: 200 }}>
              <Option value="ახალი">ახალი</Option>
              <Option value="მიღებული">მიღებული</Option>
              <Option value="უარყოფილი">უარყოფილი</Option>
              <Option value="დამტკიცებული">დამტკიცებული</Option>
            </Select>
            <Select defaultValue="პროდუქტის ტიპი" style={{ width: 200 }}>
              {loanTypesOptions.map((option) => (
                <Option value={option.value}>{option.text}</Option>
              ))}
             
            </Select>
            <Select defaultValue="რეგიონი" style={{ width: 200 }}>

            </Select>
            <Select defaultValue="რაიონი" style={{ width: 200 }}>

            </Select>
          </Space> */}

          <br></br>
          <br></br>
          <Button onClick={() => search()} icon={<SyncOutlined spin={statementLoading}/>} type="primary">Sync</Button>
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
