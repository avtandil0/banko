import React, { useState, Fragment, lazy, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "bootstrap/dist/css/bootstrap.min.css";

// import Sonnet from 'react-bootstrap/Sonnet';
// import { Menu, Dropdown } from "antd";
import { Form, InputGroup } from "react-bootstrap";

import axios from "axios";

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
  const [visibleLoginRegisterDialog, setVisibleLoginRegisterDialog] =
    useState(false);
  const [formLayout, setFormLayout] = useState("horizontal");

  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const [test, setTest] = useState(444444);
  const [currentUser, setCurrentUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [language, setLanguage] = useState("ge");

  const onFinish = () => {
    console.log("Received values of form: ");
  };

  // useEffect(() => {
  //   // Good!
  //   // setLoginLoading(openLoginRegisterDialog)
  //   setVisibleLoginRegisterDialog(openLoginRegisterDialog)
  //   console.log('openLoginRegisterDialog', openLoginRegisterDialog)
  // }, [openLoginRegisterDialog]);

  const handleChangeLang = (event) => {
    console.log("i18n", i18n, event);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("bootsrtap sumit", user);

    handleLogin();
    const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   console.log('33333333')
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    console.log("22222222222");
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
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => setInProfileMOde(true)}>პროფილი</a>
      </Menu.Item>
      <Menu.Item key="1" onClick={logOut}>
        <a>გასვლა</a>
      </Menu.Item>
      {/* <Menu.Divider /> */}
    </Menu>
  );

  useEffect(() => {
    // Good!
    console.log("111111111111111111");

    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))
    setCurrentUser(us);
  }, []);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    console.log("key code", e.keyCode, e);
    // if (e.charCode === 13) {
    //   if (!user.userName || !user.password) {
    //     return;
    //   }
    //   // handleLogin();
    // }
  };

  const sendSms = async () => {
    var result = await axios.post(
      `https://localhost:44314/api/account`,user
      // {
      //   params: { ...user },
      // }
    );

    console.log('result',result)
  }

  const handleLogin = async () => {
    console.log("user", user);
    if (!user?.userName || !user?.password) {
      setValidated(true);
      return;
    }
    setLoginLoading(true);
    var result = await axios.get(
      `https://weblive.com.ge/api/account/${user.userName}/${user.password}`
      // {
      //   params: { ...user },
      // }
    );
    console.log("result", result);
    if (result.data.token) {
      // message.success(result.data.meessage);
      localStorage.setItem("user", JSON.stringify(result.data));
      setVisibleLoginRegisterDialog(false);
      setIsAuthorize(true);
      setCurrentUser(result.data);
      setUser({ ...user, userName: "", password: "" });
      setValidated(false);
    } else {
      message.error("მომხმარებელი ან პაროლი არასწორია");
    }
    setLoginLoading(false);
    console.log("result ", result);
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

    if (form.checkValidity() === false) {
      console.log("11111", form);
      return;
    }

    console.log("aaaaaaa", user);
    // console.log('valdiate', Object.entries(user))
    // var result  = await axios.post('https://avtandil-002-site2.ftempurl.com/api/Registration', user)
    setRegisterLoading(true);
    var result = await axios.post("https://weblive.com.ge/api/account", user);
    if (result.data.isSuccess) {
      message.success(result.data.meessage);
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
    console.log("result ", result);
  };

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user", user);
  };

  const handleChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setUser({ ...user, ["birthDate"]: dateString });
  };

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const registerFormValidate = () => {
    console.log("valdiate", Object.entries(user));
  };

  const onDialog = () => {
    console.log("aaaaaa", user);
    // setUser(null);
    // setTest(777777);
    setVisibleLoginRegisterDialog(true);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      console.log("header setInProfileMOde", setInProfileMOde);
      setInProfileMOde(false);
      const element = document.getElementById(id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      setVisibility(false);
    };

    return (
      <Fragment>
        <div style={{ display: "flex" }}>
          <div>
            <S.CustomNavLinkSmall onClick={() => scrollTo("intro")}>
              <S.Span>{t("Home")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("products")}>
              <S.Span>{t("Product")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
              <S.Span>{t("HowItWorks")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
              <S.Span>{t("LoanCalculator")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
              <S.Span>{t("About")}</S.Span>
            </S.CustomNavLinkSmall>
            {/* <S.CustomNavLinkSmall onClick={() => scrollTo("team")}>
            <S.Span>{t("გუნდი")}</S.Span>
          </S.CustomNavLinkSmall> */}
            <S.CustomNavLinkSmall onClick={() => scrollTo("contact")}>
              <S.Span>{t("Contact")}</S.Span>
            </S.CustomNavLinkSmall>
            <S.CustomNavLinkSmall style={{ width: "180px" }}>
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
                  <Button onClick={onDialog}>{t("SignUp")}</Button>
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
        background: "#fff",
        zIndex: 100,
      }}
    >
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
                  მომხმარებლის სახელი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    placeholder="მომხმარებლის სახელი"
                    value={user?.userName}
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
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="რეგისტრაცია" key="2">
            <Form noValidate validated={validated} onSubmit={onClickRegister}>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  მომხმარებლის სახელი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="userName"
                    placeholder="მომხმარებლის სახელი"
                    value={user?.userName}
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
                  პირადი ნომერი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="personalId"
                    placeholder="პირადი ნომერი"
                    value={user?.personalId}
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
                  დაბადების თარიღი
                </Form.Label>
                <Col lg={16}>
                  {/* <Form.Control
                    required
                    type="text"
                    name="birthDate"
                    placeholder="მომხმარებლის სახელი"
                    value={user?.birthDate}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                  დაბადების თარიღი.
                  </Form.Control.Feedback> */}
                  <Form.Control
                    autoComplete="off"
                    required
                    type="date"
                    name="birthDate"
                    placeholder="დაბადების თარიღი"
                    value={user?.birthDate}
                    onChange={handleChangeInput}
                    isValid={user?.birthDate != null}
                  />
                </Col>
              </Row>
              <br></br>
              <Row>
                <Form.Label column lg={3}>
                  მისამართი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    placeholder="მისამართი"
                    value={user?.address}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ მისამართი.
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
                      <AntdButton type="primary" onClick={sendSms}>
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
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            {/* <SvgIcon src="logo.svg" /> */}
            <div style={{ marginLeft: 20, marginBottom: 5 }}>
              <SvgIcon src="logo1.svg" height={80} width={60} />
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
    </S.Header>
  );
};

export default withTranslation()(Header);
