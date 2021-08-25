import { useState, Fragment, lazy, useEffect } from "react";
import {
  Row,
  message,
  Button as AntdButton,
  Modal as AntModal,
} from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
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
  const [show1, setShow1] = useState(false);
  const [productType, setProductType] = useState(false);
  const [productTypeName, setProductTypeName] = useState("");
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [incomeSource, setIncomeSource] = useState([]);
  const [workExperiance, setWorkExperiance] = useState([]);
  const [regions, setRegions] = useState([]);
  const [municipals, setMunicipals] = useState([]);
  const [controledMunicipals, setControledMunicipals] = useState([]);
  const [statement, setStatement] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sentLoading, setSentLoading] = useState(false);
  const [agroType, setAgroType] = useState("physical");
  const [overlay, setOverlay] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deposit, setDeposit] = useState(0);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", statement);

  useEffect(async () => {
    // Good!
    let us = JSON.parse(localStorage.getItem("user"));
    // setUser(localStorage.getItem('user'))
    setCurrentUser(us);

    setStatement({ ...statement, userId: us?.id });
    console.log("currentUser", currentUser);

    var result1 = await axios.get(`https://weblive.com.ge/api/IncomeSource`);
    console.log('result IncomeSource', result1)
    setIncomeSource(result1.data);
    var result2 = await axios.get(`https://weblive.com.ge/api/WorkExperience`);
    console.log("result WorkExperience", result2);
    setWorkExperiance(result2.data);

    var regionsRes = await axios.get(`https://weblive.com.ge/api/Region`);
    console.log("result regions", regionsRes);
    setRegions(regionsRes.data)

    var municipalsRes = await axios.get(`https://weblive.com.ge/api/Municipal`);
    console.log("result municipals", municipalsRes);
    setMunicipals(municipalsRes.data)

  }, []);

  const handleChangeInput = (e) => {
    console.log('change', e.target.name, e.target.value)
    if (e.target.name == 'regionId') {
      var cc = [...municipals.filter(r => r.regionId == e.target.value)];
      console.log(111111111111, cc)

      setControledMunicipals([...cc])
    }
    console.log('res', res)
    // setStatement({...statement, deposit: res})
    //10%
    setStatement({ ...statement, [e.target.name]: e.target.value });

    //setStatement({...statement, kk: res})
    if (e.target.name == 'term' || e.target.name == 'requestedAmount') {
      let t;
      let r;
      if (e.target.name == 'requestedAmount') {
        t = statement.term;
        r = e.target.value;
      }
      if (e.target.name == 'term') {
        t = e.target.value;
        r = statement.requestedAmount;
      }
      let per = 1 / 100;
      let x = Math.pow((1 + per), t);
      console.log('xxxxxxxxxxx', x)
      var res = r / ((1 - (1 / x)) / per);
      setDeposit(res.toFixed(2))
    }

    console.log("statement", statement);
  };

  const sendStatement = async (event) => {
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("11111", form);
      return;
    }

    console.log(statement);
    setSentLoading(true);
    var result = await axios.post(
      `https://weblive.com.ge/api/Home`,
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

  const handleChangeRadio = (e) => {
    console.log("aaaa", e.target);
    setAgroType(e.target.id);
  };

  const handleChangeOverlay = (e) => {
    console.log("eee", e.target.checked);
    setOverlay(e.target.checked);
  };

  const creditCard = () => {
    return (
      <>
        {consumerLoan()}
        {/* <div className="form-group col-md-6">
          <label for="inputPassword4">მოთხოვნილი ლიმიტი</label>
          <input
            type="number"
            className="form-control"
            id="inputPassword4"
            placeholder="მოთხოვნილი ლიმიტი"
            name="requiredLimit"
            value={statement?.requiredLimit}
            onChange={handleChangeInput}
          />
        </div> */}
      </>
    );
  };

  const agroLoan = () => {
    return <>{agroType == "physical" ? consumerLoan() : businessLoan()}</>;
  };

  const autoLeasing = () => {
    return (
      <>
        {consumerLoan()}
        <br></br>
        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>ინფორმაცია ავტომობილზე</Card.Header>
          <Card.Body>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputPassword4">ავტომობილის ღირებულება</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="ავტომობილის ღირებულება"
                  name="carCost"
                  value={statement?.carCost}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">ავტომობილის მარკა</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="ავტომობილის მარკა"
                  name="CarMake"
                  value={statement?.CarMake}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">ავტომობილის გამოშვების წელი</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder=" ავტომობილის გამოშვების წელი"
                  name="vehicleYear"
                  value={statement?.vehicleYear}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

      </>
    );
  };

  const mortgageLoan = () => {
    return (
      <>
        {consumerLoan()}
        <br></br>
        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>ინფორმაცია იპოთეკაზე</Card.Header>
          <Card.Body>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputPassword4">თანამსესხებელი</label>
                <select
                  id="inputState"
                  className="form-control"
                  name="coBorrowerRelative"
                  value={statement?.coBorrowerRelative}
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
                <label for="inputPassword4">თანამსესხებელლის ხელფასი</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="თანხა"
                  name="coBorrowerSalary"
                  value={statement?.coBorrowerSalary}
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
                  value={statement?.propertyCost}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">ზუსტი მიზნობრიობა (აღწერა)</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="ზუსტი მიზნობრიობა (აღწერა)"
                  name="purpose"
                  value={statement?.purpose}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

      </>
    );
  };
  const businessLoan = () => {
    return (
      <>
        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>კომპანიის შესახებ</Card.Header>
          <Card.Body>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  კომპანიის დასახელება<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="კომპანიის დასახელება"
                  name="borrowerName"
                  value={statement?.borrowerName}
                  onChange={handleChangeInput}
                />
                <Form.Control.Feedback type="invalid">
                  მოითითეთ კომპანიის დასახელება.
                </Form.Control.Feedback>
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  საიდენტიფინაციო ნომერი<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="საიდენტიფინაციო ნომერი"
                  name="taxcode"
                  value={statement?.taxcode}
                  onChange={handleChangeInput}
                />
                <Form.Control.Feedback type="invalid">
                  საიდენტიფინაციო ნომერი.
                </Form.Control.Feedback>
              </div>
            </div>
          </Card.Body>
        </Card>
        <br></br>
        {/* <div className="form-group col-md-6">
          <label for="inputPassword4">ბიზნესის გამოცდილება</label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="ბიზნესის გამოცდილება"
            name="businessExperience"
            onChange={handleChangeInput}
          />
        </div> */}
        {consumerLoan()}
      </>
    );
  };
  const consumerLoan = () => {
    return (
      <>
        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>მოთხოვნილი პროდუქტი</Card.Header>
          <Card.Body>
            <Card.Text>
              <div >
                <div className="form-row">
                  <div className="col-md-4">
                    <label for="inputEmail4">
                      მოთხოვნილი თანხა <span style={{ color: "red" }}>*</span>
                    </label>
                    <Form.Control
                      required
                      type="number"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="თანხა"
                      name="requestedAmount"
                      value={statement?.requestedAmount}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      მიუთითეთ მოთხოვნილი თანხა.
                    </Form.Control.Feedback>
                  </div>
                  <div className=" col-md-2">
                    <label for="inputEmail4">
                      ვალუტა<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="inputcurrency"
                      className="form-control"
                      name="currency"
                      value={statement?.currency}
                      onChange={handleChangeInput}
                    >
                      <option selected>GEL</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
                  <div className=" col-md-2">
                    {statement?.loantypeId != 5 ? (
                      <>
                        <label for="inputPassword4">
                          ვადა (თვე)<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="ვადა"
                          name="term"
                          value={statement?.term}
                          onChange={handleChangeInput}
                        />

                        <Form.Control.Feedback type="invalid">
                          მიუთითეთ ვადა.
                        </Form.Control.Feedback>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className=" col-md-4">

                    {statement?.loantypeId != 5 ? (
                      <>
                        <label for="inputPassword4">
                          შენატანი (სავარაუდო)
                        </label>
                        <input
                          disabled
                          type="number"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="შენატანი"
                          name="deposit"
                          value={deposit}
                        // onChange={handleChangeInput}
                        />
                      </>
                    ) : (
                      ""
                    )}

                  </div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <br>
        </br>

        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>შემოსავლები</Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label for="inputPassword4">
                    თვიური საშუალო შემოსავალი<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="შემოსავალი"
                    name="monthlyAverageIncome"
                    value={statement?.monthlyAverageIncome}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ თვიური საშუალო შემოსავალი.
                  </Form.Control.Feedback>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputState">
                    შემოსავლის წყარო <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Control
                    required
                    as="select"
                    id="inputState"
                    className="form-control"
                    name="incomeSourceId"
                    value={statement?.incomeSourceId}
                    onChange={handleChangeInput}
                  >
                    <option></option>
                    {incomeSource.map((s) => (
                      <option key={s.id} name={s.id} value={s.id}>
                        {s.incomeSourceName}
                      </option>
                    ))}
                    ;
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    მიუთითეთ თვიური საშუალო შემოსავალი.
                  </Form.Control.Feedback>
                </div>
                <div className="form-group col-md-4">
                  {statement?.loantypeId == 3 ||
                    (statement?.loantypeId == 4 && agroType == "legal") ? (
                    ""
                  ) : (
                    <>

                      {/* {statement?.incomeSourceId == 7 ? ( */}
                      <>
                        <label for="inputPassword4">
                          სხვა შემოსავლის წყარო
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          disabled={statement?.incomeSourceId != 7}
                          type="text"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="სხვა შემოსავლის წყარო"
                          name="otherIncomeSource"
                          value={statement?.otherIncomeSource}
                          onChange={handleChangeInput}
                        />
                      </>
                      {/* ) : (
                        ""
                      )} */}


                    </>
                  )}

                </div>
                {statement?.loantypeId == 3 ||
                  (statement?.loantypeId == 4 && agroType == "legal") ? (
                  ""
                ) : (
                  <>

                    <div className="form-group col-md-5">
                      <label for="inputState">
                        სად გერიცებათ ხელფასი<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        required
                        id="inputState"
                        className="form-control"
                        name="IncomeAccrue"
                        value={statement?.IncomeAccrue}
                        onChange={handleChangeInput}
                      >
                        <option selected></option>
                        <option>ბანკში</option>
                        <option>ხელზე</option>
                      </select>
                      <Form.Control.Feedback type="invalid">
                        მიუთითეთ  სად გერიცებათ ხელფასი.
                      </Form.Control.Feedback>
                    </div>
                    <div className="form-group col-md-7">
                      <label for="inputState">
                        სამუშო გამოცდილება - სტაჟი
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        required
                        id="inputState"
                        className="form-control"
                        name="workExperienceId"
                        value={statement?.workExperienceId}
                        onChange={handleChangeInput}
                      >
                        <option selected></option>
                        {workExperiance.map((s) => (
                          <option key={s.id} name={s.id} value={s.id}>
                            {s.workExperienceName}
                          </option>
                        ))}
                        ;
                      </select>
                      <Form.Control.Feedback type="invalid">
                        მიუთითეთ  სტაჟი.
                      </Form.Control.Feedback>
                    </div>
                  </>
                )}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />



        <Card border="info" style={{ width: '49rem' }}>
          <Card.Header>დამატენითი ინფორმაცია</Card.Header>
          <Card.Body>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  ფაქტიური მისამართი<span style={{ color: "red" }}>*</span>
                </label>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <select
                      required
                      id="inputState"
                      className="form-control"
                      name="regionId"
                      value={statement?.regionId}
                      onChange={handleChangeInput}
                    >
                      <option selected></option>
                      {regions.map((s) => (
                        <option key={s.id} name={s.id} value={s.id}>
                          {s.regionName}
                        </option>
                      ))}
                      ;
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <select
                      required
                      id="inputState"
                      className="form-control"
                      name="municipalId"
                      value={statement?.municipalId}
                      onChange={handleChangeInput}
                    >
                      <option selected></option>
                      {controledMunicipals.map((s) => (
                        <option key={s.id} name={s.id} value={s.id}>
                          {s.municipalName}
                        </option>
                      ))}
                      ;
                    </select>
                  </div>

                </div>

                <Form.Control.Feedback type="invalid">
                  მიუთითეთ  მისამართი.
                </Form.Control.Feedback>
                {/* <input
            required
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="ფაქტიური მისამართი"
            name="actualAddress"
            onChange={handleChangeInput}
            value={statement?.actualAddress}
          /> */}

                {/* <Form.Control.Feedback type="invalid">
            მიუთითეთ ფაქტიური მისამართი.
          </Form.Control.Feedback> */}
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  სხვა არსებული სესხები (ჯამურად)
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="ჯამი"
                  name="existingLoans"
                  onChange={handleChangeInput}
                  value={statement?.existingLoans}
                />
                <Form.Control.Feedback type="invalid">
                  სხვა არსებული სესხები (ჯამურად).
                </Form.Control.Feedback>
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">
                  რამდენს იხდით სესხებში ყოველთვიურად?
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="თანხა"
                  name="montlyPaidAmount"
                  onChange={handleChangeInput}
                  value={statement?.montlyPaidAmount}
                />
                <Form.Control.Feedback type="invalid">
                  სხვა არსებული სესხები (ჯამურად).
                </Form.Control.Feedback>
              </div>
              <div className="form-group col-md-6">
                <label for="inputState">
                  {" "}
                  გაქვს ნეგატიური სტატუსი?{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  required
                  id="inputState"
                  className="form-control"
                  name="negativeStatus"
                  onChange={handleChangeInput}
                >
                  <option selected></option>
                  <option>მაქვს</option>
                  <option>მქონდა</option>
                  <option>არასდროს მქონია</option>
                </select>
                <Form.Control.Feedback type="invalid">
                  აირჩიეთ .
                </Form.Control.Feedback>
              </div>
              <div className="form-group col-md-6">
                <label>
                  {" "}
                  <input
                    type="checkbox"
                    checked={overlay}
                    onChange={handleChangeOverlay}
                  />{" "}
                  აპირებთ თუ არა გადაფარვას?{" "}
                </label>
              </div>
              {overlay ? (
                <>
                  <div className="form-group col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="თანხა"
                      name="overlayAmount"
                      onChange={handleChangeInput}
                      value={statement?.overlayAmount}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>



      </>
    );
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

    setStatement({ ...statement, ["loantypeId"]: index });

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
        setProductTypeName("ავტო სესხი");
        break;

      default:
        break;
    }
  };
  return (
    <S.MiddleBlock id="products">
      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <br></br>
          <div className="card border-dark mb-3" style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem" }}>
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("ConsumerLoan")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="56.svg" height="110px" />
              <p className="card-text">{t("ConsumerLoanDesc")}</p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(1)}
              >
                <span>{t("ApplyNow")}</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem", marginLeft: "12px" }}
          >
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("Mortgage")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="55.svg" height="110px" />
              <p className="card-text">{t("MortgageDesc")}</p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(2)}
              >
                <span>{t("ApplyNow")}</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem", marginLeft: "12px" }}
          >
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("BusinessLoan")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="54.svg" height="110px" />
              <p className="card-text">
                {t("BusinessLoanDesc")}
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(3)}
              >
                <span>{t("ApplyNow")}</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem", marginLeft: "12px" }}
          >
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("AgroLoan")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="57.svg" height="110px" />
              <p className="card-text">
                {t("AgroLoanDesc")}
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(4)}
              >
                <span>{t("ApplyNow")}</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem", marginLeft: "29px" }}
          >
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("CreditCard")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="credit.svg" height="110px" />
              <p className="card-text">
                {t("CreditCard")}
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(5)}
              >
                <span>{t("ApplyNow")}</span>
              </span>
            </div>
          </div>
          <div
            className="card border-dark mb-3"
            style={{ maxWidth: "18rem", minWidth: "18rem", height: "19rem", marginLeft: "12px" }}
          >
            <div className="card-header" style={{ backgroundColor: '#2e186a', color: '#fff' }}>{t("AutoLeasing")}</div>
            <div className="card-body text-dark">
              {/* <h5 className="card-title">Dark card title</h5> */}
              <SvgIcon src="auto.svg" height="110px" />
              <p className="card-text">
                {t("AutoLeasing")}
              </p>
              <span
                className="btn btn-outline-info"
                onClick={() => onDialog(6)}
              >
                <span> {t("ApplyNow")}</span>
              </span>
            </div>
          </div>

          <section id="pricing" className="bg-white">

            <div className="container">

              {/* <h2 className="text-center">პროდუქტები</h2> */}

              <div className="spacer spacer-line border-primary">&nbsp;</div>
              <div className="spacer">&nbsp;</div>

              <div className="row">
                {/* სამომხმარებლოს მოდალი */}
                <Modal show={show1} onHide={() => setShow1(false)} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>{productTypeName}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={sendStatement}
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
                        {productType == 3 ? businessLoan() : ""}

                        {productType == 1 ? consumerLoan() : ""}

                        {productType == 4 ? agroLoan() : ""}

                        {/* {consumerLoan()} */}
                        {productType == 2 ? mortgageLoan() : ""}

                        {productType == 6 ? autoLeasing() : ""}

                        {productType == 5 ? creditCard() : ""}

                      </div>
                      <br></br>

                      <AntdButton
                        // onClick={sendStatement}
                        htmlType="submit"
                        type="primary"
                        loading={sentLoading}
                      >
                        გაგზავნა
                      </AntdButton>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
            </div>
          </section>
        </Fade>
      </Row>
    </S.MiddleBlock>
  );
};

export default withTranslation()(MiddleBlock);
