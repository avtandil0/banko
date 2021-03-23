import { useState, Fragment, lazy, useEffect } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import * as S from "./styles";
import "./index.css"; // Tell webpack that Button.js uses these styles

const Button = lazy(() => import("../../common/Button"));

const MiddleBlock = ({ title, content, button, t }) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onDialog = (index) => {
    switch (index) {
      case 1:
        setShow1(true);
        break;
      case 2:
        setShow2(true);
        break;
      case 1:
        setShow3(true);
        break;
      case 1:
        setShow4(true);
        break;

      default:
        break;
    }
  };
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <section id="pricing" class="bg-white">
            <div class="container">
              <h2 class="text-center">პროდუქტები</h2>
              <div class="spacer spacer-line border-primary">&nbsp;</div>
              <div class="spacer">&nbsp;</div>
              <div class="row">
                <div class="col-md-3">
                  <div class="pricing-table">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-info-hover text-white">
                        სამომხმარებლო
                      </h5>
                    </div>
                    <div class="pricing-table-price text-center bg-info">
                      <p class="title-font">
                        <span class="pricing-period text-white mr-1">From</span>
                        <span class="pricing-currency text-white">$</span>
                        <span class="pricing-price text-white">1.99</span>
                        <span class="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div class="pricing-table-content">
                      <ul>
                        <li>
                          <strong>Basic Package</strong>
                        </li>
                        <li>
                          <strong>
                            <del>Professional Features</del>
                          </strong>
                        </li>
                        <li>
                          <strong>
                            <del>Extra Options</del>
                          </strong>
                        </li>
                        <li>
                          <strong>24/7 Support</strong>
                        </li>
                      </ul>
                      <div class="pricing-table-button">
                        <span class="btn btn-info" onClick={() => onDialog(1)}>
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* სამომხმარებლოს მოდალი */}
                <Modal show={show1} onHide={() => setShow1(false)} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>განაცხადის შევსება</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                      </Form.Group>

                      <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                      </Form.Group>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>State</Form.Label>
                          <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Zip</Form.Label>
                          <Form.Control />
                        </Form.Group>
                      </Form.Row>

                      <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
                <div class="col-md-3">
                  <div class="pricing-table bg-lightgrey">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-primary-hover text-white">
                        იპოთეკური
                      </h5>
                    </div>
                    <div class="pricing-table-price text-center bg-primary">
                      <p class="title-font">
                        <span class="pricing-period text-white mr-1">From</span>
                        <span class="pricing-currency text-white">$</span>
                        <span class="pricing-price text-white">5.99</span>
                        <span class="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div class="pricing-table-content">
                      <ul>
                        <li>
                          <strong>Management Package</strong>
                        </li>
                        <li>
                          <strong>Professional Features</strong>
                        </li>
                        <li>
                          <strong>
                            <del>Extra Options</del>
                          </strong>
                        </li>
                        <li>
                          <strong>24/7 Support</strong>
                        </li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-primary">
                          <span>Request Quote</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="pricing-table">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-info-hover text-white">
                        ბიზნეს სესხი
                      </h5>
                    </div>
                    <div class="pricing-table-price text-center bg-info">
                      <p class="title-font">
                        <span class="pricing-period text-white mr-1">From</span>
                        <span class="pricing-currency text-white">$</span>
                        <span class="pricing-price text-white">9.99</span>
                        <span class="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div class="pricing-table-content">
                      <ul>
                        <li>
                          <strong>Business Package</strong>
                        </li>
                        <li>
                          <strong>Professional Features</strong>
                        </li>
                        <li>
                          <strong>Extra Options</strong>
                        </li>
                        <li>
                          <strong>24/7 Support</strong>
                        </li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-info">
                          <span>Request Quote</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="pricing-table bg-lightgrey">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-primary-hover text-white">
                        აგრო
                      </h5>
                    </div>
                    <div class="pricing-table-price text-center bg-primary">
                      <p class="title-font">
                        <span class="pricing-period text-white mr-1">From</span>
                        <span class="pricing-currency text-white">$</span>
                        <span class="pricing-price text-white">5.99</span>
                        <span class="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div class="pricing-table-content">
                      <ul>
                        <li>
                          <strong>Management Package</strong>
                        </li>
                        <li>
                          <strong>Professional Features</strong>
                        </li>
                        <li>
                          <strong>
                            <del>Extra Options</del>
                          </strong>
                        </li>
                        <li>
                          <strong>24/7 Support</strong>
                        </li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-primary">
                          <span>Request Quote</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <S.ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <S.Content>{t(content)}</S.Content>
              {button ? (
                <Button
                  name="submit"
                  type="submit"
                  onClick={() => scrollTo("mission")}
                >
                  {t(button)}
                </Button>
              ) : (
                ""
              )}
            </Col>
          </S.ContentWrapper> */}
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(MiddleBlock);
