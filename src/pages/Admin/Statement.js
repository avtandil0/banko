import React, { useState, Fragment, lazy, useEffect } from "react";

import { ArrowDownOutlined,
   CheckOutlined, EditOutlined, FundViewOutlined,
   FilePdfOutlined,
    CloseOutlined, ArrowLeftOutlined,SyncOutlined,FileExcelOutlined } from '@ant-design/icons';

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

// let xlsx = require("json-as-xlsx")
import xlsx from "json-as-xlsx";

const { Option } = Select;

const Statement = ({bank, loantype}) => {

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
  const [statementCount, setStatementCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [approvedAmount, setApprovedAmount] = useState(0);


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
    setModal({ ...modal, type: type });
  }


  const modalAmountChange = (amount) => {
    setModal({ ...modal, amount: amount });
  }

  const showModal = (item) => {
    setModal({ ...modal, id: item.id, visible: true, amount: item.requestedAmount, type: item.loantypeId.toString() });
  };

  const handleOk = async () => {
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

    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))


    // search(us)

    setUser(us);

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



  }, []);

  useEffect(async () => {

    let us = JSON.parse(localStorage.getItem("user"));


    if (user) {
      search(us)
    }
  }, [user]);

  useEffect(async () => {

    console.log('statementsstatementsstatements',statements)

  }, [statements]);
  const showPopconfirm = () => {
    setVisible(true);
  };

  const search = async (us) => {
    setStatementLoading(true);

    var result = await axios.get(
      constants.API_PREFIX + `/api/Home?userId=${us ? us.id : user?.id}&token=${us ? us.token : user?.token}`);

    console.log('resultresultresult',result)
    setStatements(result.data);
    setStatementCount(result.data?.length)
    setApprovedCount(result.data?.filter(r => r.statementStatus == 3).length)
    setApprovedAmount(sumBy(result.data?.filter(r => r.statementStatus == 3), function(o) { return o.requestedAmount; }))
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
  }

  const handleChangeRadio = (e) => {
    setAgroType(e.target.id);
  };

  const download = (row) => {
    history.push(`detail/${row.id}`)

  }

  const handleView = (item) => {
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

  const getBankName = (id) =>{
    return bank.filter(r => r.id == id)[0]? bank.filter(r => r.id == id)[0].bankName : ''
  }

  const getLoantypeId = (row) => {
    const res = loantype.filter(item => item.id == row.loantypeId)[0]?.loanTypeName;
    return res
}

const getBankId = (row) => {
  const res = bank.filter(item => item.id == row.bankId)[0]?.bankName;

  return res
}
  const columns = [
    {
      title: "მოქმედებები",
      dataIndex: "id",
      key: "id",
      render: (id, row) => (
        <>
          <Space>




            <Tooltip placement="bottom" title="ნახვა">
              <Button type="primary" onClick={() => handleView(row)} icon={<FundViewOutlined style={{ color: 'white' }} />}>
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
            text: 'საკრედიტო ბარათები',
            value: 'საკრედიტო ბარათები',
        },

    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, row) => getLoantypeId(row).indexOf(value) === 0,
      // render: (loantypeId) => <a>{getIncomeSourceName(loantypeId)}</a>,
      sorter: (a, b) => getLoantypeId(a) > getLoantypeId(b),//console.log('234223432',a,b),
      render: (item, row) => <p>{getLoantypeId(row)}</p>,
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
    {
        title: "ბანკი",
        dateCreated: "bank",
        key: "bankId",
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
          {
            text: 'კრედო ბანკი',
            value: 'კრედო ბანკი',
        },
          {
            text: 'თიბისი ბანკი',
            value: 'თიბისი ბანკი',
        },
          {
            text: 'საქართველოს ბანკი',
            value: 'საქართველოს ბანკი',
        },

      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, row) => handleBankFilter(value, row),
      sorter: (a, b) => getBankId(a) > getBankId(b),//console.log('234223432',a,b),
      // sortDirections: ['descend'],
      render: (item, row) => <p>{getBankId(row)}</p>,
        // render: (row) => <a>{getBankName(row.bankId)}</a>,
      },

      {
        title: "უარყოფის მიზეზი",
        dateCreated: "t",
        key: "t",
        render: (t) => (
          <a>{t.rejectReason}</a>
        ),
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

  const handleBankFilter = (value, row) =>{
    return getBankId(row)?.indexOf(value) === 0
  }

  const downloadExcel =()=>{
    console.log('aa',statements)

    let data = [
      {
        sheet: "განცხადებები",
        columns: [
          { label: "სტატუსი", value: ( row) => getStatementStatus(row.statementStatus) }, // Top level data
          { label: "სესხის ტიპი", value: (row) => getLoantypeId(row) }, // Custom format
          { label: "სესხის თანხა", value: (row) => (row.requestedAmount) }, // Run functions
          { label: "სახელი/გვარი", value: (row) => (row.user ? `${row.user?.name} ${row.user?.lastName}`  : "") }, // Run functions
          { label: "მობ. ნომერი", value: (row) => (row.user ? row.user?.phoneNumber : "") }, // Run functions
          { label: "შევსების თარიღი", value: (row) => (row.dateCreated ? row.dateCreated.substring(0,10) || "" : "") }, // Run functions
          { label: "ბანკი", value: (row) => getBankId(row) }, // Run functions
          { label: "უარყოფის მიზეზი", value: (row) => row.rejectReason }, // Run functions
        ],
        content: statements,
      },
    ]
    
    let settings = {
      fileName: "განცხადებები", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    }
    
    xlsx(data, settings) 
  }

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
                  style={{color: 'green'}}
                    size="large"
                    icon={<CheckOutlined style={{color: 'green'}}/>}
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

      <AntModal width={600} title="რედაქტირება" visible={modal.visible} okButtonProps={{ loading: modal.loading }}
       onOk={handleOk} okText="შენახვა" onCancel={handleCancel}
        cancelText="დახურვა">
        <Space size="large">
          სესხის ტიპი
          <Select value={modal.type} style={{ width: 200 }} onChange={modalSelectChange}>
            {/* {loanTypesOptions.map((option) => (
              // <Select.Option key={option} value={option}>{option}</Select.Option>
              <Option value={option.value}>{option.text}</Option>
            ))} */}
            <Option value="1">სამომხმარებლო</Option>
            <Option value="2">იპოთეკური</Option>
            <Option value="3">ბიზნეს სესხი</Option>
            <Option value="4">აგრო სესხი</Option>
            <Option value="5">საკრედიტო ბარათები</Option>
            <Option value="6">ავტო სესხი</Option>
          </Select>
          თანხა<InputNumber value={modal.amount} onChange={modalAmountChange} />
        </Space>

      </AntModal>

      <Row justify="center">
        <Col span={16}>
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
                value={statementCount}//
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic title="დამტკიც. რაოდენობა"
                value={approvedCount} />
              <Statistic title="დამტკიც. თანხა" prefix="₾"
              value={approvedAmount} style={{
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
          <Button disabled={!statements.length} style={{marginLeft: 15}} onClick={() => downloadExcel()} icon={<FileExcelOutlined />} type="primary">ექსპორტი</Button>
          <br></br>
          <br></br>
          <Table
            loading={statementLoading}
            columns={columns}
            dataSource={statements}
            pagination={{ pageSize: 50 }}
            onChange={(pag, filter, sorter, extra) => {
             console.log('onFilteronFilteronFilteronFilter',extra)
             setStatementCount(extra.currentDataSource.length)
             setApprovedCount(extra.currentDataSource.filter(r => r.statementStatus == 3).length)
             setApprovedAmount(sumBy(extra.currentDataSource.filter(r => r.statementStatus == 3), function(o) { return o.requestedAmount; }))
             setStatementLoading(false);
            }}

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

export default Statement;
