import React, { useState, Fragment, lazy, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "bootstrap/dist/css/bootstrap.min.css";

// import Sonnet from 'react-bootstrap/Sonnet';
import { Menu, Dropdown } from "antd";
import { Modal } from "react-bootstrap";

import {
  Button as AntdButton,
  Form,
  Input,
  Row,
  Col,
  Drawer,
  Select,
  DatePicker,
  Checkbox,
  Tabs,
} from "antd";

import { LockOutlined } from "@ant-design/icons";
import * as S from "./styles";
const { Option } = Select;
const { TabPane } = Tabs;

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
const MySwal = withReactContent(Swal);

const Header = ({ t, setInProfileMOde }) => {
  const history = useHistory();

  const [visibleProfileDialog, setVisibleProfileDialog] = useState(false);
  const [visibleLoginRegisterDialog, setVisibleLoginRegisterDialog] =
    useState(false);
  const [formLayout, setFormLayout] = useState("horizontal");

  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFinish = () => {
    console.log("Received values of form: ");
  };

  const showProfileDrawer = () => {
    // setVisibleDrawer(true)
  };

  const onCloseProfileDrawer = () => {
    setVisibleDrawer(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => setInProfileMOde(true)}>პროფილი</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>გასვლა</a>
      </Menu.Item>
      {/* <Menu.Divider /> */}
    </Menu>
  );

  useEffect(() => {
    // Good!
    console.log("111");
  }, []);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const onDialog = () => {
    console.log("aaaaaa");
    setVisibleLoginRegisterDialog(true);
    // MySwal.fire({
    //   title: 'Multiple inputs',
    //   width: '923px',
    //   html:'<input id="swal-input1" className="swal2-input" placeholder="test"> ' +
    //   '<input id="swal-input2" className="swal2-input">',
    //   focusConfirm: false,
    //   preConfirm: () => {
    //     return [
    //       document.getElementById('swal-input1').value,
    //       document.getElementById('swal-input2').value
    //     ]
    //   }
    // }).then(() => {
    //   return MySwal.fire(<p>Shorthand works too</p>)
    // })
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

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
        {/* <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        visible={visibleDrawer}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> */}
        {/* <Drawer
          title="პროფილი"
          width={720}
          onClose={onClose}
          visible={visibleDrawer}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <AntdButton onClick={() => setvisibleDrawer(false)} style={{ marginRight: 8 }}>
                დახურვა
              </AntdButton>
              <AntdButton onClick={() => setvisibleDrawer(false)} type="primary">
                შენახვა
              </AntdButton>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
              <Col span={12}><Form.Item label="სახელი">
                <Input placeholder="სახელი" />
              </Form.Item>
                <Form.Item label="გვარი">
                  <Input placeholder="გვარი" />
                </Form.Item>
                <Form.Item label="პირადი N">
                  <Input placeholder="პირადი N" />
                </Form.Item></Col>
              <Col span={12}>   <Form.Item label="მისამართი">
                <Input placeholder="მისამართი" />
              </Form.Item>
                <Form.Item label="ელ. ფოსტა">
                  <Input placeholder="ელ.ფოსტა" />
                </Form.Item>
                <Form.Item label="მობილური">
                  <Input placeholder="მობილური" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer> */}

        {/* <BModal
          show={visibleLoginRegisterDialog}
          size="lg"
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="ავტორიზაცია" key="1">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: "300px" }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <AntdButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                შესვლა
              </AntdButton>
            </Form.Item>
          </Form>
            </TabPane>
            <TabPane tab="რეგისტრაცია" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>


        </BModal> */}

        <div>
          <Modal size="lg">
            <Modal.Header closeButton>
              <Modal.Title>განაცხადის შევსება</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4">მოთხოვნილი თანხა</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="თანხა"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="form-group">
                <label for="inputAddress2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                  <label for="inputState">State</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label for="inputZip">Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  console.log("aaaaaaaaaaaa");
                  setVisibleLoginRegisterDialog(false);
                }}
              >
                გაგზავნა1111
              </button>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>

          <Modal
            show={visibleLoginRegisterDialog}
            onHide={() => setVisibleLoginRegisterDialog(false)}
            size="lg"
          >
            {/* <Modal.Header closeButton>
              <Modal.Title>სისტემაში შესვლა</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              <Tabs defaultActiveKey="1">
                <TabPane tab="ავტორიზაცია" key="1">
                  <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      label="მობილურის ნომერი"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "გთხოვთ, შეიყვანოთ მობილურის ნომერი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="პაროლი"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ პაროლი!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ offset: 8, span: 16 }}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <AntdButton type="primary" htmlType="submit">
                        შესვლა
                      </AntdButton>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="რეგისტრაცია" key="2">
                  <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      label="მობილურის ნომერი"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "გთხოვთ, შეიყვანოთ მობილურის ნომერი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="ელ. ფოსტა"
                      name="mail"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ ელ. ფოსტა!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="სახლი"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ სახელი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="გვარი"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ გვარი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="პირადი ნომერი"
                      name="personalNumber"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ პირადი ნომერი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="დაბადების თარიღი"
                      name="birthDate"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ დაბადების თარიღი!",
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item
                      label="მისამართი"
                      name="personalNumber"
                      rules={[
                        {
                          required: true,
                          message: "შეიყვანეთ მისამართი!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {/* <Form.Item
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ offset: 8, span: 16 }}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <AntdButton type="primary" htmlType="submit">
                        რეგისტრაცია
                      </AntdButton>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
              {/* <Tabs defaultActiveKey="1" >
                <TabPane tab="Tab 1" key="1">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>ელ. ფოსტა</Form.Label>
                      <Form.Control type="email" placeholder="ელ. ფოსტა" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>პაროლი</Form.Label>
                      <Form.Control type="password" placeholder="პაროლი" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="დამახსოვრება" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      შესვლა
                    </Button>
                  </Form>
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>ელ. ფოსტა</Form.Label>
                        <Form.Control type="email" placeholder="ელ. ფოსტა" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>სახელი</Form.Label>
                        <Form.Control type="text" placeholder="სახელი" />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>გვარი</Form.Label>
                        <Form.Control type="text" placeholder="გვარი" />
                      </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>მისამართი</Form.Label>
                      <Form.Control placeholder="მისამართი" />
                    </Form.Group>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>ქალაქი</Form.Label>
                        <Form.Control />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>სქესი</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                          <option>აირჩიეთ...</option>
                          <option>...</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>მობილური</Form.Label>
                        <Form.Control placeholder="555 555 555" />
                      </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="გავეცანი პირობებს" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      რეგისტრაცია
                    </Button>
                  </Form>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs> */}
            </Modal.Body>
          </Modal>

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
              <Button onClick={onDialog}>{t("შესვლა/რეგისტრაცია")}</Button>

              {/* <Dropdown overlay={menu}>
                <div>
                  Avto Zenaishvili{" "}
                  <UserOutlined
                    style={{
                      fontSize: "30px",
                      marginTop: "14px",
                      color: "#08c",
                    }}
                  />
                </div>
              </Dropdown> */}
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
