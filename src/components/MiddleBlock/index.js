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
          <section id="pricing" className="bg-white"  id="products">
            <div className="container">
              <h2 className="text-center">პროდუქტები</h2>
              <div className="spacer spacer-line border-primary">&nbsp;</div>
              <div className="spacer">&nbsp;</div>
              <div className="row">
                <div className="col-md-3">
                  <div className="pricing-table">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-info-hover text-white">
                        სამომხმარებლო
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-info">
                      <p className="title-font">
                        <span className="pricing-period text-white mr-1">From</span>
                        <span className="pricing-currency text-white">$</span>
                        <span className="pricing-price text-white">1.99</span>
                        <span className="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong>იმოგზაურე</strong>
                        </li>
                        <li>
                          <strong>
                            შეიძინე
                          </strong>
                        </li>
                        <li>
                          <strong>

                          </strong>
                        </li>
                        <li>
                          <strong>24/7 Support</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                        <span className="btn btn-info" onClick={() => onDialog(1)}>
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
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="inputEmail4">Email</label>
                          <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="inputPassword4">Password</label>
                          <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                      </div>
                      <div className="form-group">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
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
                          <input className="form-check-input" type="checkbox" id="gridCheck" />
                          <label className="form-check-label" for="gridCheck">
                            Check me out
      </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">გაგზავნა</button>
                    </form>
                    {/* <Form>
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
                    </Form> */}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
                <div className="col-md-3">
                  <div className="pricing-table bg-lightgrey">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-primary-hover text-white">
                        იპოთეკური
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-primary">
                      <p className="title-font">
                        <span className="pricing-period text-white mr-1">From</span>
                        <span className="pricing-currency text-white">$</span>
                        <span className="pricing-price text-white">5.99</span>
                        <span className="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        
                        <li>
                          <strong>რემონტი</strong>
                        </li>
                        <li>
                          <strong>
                            მშენებლობა
                          </strong>
                        </li>
                        <li>
                          <strong>სახლის  შეძენა</strong>
                        </li>
                        <li>
                          <strong>მიწის ნაკვეთის შეძენა</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                      <span className="btn btn-primary" onClick={() => onDialog(1)}>
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="pricing-table">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-info-hover text-white">
                        ბიზნეს სესხი
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-info">
                      <p className="title-font">
                        <span className="pricing-period text-white mr-1">From</span>
                        <span className="pricing-currency text-white">$</span>
                        <span className="pricing-price text-white">9.99</span>
                        <span className="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong>
                            
                          </strong>
                        </li>
                        <li>
                          <strong> ძირითადი საშუალებების შესაძენად
</strong>
                        </li>
                        <li>
                          <strong>საბრუნავი საშუალებების გასაზრდელად</strong>
                        </li>
                        <li>
                          <strong> ახალი პროექტის დასაფინანსებლად</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                      <span className="btn btn-info" onClick={() => onDialog(1)}>
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="pricing-table bg-lightgrey">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-primary-hover text-white">
                        აგრო
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-primary">
                      <p className="title-font">
                        <span className="pricing-period text-white mr-1">From</span>
                        <span className="pricing-currency text-white">$</span>
                        <span className="pricing-price text-white">5.99</span>
                        <span className="pricing-period text-white">/ Mo.</span>
                      </p>
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong>სოფლის მეურნეობისთვის</strong>
                        </li>
                        <li>
                          <strong>ტექნიკის შესაძენად</strong>
                        </li>
                        <li>
                          <strong>
                           ფერმის გაფართოებისთვის
                          </strong>
                        </li>
                        <li>
                          <strong>გადამამუშავებელი წარმოების მოსაწყობად1</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                      <span className="btn btn-primary" onClick={() => onDialog(1)}>
                          <span>განაცხადის შევსება</span>
                        </span>
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
