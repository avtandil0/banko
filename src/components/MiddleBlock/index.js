import { useState, Fragment, lazy, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  message,
  notification,
  Button as AntdButton,
  Modal as AntModal,
} from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import * as S from "./styles";
import "./index.css"; // Tell webpack that Button.js uses these styles
import axios from "axios";

const Button = lazy(() => import("../../common/Button"));
const SvgIcon = lazy(() => import("../../common/SvgIcon"));

const MiddleBlock = ({
  title,
  content,
  button,
  t,
  isAuthorize,
  setIsAuthorize,
  setOpenLoginRegisterDialog,
}) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  const [show1, setShow1] = useState(false);
  const [productType, setProductType] = useState(false);
  const [productTypeName, setProductTypeName] = useState("");
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [incomeSource, setIncomeSource] = useState([]);
  const [workExperiance, setWorkExperiance] = useState([]);
  const [statement, setStatement] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sentLoading, setSentLoading] = useState(false);

  useEffect(async () => {
    // Good!
    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))
    setCurrentUser(us);

    setStatement({ ...statement, userId: us?.id });
    console.log("currentUser", currentUser);

    var result1 = await axios.get(`https://weblive.com.ge/api/IncomeSource`);
    // console.log('result IncomeSource',result)
    setIncomeSource(result1.data);
    var result2 = await axios.get(`https://weblive.com.ge/api/WorkExperience`);
    console.log("result WorkExperience", result2);
    setWorkExperiance(result2.data);
  }, []);

  const handleChangeInput = (e) => {
    setStatement({ ...statement, [e.target.name]: e.target.value });
    console.log("statement", statement);
  };

  const sendStatement = async () => {
    console.log(statement);
    setSentLoading(true);
    var result = await axios.post(
      `https://weblive.com.ge/api/HomeSource`,
      statement
    );
    console.log("result WorkExperience", result);
    setSentLoading(false);
    setShow1(false);
    message.success(result.data.meessage);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onDialog = (index) => {
    if (!isAuthorize) {
      // message.warning('განცხადების შესატანად გაიარეთ ავტორიზაცია');
      // notification['info']({
      //   message: 'შეცდომა !',
      //   description:
      //     'განცხადების შესატანად გაიარეთ ავტორიზაცია.',
      //     placement: 'bottomRight'
      // });
      AntModal.warning({
        title: "შეცდომა",
        content: "განცხადების შესავსებად გაიარეთ ავტორიზაცია",
        oklButtonProps: { style: { display: "none" } },
      });
      console.log(777777);
      // setOpenLoginRegisterDialog(true)
      return;
    }
    console.log("productType", productType);
    setProductType(index);
    setShow1(true);

    setStatement({ ...statement, ['loantypeId']: index });

    switch (index) {
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
        setProductTypeName("ავტოლიზინგი");
        break;

      default:
        break;
    }
  };
  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <Modal show={show1} onHide={() => setShow1(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>განაცხადის შევსება</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
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
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                    />
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
                <AntdButton type="submit" className="btn btn-primary">
                  გაგზავნა
                </AntdButton>
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

          <br></br>
          <div className="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">სამომხმარებლო</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="56.svg" height="110px" />
              <p className="card-text">მოგზაურობა, ნივთის შეძენა, გართობა</p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(1)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "12px" }}
          >
            <div className="card-header">იპოთეკური</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="55.svg" height="110px" />
              <p className="card-text">რემონტი, მშენებლობა, სახლის შეძენა</p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(2)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "12px" }}
          >
            <div className="card-header">ბიზნეს სესხი</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="54.svg" height="110px" />
              <p className="card-text">
                ძირითადი საშუალებები, საბრუნავი საშუალებები
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(3)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "12px" }}
          >
            <div className="card-header">აგრო</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="57.svg" height="110px" />
              <p className="card-text">
                სოფლის მეურნეობისთვის, ტექნიკის შესაძენად
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(4)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "29px" }}
          >
            <div className="card-header">საკრედიტო ბარათები</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="cards.svg" height="110px" />
              <p className="card-text">
                Some quick example text to build on the card title
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(5)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "12px" }}
          >
            <div className="card-header">ავტოლიზინგი</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="auto.svg" height="110px" />
              <p className="card-text">
                Some quick example text to build on the card title
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(6)}
              >
                <span>განაცხადის შევსება</span>
              </span>
            </div>
          </div>

          <section id="pricing" className="bg-white" id="products">
            <div className="container">
              {/* <h2 className="text-center">პროდუქტები</h2> */}

              <div className="spacer spacer-line border-primary">&nbsp;</div>
              <div className="spacer">&nbsp;</div>

              <div className="row">
                {/* <div className="col-md-3">
                  <div className="pricing-table">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-info-hover text-white">
                        სამომხმარებლო
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-info">
                      <SvgIcon src="56.svg" />
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong>მოგზაურობა</strong>
                        </li>
                        <li>
                          <strong>ნივთის შეძენა</strong>
                        </li>
                        <li>
                          <strong></strong>
                        </li>
                        <li>
                          <strong>გართობა</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                        <span
                          className="btn btn-info"
                          onClick={() => onDialog(1)}
                        >
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* სამომხმარებლოს მოდალი */}
                <Modal show={show1} onHide={() => setShow1(false)} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>{productTypeName}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* <form> */}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="inputEmail4">მოთხოვნილი თანხა</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="თანხა"
                          name="requestedAmount"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">ვადა</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="ვადა"
                          name="term"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">
                          თვიური საშუალო შემოსავალი
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="შემოსავალი"
                          name="monthlyAverageIncome"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">შენატანი</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="შენატანი"
                          name="deposit"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputState">შემოსავლის წყარო</label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="incomeSourceId"
                          onChange={handleChangeInput}
                        >
                          <option selected>აირჩიეთ...</option>
                          {incomeSource.map((s) => (
                            <option key={s.id} name={s.id} value={s.id}>
                              {s.incomeSourceName}
                            </option>
                          ))}
                          ;
                          {/* <option>თვითდასაქმებული</option>
                            <option>ხელფასი</option>
                            <option>გზავნილი</option>
                            <option>ბიზნესი</option>
                            <option>აგრო</option>
                            <option>იჯარა</option>
                            <option>სხვა</option> */}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">
                          სხვა შემოსავლის წყარო
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="წყარო"
                          name="otherIncomeSource"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputState">სად გერიცებათ ხელფასი</label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="IncomeAccrue"
                          onChange={handleChangeInput}
                        >
                          <option selected>აირჩიეთ...</option>
                          <option>ბანკში</option>
                          <option>ხელზე</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">დამსაქმებელი</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="დამსაქმებელი"
                          name="employer"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputState">
                          სამუშო გამოცდილება - სტაჯი
                        </label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="workExperienceId"
                          onChange={handleChangeInput}
                        >
                          <option selected>აირჩიეთ...</option>
                          {workExperiance.map((s) => (
                            <option key={s.id} name={s.id} value={s.id}>
                              {s.workExperienceName}
                            </option>
                          ))}
                          ;
                          {/* <option>1 წელზე ნაკლები</option>
                            <option>1 - 3 წელი</option>
                            <option>3 წელზე მეტი</option> */}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">ფაქტობრივი მისამართი</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="ფაქტობრივი მისამართი"
                          name="actualAddress"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">
                          სხვა არსებული სესხები (ჯამურად)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="ჯამი"
                          name="existingLoans"
                          onChange={handleChangeInput}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputPassword4">
                          რამდენს იხდით სესხებში ყოველთვიურად?
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="თანხა"
                          name="montlyPaidAmount"
                          onChange={handleChangeInput}
                        />
                      </div>
                      {productType == 2 ? (
                        <>
                          <div className="form-group col-md-6">
                            <label for="inputPassword4">თანამსესხებელი</label>
                            <select
                              id="inputState"
                              className="form-control"
                              name="coBorrowerRelative"
                              onChange={handleChangeInput}
                            >
                              <option selected>აირჩიეთ...</option>
                              <option>მშობელი</option>
                              <option>შვილი</option>
                              <option>მეუღლე</option>
                              <option>და-ძმა</option>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label for="inputPassword4">
                              თანამსესხებელლის ხელფასი
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="თანხა"
                              name="coBorrowerSalary"
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="inputPassword4">შესაძენი ქონების ღირებულება</label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="შესაძენი ქონების ღირებულება"
                              name="propertyCost"
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="inputPassword4">
                              ზუსტი მიზნობრიობა (აღწერა)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="inputPassword4"
                              placeholder="ზუსტი მიზნობრიობა (აღწერა)"
                              name="purpose"
                              onChange={handleChangeInput}
                            />
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="form-group col-md-6">
                        <label>
                          გავქთ მიმდინარე ვადაგადაცილება?{" "}
                          <input type="checkbox" value="" />
                        </label>
                      </div>
                    </div>
                    {/* <div className="form-group">
                        <div className="form-check">
                        <label> <input type="checkbox" value="" />   გავეცანი და ვეთანხმები</label>
                        </div>
                      </div> */}
                    <AntdButton
                      onClick={sendStatement}
                      type="primary"
                      loading={sentLoading}
                    >
                      გაგზავნა
                    </AntdButton>
                    {/* </form> */}
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
                {/* <div className="col-md-3">
                  <div className="pricing-table bg-lightgrey">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-primary-hover text-white">
                        იპოთეკური
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-primary">
                      <SvgIcon src="55.svg" />
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong>რემონტი</strong>
                        </li>
                        <li>
                          <strong>მშენებლობა</strong>
                        </li>
                        <li>
                          <strong>სახლის შეძენა</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                        <span
                          className="btn btn-primary"
                          onClick={() => onDialog(1)}
                        >
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-md-3">
                  <div className="pricing-table">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-info-hover text-white">
                        ბიზნეს სესხი
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-info">
                      <SvgIcon src="54.svg" />
                    </div>
                    <div className="pricing-table-content">
                      <ul>
                        <li>
                          <strong></strong>
                        </li>
                        <li>
                          <strong> ძირითადი საშუალებები</strong>
                        </li>
                        <li>
                          <strong>საბრუნავი საშუალებები</strong>
                        </li>
                        <li>
                          <strong> ახალი პროექტი</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                        <span
                          className="btn btn-info"
                          onClick={() => onDialog(1)}
                        >
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-md-3">
                  <div className="pricing-table bg-lightgrey">
                    <div className="pricing-table-title">
                      <h5 className="pricing-title bg-primary-hover text-white">
                        აგრო
                      </h5>
                    </div>
                    <div className="pricing-table-price text-center bg-primary">
                      <SvgIcon src="57.svg" />
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
                          <strong>ფერმის გაფართოებისთვის</strong>
                        </li>
                      </ul>
                      <div className="pricing-table-button">
                        <span
                          className="btn btn-primary"
                          onClick={() => onDialog(1)}
                        >
                          <span>განაცხადის შევსება</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
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
