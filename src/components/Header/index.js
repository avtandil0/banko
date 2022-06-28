import React, { useState, Fragment, lazy, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import "bootstrap/dist/css/bootstrap.min.css";

// import Sonnet from 'react-bootstrap/Sonnet';
// import { Menu, Dropdown } from "antd";
import { Form, InputGroup } from "react-bootstrap";

import axios from "axios";
import constants from "../../constants";

import {
  message,
  Menu,
  Modal,
  Button as AntdButton,
  // Form,
  Input,
  Row,
  Col,
  Drawer,
  Select,
  Radio,
  DatePicker,
  Checkbox,
  Tabs,
  Dropdown,
} from "antd";

import LoginModal from '../../common/LoginModal/index'


import { LockOutlined, UserOutlined } from "@ant-design/icons";
import * as S from "./styles";

import i18n from "i18next";

const { Option } = Select;
const { TabPane } = Tabs;

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
const MySwal = withReactContent(Swal);

const Header = ({
  t,
  setInProfileMOde,
  isAuthorize,
  setIsAuthorize,
  openLoginRegisterDialog,
}) => {
  const history = useHistory();

  const [visibleProfileDialog, setVisibleProfileDialog] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [visibleLoginRegisterDialog, setVisibleLoginRegisterDialog] =
    useState(false);

  const [formLayout, setFormLayout] = useState("horizontal");

  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [sendSmsLoading, setSendSmsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const [test, setTest] = useState(444444);
  const [currentUser, setCurrentUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [language, setLanguage] = useState("ge");

  const onFinish = () => {
  };

  // useEffect(() => {
  //   // Good!
  //   // setLoginLoading(openLoginRegisterDialog)
  //   setVisibleLoginRegisterDialog(openLoginRegisterDialog)
  //   console.log('openLoginRegisterDialog', openLoginRegisterDialog)
  // }, [openLoginRegisterDialog]);

  const handleChangeLang = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleSubmit = (event) => {

    handleLogin();
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   console.log('33333333')
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };

  const showProfileDrawer = () => {
    // setVisibleDrawer(true)
  };

  const onCloseProfileDrawer = () => {
    setVisibleDrawer(true);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setIsAuthorize(false);
    // history.push('/')
  };

  const goToProfile = () =>{
    if(currentUser.userRoleId == 2 && currentUser.bankId){
      history.push("/bank");
    }
    setInProfileMOde(true)
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordObject, setPasswordObject] = useState({
    currentPass: '',
    newPass: '',
    reNewPass: '',
    loading: false
  });

  const showModal = () => {
    setPasswordObject({...passwordObject, ['currentPass']: '', ['newPass']: '', ['reNewPass']: '', ['loading']: false})
    setIsModalVisible(true);
  };

  const handleOk = async () => {

    if(!(/[0-9]/.test(passwordObject?.newPass))
          || !(/[A-Z]/.test(passwordObject?.newPass))
          || passwordObject.newPass?.length < 8){
      message.error("პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან, შეიცავდეს მინიმუმ ერთი ციფრს და ერთ დიდ ასოს",9);
      return;
    }

    if(!passwordObject.currentPass || !passwordObject.newPass || !passwordObject.reNewPass){
      message.error('შეიყვანეთ პაროლი');
      return;
    }
    if(passwordObject.newPass != passwordObject.reNewPass){
      message.error('განმეორებული პაროლი არ ემთხვევა ახალს');
      return;
    }
    setPasswordObject({...passwordObject, ['loading']: true})
    let newOb = {
      id: currentUser.id,
      password: passwordObject.currentPass,
      newPassword: passwordObject.newPass
    }
    var result = await axios.post(
      // https://weblive.com.ge
      constants.API_PREFIX +`/api/account/changePassword`,newOb
      // `https://localhost:44314/api/account`,user
      // {
      //   params: { ...user },
      // }
    );
    setPasswordObject({...passwordObject, ['loading']: false})
    if(result.data.isSuccess){
      message.success('პაროლი წარმატებით შეიცვალა');
    }else{
      message.error(result.data.meessage);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangePass = (e) => {
    setPasswordObject({...passwordObject, [e.target.name]: e.target.value})
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={goToProfile}>პროფილი</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={showModal}>პაროლის შეცვლა</a>
      </Menu.Item>
      <Menu.Item key="2" onClick={logOut}>
        <a>გასვლა</a>
      </Menu.Item>
      {/* <Menu.Divider /> */}
    </Menu>
  );

  useEffect(() => {
    // Good!

    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))
    setCurrentUser(us);
  }, []);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    // if (e.charCode === 13) {
    //   if (!user.userName || !user.password) {
    //     return;
    //   }
    //   // handleLogin();
    // }
  };

  const sendSms = async () => {
    if (!user?.phoneNumber) {
      message.error("მიუთითეთ მობილურის ნომერი ! ");
      return;
    }
    if(!(/[0-9]/.test(user?.password)) || !(/[A-Z]/.test(user?.password)) || user?.password?.length < 8){
      message.error("პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან, შეიცავდეს მინიმუმ ერთი ციფრს და ერთ დიდ ასოს",9);
      return;
    }

    if (user?.password != user?.rePassword) {
      message.error("პაროლი და დასტური უნდა ემთხვეოდეს ერთმანეთს");
      return;
    }
    setSendSmsLoading(true)
    var result = await axios.post(
      // https://weblive.com.ge
      constants.API_PREFIX +`/api/account`,user
      // `https://localhost:44314/api/account`,user
      // {
      //   params: { ...user },
      // }
    );

    setSendSmsLoading(false)

    if(result.data.isSuccess){
      message.success('შეტყობინება წარმატებით გაიგზავნა');
    }
    else{
      message.error(result.data.message);
    }
  }

  const handleLogin = async () => {
    if (!user?.userName || !user?.password) {
      setValidated(true);
      return;
    }
    setLoginLoading(true);
    var result = await axios.get(
      constants.API_PREFIX +`/api/account/authorize`,
      {
        params: { userName:user.userName, password: user.password },
      }
    );
    if (result.data.token) {
      // message.success(result.data.meessage);
      localStorage.setItem("user", JSON.stringify(result.data));
      setVisibleLoginRegisterDialog(false);
      setIsAuthorize(true);
      setCurrentUser(result.data);
      setUser({ ...user, userName: "", password: "" });
      setValidated(false);

      if(result.data.userRoleId == 2){
        history.push('/bank')
      }
    } else {
      message.error("მომხმარებელი ან პაროლი არასწორია");
    }
    setLoginLoading(false);
  };

  const onClickRegister = async (event) => {
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (user?.password != user?.rePassword) {
      message.error("პაროლი და დასტური უნდა ემთხვეოდეს ერთმანეთს");
      return;
    }

    if(!(/[0-9]/.test(user?.password)) || !(/[A-Z]/.test(user?.password)) || user?.password?.length < 8){
      message.error("პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან, შეიცავდეს მინიმუმ ერთი ციფრს და ერთ დიდ ასოს",9);
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    // console.log('valdiate', Object.entries(user))
    // var result  = await axios.post('https://avtandil-002-site2.ftempurl.com/api/Registration', user)
    setRegisterLoading(true);
    // var result = await axios.get(`https://weblive.com.ge/api/account/${user?.smsCode}/${user?.userName}/${user?.password}`);//https://weblive.com.ge
    var result = await axios.get(constants.API_PREFIX +`/api/account/checkRegistation`,{
      params:{
        smsCode: user?.smsCode,
        userName: user?.userName,
        password: user?.password,
      }
    });//https://weblive.com.ge
    // var result = await axios.get(constants.API_PREFIX +`/api/account/${user?.smsCode}/${user?.userName}/${user?.password}`);//https://weblive.com.ge
    if (result.data.isSuccess) {
      message.success("რეგისტრაცია წარმატებით დასრულდა, გაიარეთ ავტორიზაცია", 8);
      setVisibleLoginRegisterDialog(false);
      setRegisterLoading(false);
      setUser({
        ...user,
        userName: "",
        password: "",
        phoneNumber: "",
        rePassword: "",
        email: "",
        name: "",
        lastName: "",
        personalId: "",
        birthDate: "",
        address: "",
      });
      setValidated(false);
    } else {
      message.error(result.data.meessage);
      setRegisterLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (date, dateString) => {
    setUser({ ...user, ["birthDate"]: dateString });
  };

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const registerFormValidate = () => {
  };

  const onDialog = (activeTab) => {
    // setUser(null);
    // setTest(777777);
    setActiveTab(activeTab)
    setVisibleLoginRegisterDialog(true);
  };

  const [isResetPassModalVisible, setIsPassResetModalVisible] = useState(false);

  const showResetPassModal = () => {
    setVisibleLoginRegisterDialog(false)
    setIsPassResetModalVisible(true);
  };

  const handleOkResetPass = async () => {
    setLoginLoading(true)
    var result = await axios.post(
      constants.API_PREFIX +`/api/account/recoveryPassword/${user.userName}/${user.phoneNumber}`
      // {
      //   params: { ...user },
      // }
    );
    setLoginLoading(false)
    if (result.data.isSuccess) {
      message.success(result.data.meessage + ', დროებითი პაროლი გამოიგზავნა მითითებულ ნიომერზე ', 10)
      setIsPassResetModalVisible(false);
    }
    else{
      message.error(result.data.meessage)
    }


  };

  const handleCancelResetPass = () => {
    setIsPassResetModalVisible(false);
  };



  const scrollTo = (id) => {
    setInProfileMOde(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    setVisibility(false);
  };

  const MenuItem = () => {


    return (
      <Fragment>
        <div style={{ display: "flex" }}>
          <div>
            <S.CustomNavLinkSmall onClick={() => scrollTo("intro")}>
              <S.Span style={{fontSize:18}}>{t("Home")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("products")}>
              <S.Span style={{fontSize:18}}>{t("Product")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
              <S.Span style={{fontSize:18}}>{t("HowItWorks")}</S.Span>
            </S.CustomNavLinkSmall>
            {/* <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
              <S.Span>{t("LoanCalculator")}</S.Span>
            </S.CustomNavLinkSmall> */}
            <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
              <S.Span style={{fontSize:18}}>{t("About")}</S.Span>
            </S.CustomNavLinkSmall>
            {/* <S.CustomNavLinkSmall onClick={() => scrollTo("team")}>
            <S.Span>{t("გუნდი")}</S.Span>
          </S.CustomNavLinkSmall> */}
            {/* <S.CustomNavLinkSmall onClick={() => scrollTo("contact")}>
              <S.Span>{t("Contact")}</S.Span>
            </S.CustomNavLinkSmall> */}
            <S.CustomNavLinkSmall style={{ width: "10px", marginTop:30 }}>
              <S.Span>
                {/* {isAuthorize ? (
                 null
                ) : (
                  <Button onClick={() => onDialog(1)} >
                    {t("SignIn")}
                  </Button>
                )} */}
              </S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall style={{ width: "100px", marginRight: 150 }}>
              <S.Span>
                {isAuthorize ? (
                  <Dropdown overlay={menu}>
                    <div>
                      {currentUser?.name}{" "}
                      <UserOutlined
                        style={{
                          fontSize: "30px",
                          marginTop: "14px",
                          color: "#08c",
                        }}
                      />
                    </div>
                  </Dropdown>
                ) : (
                  <div style={{display: 'flex'}}>
                    <span 
                    onClick={() => onDialog(1)}
                    style={{marginRight: 12,fontSize: 20,fontWeight: 1200, color: '#ff6d01',
                    border: 'solid',
                    borderRadius: '25% 10%',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    }}> 
                    <span style={{color:'#2e186a'}}>{t("SignIn")}</span></span>
                    {/* <span style={{marginRight: 4, color:'#ff6d01'}}>/ </span> */}
                    <span
                    onClick={() => onDialog(2)}
                    style={{marginRight: 18,fontSize: 20,fontWeight: 1200, color: '#ff6d01',
                   border: 'solid',
                   borderRadius: '25% 10%',
                   paddingTop: 5,
                    paddingBottom: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    
                   }}>
                          <span style={{color:'#2e186a',display: 'inline-block',
                    minWidth: '80px' }}> {t("SignUp")} </span></span>
                    
                  </div>
                  // <Button onClick={() => onDialog(2)} style={{margin:40}}>
                  //   {t("SignUp")}
                  // </Button>
                )}
              </S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall>
              <Radio.Group onChange={handleChangeLang} value={language}>
                <Radio.Button value="ge">ქარ</Radio.Button>
                <Radio.Button value="en">Eng</Radio.Button>
              </Radio.Group>
              {/* <S.Select>
                <S.LangSelect
                  onChange={handleChangeLang}
                  value={i18n.language}
                  id="select-lang"
                >
                  <option value="ge">ქართული</option>
                  <option value="en">English</option>
                </S.LangSelect>
              </S.Select> */}
            </S.CustomNavLinkSmall>
          </div>

          <div style={{ marginTop: "15px" }}>
            {/* <S.CustomNavLinkSmall >
              <S.Select>
                <S.LangSelect
                  onChange={handleChangeLang}
                  value={i18n.language}
                  id="select-lang"
                >
                  <option value="ge">ქართული</option>
                  <option value="en">English</option>
                </S.LangSelect>
              </S.Select>
            </S.CustomNavLinkSmall> */}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <S.Header
      style={{
        position: "fixed",
        width: "100%",
        background: "#f3f4f5",
        zIndex: 100,
      }}
    >

      <LoginModal
      visibleLoginRegisterDialog={visibleLoginRegisterDialog}
      setVisibleLoginRegisterDialog={setVisibleLoginRegisterDialog}
      activeTab = {activeTab}
      setInProfileMOde={setInProfileMOde}
      isAuthorize={isAuthorize}
      setIsAuthorize={setIsAuthorize}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}/>
{/*
      <Modal cancelText="დახურვა" okText="დადასტურება" confirmLoading={passwordObject.loading} title="პაროლის ცვლილება" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={passwordObject?.currentPass} name="currentPass" onChange={handleChangePass} placeholder="მიმდინარე პაროლი" type="password"/>
        <Input value={passwordObject?.newPass} name="newPass" onChange={handleChangePass} placeholder="ახალი პაროლი" type="password" style={{marginTop: 10, marginBottom: 10}}/>
        <Input value={passwordObject?.reNewPass} name="reNewPass" onChange={handleChangePass} placeholder="გაიმეორეთ ახალი პაროლი" type="password"/>
      </Modal>

      <Modal width={800} cancelText="დახურვა" okText="აღდგენა" confirmLoading={loginLoading} title="პაროლის აღდგენა"
      visible={isResetPassModalVisible} onOk={handleOkResetPass} onCancel={handleCancelResetPass}>
      <Row>
                <Form.Label column lg={3}>
                 პირადი ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    placeholder="პირადი ნომერი"
                    value={user?.userName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ პირადი ნომერი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  მობილურის ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    type="text"
                    placeholder="მობილურის ნომერი"
                    required
                    name="phoneNumber"
                    value={user?.phoneNumber}
                    onChange={handleChangeInput}
                    onKeyPress={handleKeypress}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ  მობილურის ნომერი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
      </Modal>


      <Modal
        visible={visibleLoginRegisterDialog}
        onCancel={() => setVisibleLoginRegisterDialog(false)}
        footer={null}
        width={800}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="ავტორიზაცია" key="1">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Label column lg={3}>
                 პირადი ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    placeholder="პირადი ნომერი"
                    value={user?.userName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ პირადი ნომერი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  პაროლი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    type="password"
                    placeholder="პაროლი"
                    required
                    name="password"
                    value={user?.password}
                    onChange={handleChangeInput}
                    onKeyPress={handleKeypress}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ პაროლი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}></Form.Label>
                <Col lg={12}>
                  <AntdButton htmlType="submit" loading={loginLoading}>
                    შესვლა
                  </AntdButton>
                  <AntdButton type="link" onClick={showResetPassModal}>
                    პაროლის აღდგენა
                  </AntdButton>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="რეგისტრაცია" key="2">
            <Form noValidate validated={validated} onSubmit={onClickRegister}>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                 პირადი ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    placeholder="პირადი ნომერი"
                    value={user?.userName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ პირადი ნომერი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  პაროლი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="პაროლი"
                    value={user?.password}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    პაროლი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  გაიმეორეთ პაროლი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="password"
                    name="rePassword"
                    placeholder="გაიმეორეთ პაროლი"
                    value={user?.rePassword}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    გაიმეორეთ პაროლი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  ელ. ფოსტა
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="email"
                    placeholder=" ელ. ფოსტა"
                    value={user?.email}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ ელ. ფოსტა.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  სახელი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="სახელი"
                    value={user?.name}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ სახელი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  გვარი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    placeholder="გვარი"
                    value={user?.lastName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ გვარი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Form.Label column lg={3}>
                  მობილურის ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Row>
                    <Col lg={16}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="მობილურის ნომერი"
                        name="phoneNumber"
                        value={user?.phoneNumber}
                        onChange={handleChangeInput}
                      />
                      <Form.Control.Feedback type="invalid">
                        მიუთითეთ სახელი.
                      </Form.Control.Feedback>
                    </Col>
                    <Col lg={1}>

                    </Col>
                    <Col lg={7}>
                      <AntdButton type="primary" onClick={sendSms} loading={sendSmsLoading}>
                        სმს-ის გაგზავნა
                      </AntdButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br/>
              <Row>
                <Form.Label column lg={3}>
                  სმს კოდი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="number"
                    name="smsCode"
                    placeholder=" სმს კოდი"
                    value={user?.smsCode}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ  სმს კოდი.
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}></Form.Label>
                <Col lg={12}>
                  <AntdButton htmlType="submit" loading={registerLoading}>
                    რეგისტრაცია
                  </AntdButton>
                </Col>
              </Row>
              <br></br> <br></br> <br></br>
            </Form>
          </TabPane>
        </Tabs>
      </Modal> */}

      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            {/* <SvgIcon src="logo.svg" /> */}
            <div style={{ marginLeft: 20,marginTop:5 }} onClick={() => scrollTo("intro")}>
              <SvgIcon src="ranko.svg" height={60} width={50} />
            </div>
            {/* <SvgIcon src="logo1.svg" /> */}
            {/* <img src="../../public/img/svg/12.png" /> */}
          </S.LogoContainer>
          <S.NotHidden>
            <MenuItem />
          </S.NotHidden>
          <S.Burger onClick={showDrawer}>
            <S.Outline />
          </S.Burger>
        </Row>
        <CSSTransition
          in={!isSmallScreen || isNavVisible}
          timeout={350}
          classNames="NavAnimation"
          unmountOnExit
        >
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "2.5rem" }}>
              <S.Label onClick={onClose}>
                <Col span={12}>
                  <S.Menu>Menu</S.Menu>
                </Col>
                <Col span={12}>
                  <S.Outline padding="true" />
                </Col>
              </S.Label>
            </Col>
            <MenuItem />
          </Drawer>
        </CSSTransition>
      </S.Container>
     <div style={{borderTop: '1px solid #ccc'}}></div>
    </S.Header>
  );
};

export default withTranslation()(Header);
