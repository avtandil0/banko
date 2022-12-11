import React,{ useState, Fragment, lazy, useEffect } from "react";
import {
  Row,
  message,
  Col,
  Tabs,
  Checkbox,
  Button as AntdButton,
  Modal as AntModal,
} from "antd";


import { CheckOutlined,
} from '@ant-design/icons';


import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import * as S from "./styles";
import "./index.css"; // Tell webpack that Button.js uses these styles
import axios from "axios";
import { ConsumerLoan } from "../LoanTypes/ConsumerLoan";
import { MortgageLoan } from "../LoanTypes/MortgageLoan";
import { BusinessLoan } from "../LoanTypes/BusinessLoan";
import { AgroLoan } from "../LoanTypes/AgroLoan";
import { CreditCard } from "../LoanTypes/CreditCard";
import { AutoLeasing } from "../LoanTypes/AutoLeasing";
import LoginModal from "../../common/LoginModal";
// import  ComponentA  from '../LoanTypes'
import constants from '../../constants'

const Button = lazy(() => import("../../common/Button"));
const SvgIcon = lazy(() => import("../../common/SvgIcon"));

const { TabPane } = Tabs;

const MiddleBlock = ({
  title,
  content,
  button,
  t,
  isAuthorize,
  setIsAuthorize,
  setInProfileMOde
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
  const [statement, setStatement] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [sentLoading, setSentLoading] = useState(false);
  const [agroType, setAgroType] = useState("physical");
  const [overlay, setOverlay] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deposit, setDeposit] = useState(0);

  const [user, setUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [visibleLoginRegisterDialog, setVisibleLoginRegisterDialog] =
    useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(async () => {
    // Good!
    let us = JSON.parse(localStorage.getItem("user"));
    // document.cookie=`token=${us?.token}`
    // setUser(localStorage.getItem('user'))
    setCurrentUser(us);

    setStatement({ ...statement, userId: us?.id });

    // axios.interceptors.request.use(function(config) {
    //   if (us) {
    //     config.params = {token: us?.token};
    //   }
    //    console.log('aaaxxxxsiooooooos', config)
    //   return config;
    // }, function(err)  {
    //   return Promise.reject(err);
    // });

    // axios.defaults.withCredentials = true


    // let par = {params: {token: us.token}}
    // console.log('parparparpar',par)
    var result1 = await axios.get(constants.API_PREFIX +`/api/IncomeSource`,
    {
      params: {
        token: us?.token
      }
    });
    setIncomeSource(result1.data);
    // var result2 = await axios.get(constants.API_PREFIX +`/api/WorkExperience`);
    // console.log("result WorkExperience", result2);
    // setWorkExperiance(result2.data);

    // var regionsRes = await axios.get(constants.API_PREFIX +`/api/Region`);
    // console.log("result regions", regionsRes);
    // setRegions(regionsRes.data);

    // var municipalsRes = await axios.get(constants.API_PREFIX +`/api/Municipal`);
    // console.log("result municipals", municipalsRes);
    // setMunicipals(municipalsRes.data);
  }, []);


  const [agreeTerms, setAgreeTerms] = useState(false)
  const onChangeTermAgree = (e) => {
    setAgreeTerms(e.target.checked)
  }

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

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    // if (e.charCode === 13) {
    //   if (!user.userName || !user.password) {
    //     return;
    //   }
    //   // handleLogin();
    // }
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
      return;
    }

    // console.log('valdiate', Object.entries(user))
    // var result  = await axios.post('https://avtandil-002-site2.ftempurl.com/api/Registration', user)
    setRegisterLoading(true);
    var result = await axios.post(constants.API_PREFIX +`/api/account`, user,
    {
      params: {
        token: currentUser?.token
      }
    });
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
  };

  const handleLogin = async () => {
    if (!user?.userName || !user?.password) {
      setValidated(true);
      return;
    }
    setLoginLoading(true);
    var result = await axios.get(
      constants.API_PREFIX +`/api/account/${user.userName}/${user.password}`,
      {
        params: {
          token: currentUser?.token
        }
      }
      // {
      //   params: { ...user },
      // }
    );
    if (result.data.token) {
      // message.success(result.data.meessage);
      localStorage.setItem("user", JSON.stringify(result.data));
      window.location.reload();
      return;
      setVisibleLoginRegisterDialog(false);
      setIsAuthorize(true);
      setCurrentUser(result.data);
      setUser({ ...user, userName: "", password: "" });
      setValidated(false);
      window.location.reload();
    } else {
      message.error("მომხმარებელი ან პაროლი არასწორია");
    }
    setLoginLoading(false);
  };

  const handleChangeInputUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeInput = (e) => {
    if (e.target.name == "regionId") {
      var cc = [...municipals.filter((r) => r.regionId == e.target.value)];

      setControledMunicipals([...cc]);
    }
    // setStatement({...statement, deposit: res})
    //10%
    setStatement({ ...statement, [e.target.name]: e.target.value });

    //setStatement({...statement, kk: res})
    if (e.target.name == "term" || e.target.name == "requestedAmount") {
      let t;
      let r;
      if (e.target.name == "requestedAmount") {
        t = statement.term;
        r = e.target.value;
      }
      if (e.target.name == "term") {
        t = e.target.value;
        r = statement.requestedAmount;
      }
      let per = 1 / 100;
      let x = Math.pow(1 + per, t);
      var res = r / ((1 - 1 / x) / per);
      setDeposit(res.toFixed(2));
    }

  };

  const sendStatement = async (event) => {
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';


    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setSentLoading(true);
    var result = await axios.post(constants.API_PREFIX + `/api/Home`, statement,
    {
      params: {
        token: currentUser?.token
      }
    });
    setSentLoading(false);
    setShow1(false);
    if(result.data.isSuccess){

      showModal()

      let text = result.data.meessage.indexOf('http') < 0? 
      result.data.meessage : result.data.meessage.substring(0,result.data.meessage.indexOf('http')) ;

      let link = result.data.meessage.indexOf('http') < 0? 
        null
        : result.data.meessage.substring(result.data.meessage.indexOf('http'),result.data.meessage.length);
      setAppAnswer({
        text: text,
        link: link
      })
      // AntModal.success({
      //   content: result.data.meessage,
      // });
      // setInProfileMOde(true)
    }

    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    // message.success(result.data.meessage);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleChangeRadio = (e) => {
    setAgroType(e.target.id);
  };

  const handleChangeOverlay = (e) => {
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
        <Card border="info" style={{ width: "49rem" }}>
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
        <Card border="info" style={{ width: "49rem" }}>
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
                <label for="inputPassword4">თანამსესხებლის ხელფასი</label>
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
        <Card border="info" style={{ width: "49rem" }}>
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
                  საიდენტიფიკაციო ნომერი<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="საიდენტიფიკაციო ნომერი"
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
        <Card border="info" style={{ width: "49rem" }}>
          <Card.Header>მოთხოვნილი პროდუქტი</Card.Header>
          <Card.Body>
            <Card.Text>
              <div>
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
                          ვადა (თვე)1<span style={{ color: "red" }}>*</span>
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
                        <label for="inputPassword4">შენატანი (სავარაუდო)</label>
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
        <br></br>

        <Card border="info" style={{ width: "49rem" }}>
          <Card.Header>შემოსავლები</Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label for="inputPassword4">
                    თვიური საშუალო შემოსავალი
                    <span style={{ color: "red" }}>*</span>
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
                        {/* <label for="inputPassword4">
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
                        /> */}
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
                        სად გერიცხებათ ხელფასი
                        <span style={{ color: "red" }}>*</span>
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
                        მიუთითეთ სად გერიცებათ ხელფასი.
                      </Form.Control.Feedback>
                    </div>
                    {/* <div className="form-group col-md-7">
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
                        მიუთითეთ სტაჟი.
                      </Form.Control.Feedback>
                    </div> */}
                  </>
                )}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <Card border="info" style={{ width: "49rem" }}>
          <Card.Header>დამატებითი ინფორმაცია</Card.Header>
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
                  მიუთითეთ მისამართი.
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
                  თქვენი საკრედიტო ისტორია{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  required
                  id="inputState"
                  className="form-control"
                  name="currentOverdue"
                  onChange={handleChangeInput}
                  value={statement?.currentOverdue}
                >
                  <option selected></option>
                  <option value={1}>მაქვს ვადაგადაცილება</option>
                  <option value={0}>არ მაქვს ვადაგადაცილება</option>
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
     AntModal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
      okText: 'დახურვა'
    });

    return;
    if (!isAuthorize) {
      // message.warning('განცხადების შესატანად გაიარეთ ავტორიზაცია');
      // notification['info']({
      //   message: 'შეცდომა !',
      //   description:
      //     'განცხადების შესატანად გაიარეთ ავტორიზაცია.',
      //     placement: 'bottomRight'
      // });
      // AntModal.warning({
      //   title: "შეცდომა",
      //   content: "განცხადების შესავსებად გაიარეთ ავტორიზაცია",
      //   oklButtonProps: { style: { display: "none" } },
      // });
      // console.log(777777);

      setVisibleLoginRegisterDialog(true);
      return;
    }

    // if(index == 3){
    //   AntModal.warning({
    //     content: 'პროდუქტი მალე დაემატება',
    //   });

    //   return;
    // }
    setProductType(index);
    setShow1(true);


    if (statement.loantypeId == index) {
      setStatement({
        ...statement,
        ["loantypeId"]: index,
        ["currency"]: "GEL",
      });
    } else {
      setStatement({
        userId: currentUser?.id,
        ["loantypeId"]: index,
        ["currency"]: "GEL",
      });
    }

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appAnswer, setAppAnswer] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <S.MiddleBlock id="products">

    <AntModal         
      okText="დახურვა"
       cancelButtonProps={{ hidden: true}}
       visible={isModalVisible} 
       onOk={handleOk} onCancel={handleCancel}>
        <p>{appAnswer?.text}</p>
        <AntdButton type="link" onClick={() => window.open(appAnswer?.link)}>{appAnswer?.link}</AntdButton>
        {/* <a onClick={() => window.open(appAnswer?.link)}>{appAnswer?.link}</a> */}
      </AntModal>

<LoginModal 
      visibleLoginRegisterDialog={visibleLoginRegisterDialog}
      setVisibleLoginRegisterDialog={setVisibleLoginRegisterDialog}
      setInProfileMOde={setInProfileMOde}
      isAuthorize={isAuthorize}
      setIsAuthorize={setIsAuthorize}
      />
      {/* <AntModal
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
              <Row>
                <Form.Label column lg={3}>
                  მობილურის ნომერი111111111
                </Form.Label>
                <Col lg={16}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="მობილურის ნომერი"
                    name="phoneNumber"
                    value={user?.phoneNumber}
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                  
                  <Form.Control
                    autoComplete="off"
                    required
                    type="date"
                    name="birthDate"
                    placeholder="დაბადების თარიღი"
                    value={user?.birthDate}
                    onChange={handleChangeInputUser}
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
                    onChange={handleChangeInputUser}
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
                  <AntdButton htmlType="submit" loading={registerLoading}>
                    რეგისტრაცია
                  </AntdButton>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </AntModal> */}

      <Row type="flex" justify="center" align="middle">
        <Fade bottom>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              maxWidth: 1000,
            }}
          >
            <div>
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#2e186a",
                    color: "#fff",
                  }}
                >
                  {t("ConsumerLoan")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-1.svg" height="110px" />
                  <p className="card-text">{t("ConsumerLoanDesc")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(1)}
                  >
                    <span>{t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#2e186a", color: "#fff" }}
                >
                  {t("Mortgage")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-2.svg" height="110px" />
                  <p className="card-text">{t("MortgageDesc")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(2)}
                  >
                    <span>{t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#2e186a", color: "#fff" }}
                >
                  {t("BusinessLoan")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-3.svg" height="110px" />
                  <p className="card-text">{t("BusinessLoanDesc")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(3)}
                  >
                    <span>{t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#2e186a", color: "#fff" }}
                >
                  {t("AgroLoan")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-4.svg" height="110px" />
                  <p className="card-text">{t("AgroLoanDesc")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(4)}
                  >
                    <span>{t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#2e186a", color: "#fff" }}
                >
                  {t("CreditCard")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-5.svg" height="110px" />
                  <p className="card-text">{t("CreditCard")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(5)}
                  >
                    <span>{t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div
                className="card border-dark mb-3"
                style={{
                  maxWidth: "18rem",
                  minWidth: "18rem",
                  height: "19rem",
                }}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#2e186a", color: "#fff" }}
                >
                  {t("AutoLeasing")}
                </div>
                <div className="card-body text-dark">
                  {/* <h5 className="card-title">Dark card title</h5> */}
                  <SvgIcon src="RANKO_ICONS-6.svg" height="110px" />
                  <p className="card-text">{t("AutoLeasing")}</p>
                  <span
                    className="btn btn-outline-info"
                    onClick={() => onDialog(6)}
                  >
                    <span> {t("ApplyNow")}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br></br>

          <section id="pricing" className="bg-white">
            <div className="container">
              {/* <h2 className="text-center">პროდუქტები</h2> */}

           

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
                        {/* {productType == 3 ? businessLoan() : ""} */}
                        {productType == 3 ? (
                          <BusinessLoan
                            statement={statement}
                            setStatement={setStatement}
                          />
                        ) : (
                          ""
                        )}

                        {/* {productType == 1 ? consumerLoan() : ""} */}
                        {productType == 1 ? (
                          <ConsumerLoan
                            statement={statement}
                            setStatement={setStatement}
                            setValidated={setValidated}
                          />
                        ) : (
                          ""
                        )}

                        {/* {productType == 4 ? agroLoan() : ""} */}
                        {productType == 4 ? (
                          <AgroLoan
                            statement={statement}
                            setStatement={setStatement}
                            agroType={agroType}
                          />
                        ) : (
                          ""
                        )}

                        {/* {consumerLoan()} */}
                        {/* {productType == 2 ? mortgageLoan() : ""} */}
                        {productType == 2 ? (
                          <MortgageLoan
                            statement={statement}
                            setStatement={setStatement}
                          />
                        ) : (
                          ""
                        )}

                        {/* {productType == 6 ? autoLeasing() : ""} */}
                        {productType == 6 ? (
                          <AutoLeasing
                            statement={statement}
                            setStatement={setStatement}
                          />
                        ) : (
                          ""
                        )}

                        {/* {productType == 5 ? creditCard() : ""} */}
                        {productType == 5 ? (
                          <CreditCard
                            statement={statement}
                            setStatement={setStatement}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <br></br>

                      <Checkbox checked={agreeTerms} onChange={onChangeTermAgree}> ვეთანხმები </Checkbox>

                      <AntdButton type="link" onClick={() => window.open('/privacy')}>
                          წესებსა და პირობებებს
                        </AntdButton>
<br/>
                      <AntdButton
                      icon={<CheckOutlined />}
                      disabled={!agreeTerms}
                      style={{marginTop:20}}
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
