import { useState, Fragment, lazy, useEffect } from "react";
import { Row, Col, Drawer } from "antd";
import { CSSTransition } from "react-transition-group";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import Sonnet from 'react-bootstrap/Sonnet';



import * as S from "./styles";
import 'bootstrap/dist/css/bootstrap.min.css';


const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Button = lazy(() => import("../../common/Button"));
const MySwal = withReactContent(Swal)

const Header = ({ t, onChaneMode }) => {
  const history = useHistory();

  const [isNavVisible] = useState(false);
  const [isSmallScreen] = useState(false);
  const [visible, setVisibility] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Good!
    console.log('111')
  }, []);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const onDialog = () => {
    setShow(true)
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

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      setVisibility(false);
    };
    return (
      <Fragment >
        <div >
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>სისტემაში შესვლა</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="ავტორიზაცია">
                  <br></br>
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
                </Tab>
                <Tab eventKey="register" title="რეგისტრაცია">
                  <br></br>
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
                        <Form.Control  placeholder="555 555 555" />
                      </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                      <Form.Check type="checkbox" label="გავეცანი პირობებს" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      რეგისტრაცია
                    </Button>

                  </Form>
                </Tab>

              </Tabs>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
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
          {/* <S.CustomNavLinkSmall onClick={() => scrollTo("mission")}>
            <S.Span>{t("3333333333")}</S.Span>
          </S.CustomNavLinkSmall> */}
          <S.CustomNavLinkSmall onClick={() => scrollTo("product")}>
            <S.Span>{t("ჩვენს შესახებ")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("team")}>
            <S.Span>{t("გუნდი")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall onClick={() => scrollTo("contact")}>
            <S.Span>{t("კონტაქტი")}</S.Span>
          </S.CustomNavLinkSmall>
          <S.CustomNavLinkSmall
            style={{ width: "180px" }}
            onClick={onDialog}
          >
            <S.Span>
              <Button>{t("რეგისტრაცია")}</Button>
            </S.Span>
          </S.CustomNavLinkSmall>
        </div>

      </Fragment>
    );
  };

  return (
    <S.Header style={{ position: 'fixed', width: '100%', background: '#fff', zIndex: 100 }}>
      <S.Container>
        <Row type="flex" justify="space-between" gutter={20}>
          <S.LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" />
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
