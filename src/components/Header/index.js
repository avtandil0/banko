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
  DatePicker,
  Checkbox,
  Tabs,
  Dropdown,
} from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import * as S from "./styles";
const { Option } = Select;
const { TabPane } = Tabs;

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
const MySwal = withReactContent(Swal);

const Header = ({ t, setInProfileMOde, isAuthorize, setIsAuthorize }) => {
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

  const onFinish = () => {
    console.log("Received values of form: ");
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

    if(user?.password != user?.rePassword){
      message.error("პაროლი და დასტური უნდა ემთხვეოდეს ერთმანეთს");
      return;
    }

    if (form.checkValidity() === false) {
      console.log("11111",form);
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
      setUser({ ...user, userName: "", password: "", phoneNumber: "", rePassword: "", email: "", name: "", lastName: "", personalId: "", birthDate: "", address: "" });
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
        <div>
          <S.CustomNavLinkSmall onClick={() => scrollTo("intro")}>
            <S.Span>{t("მთავარი")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("products")}>
            <S.Span>{t("პროდუქტი")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("about")}>
            <S.Span>{t("როგორ მუშაობს")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
            <S.Span>{t("რაკეტა")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
            <S.Span>{t("ჩვენს შესახებ")}</S.Span>
          </S.CustomNavLinkSmall>
          {/* <S.CustomNavLinkSmall onClick={() => scrollTo("team")}>
            <S.Span>{t("გუნდი")}</S.Span>
          </S.CustomNavLinkSmall> */}
          <S.CustomNavLinkSmall onClick={() => scrollTo("contact")}>
            <S.Span>{t("კონტაქტი")}</S.Span>
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
                <Button onClick={onDialog}>{t("ავტორიზაცია")}</Button>
              )}
            </S.Span>
          </S.CustomNavLinkSmall>
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
            {/* <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              // initialValues={{ userNameLabel: '77' }}
            >
              {/* <Form.Item
                label="მობილურის ნომერი"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ, შეიყვანოთ მობილურის ნომერი!",
                  },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={user?.phoneNumber}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="მომხმარებლის სახელი"
                name="userNameLabel"
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ, შეიყვანოთ მომხმარებლის სახელი!",
                  },
                ]}
              >
                <Input
                  name="userName"
                  value={user?.userName}
                  onChange={handleChangeInput}
                />

              </Form.Item>

              <Form.Item
                label="პაროლი"
                name="passwordLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ პაროლი!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  value={user?.password}
                  onChange={handleChangeInput}
                  onKeyPress={handleKeypress}
                />
              </Form.Item>



              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <AntdButton
                  type="primary"
                  onClick={handleLogin}
                  loading={loginLoading}
                  disabled={!user?.userName || !user?.password}
                >
                  შესვლა
                </AntdButton>
              </Form.Item>
            </Form> */}
          </TabPane>
          <TabPane tab="რეგისტრაცია" key="2">
            <Form noValidate validated={validated} onSubmit={onClickRegister}>
              <Row>
                <Form.Label column lg={3}>
                  მობილურის ნომერი
                </Form.Label>
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
              </Row>
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
                    placeholder="პაროლი"
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
                  სახლი
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    name="name"
                    placeholder="სახლი"
                    value={user?.name}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ სახლი.
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

              <br></br>
              <Row>
                <Form.Label column lg={3}></Form.Label>
                <Col lg={12}>
                  <AntdButton htmlType="submit"  loading={registerLoading}>
                    რეგისტრაცია
                  </AntdButton>
                </Col>
              </Row>
            </Form>
            {/* <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              initialValues={{ remember: true }}
              onFinish={onClickRegister}
            >
              <Form.Item
                label="მობილურის ნომერი"
                name="phoneNumberlabel"
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ, შეიყვანოთ მობილურის ნომერი!",
                  },
                ]}
              >
                <Input
                  name="phoneNumber"
                  value={user?.phoneNumber}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="მომხმარებლის სახელი"
                name="userNameLabel"
                rules={[
                  {
                    required: true,
                    message: "გთხოვთ, შეიყვანოთ მომხმარებლის სახელი!",
                  },
                ]}
              >
                <Input
                  name="userName"
                  value={user?.userName}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="პაროლი"
                name="passwordLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ პაროლი!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  value={user?.password}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="ელ. ფოსტა"
                name="mailLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ ელ. ფოსტა!",
                  },
                ]}
              >
                <Input
                  name="mail"
                  value={user?.mail}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="სახლი"
                name="nameLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ სახელი!",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={user?.name}
                  onChange={handleChangeInput}
                />
              </Form.Item>
              <Form.Item
                label="გვარი"
                name="lastNameLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ გვარი!",
                  },
                ]}
              >
                <Input
                  name="lastName"
                  value={user?.lastName}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item
                label="პირადი ნომერი"
                name="personalNumberLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ პირადი ნომერი!",
                  },
                ]}
              >
                <Input
                  name="personalNumber"
                  value={user?.personalNumber}
                  onChange={handleChangeInput}
                />
              </Form.Item>

              <Form.Item
                label="დაბადების თარიღი"
                name="birthDateLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ დაბადების თარიღი!",
                  },
                ]}
              >
                <DatePicker
                  value={user?.birthDate}
                  onChange={handleChangeDate}
                />
              </Form.Item>

              <Form.Item
                label="მისამართი"
                name="addressLabel"
                rules={[
                  {
                    required: true,
                    message: "შეიყვანეთ მისამართი!",
                  },
                ]}
              >
                <Input
                  name="address"
                  value={user?.address}
                  onChange={handleChangeInput}
                />
              </Form.Item>


              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <AntdButton
                  loading={registerLoading}
                  type="primary"
                  htmlType="submit"
                  // onClick={onClickRegister}
                  htmlType="submit"

                >
                  რეგისტრაცია
                </AntdButton>
              </Form.Item>
            </Form> */}
          </TabPane>
        </Tabs>
      </Modal>

      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" />
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
