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
import { ConsumerLoan } from '../LoanTypes/ConsumerLoan'
import { MortgageLoan } from '../LoanTypes/MortgageLoan'
import { BusinessLoan } from '../LoanTypes/BusinessLoan'
import { AgroLoan } from '../LoanTypes/AgroLoan'
import { CreditCard } from '../LoanTypes/CreditCard'
import { AutoLeasing } from '../LoanTypes/AutoLeasing'
// import  ComponentA  from '../LoanTypes'

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
  const [statement, setStatement] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [sentLoading, setSentLoading] = useState(false);
  const [agroType, setAgroType] = useState("physical");
  const [overlay, setOverlay] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deposit, setDeposit] = useState(0);

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
      `https://localhost:44314/api/Home`,
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

    console.log('statement',statement)
    
    if(statement.loantypeId == index){
      setStatement({ ...statement, ["loantypeId"]: index , ["currency"]: "GEL" });
    }
    else{
      setStatement({  userId: currentUser?.id, ["loantypeId"]: index,  ["currency"]: "GEL"   });
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
                        {/* {productType == 3 ? businessLoan() : ""} */}
                        {productType == 3 ? 
                         <BusinessLoan statement={statement} setStatement={setStatement} /> : ""}

                        {/* {productType == 1 ? consumerLoan() : ""} */}
                        {productType == 1 ?
                          <ConsumerLoan statement={statement} setStatement={setStatement} setValidated={setValidated}/>
                          : ""}

                        {/* {productType == 4 ? agroLoan() : ""} */}
                        {productType == 4 ? 
                         <AgroLoan statement={statement} setStatement={setStatement} agroType={agroType} /> : ""}

                        {/* {consumerLoan()} */}
                        {/* {productType == 2 ? mortgageLoan() : ""} */}
                        {productType == 2 ?
                         <MortgageLoan statement={statement} setStatement={setStatement} /> : ""}

                        {/* {productType == 6 ? autoLeasing() : ""} */}
                        {productType == 6 ? 
                         <AutoLeasing statement={statement} setStatement={setStatement} />
                          : ""}

                        {/* {productType == 5 ? creditCard() : ""} */}
                        {productType == 5 ? 
                        <CreditCard statement={statement} setStatement={setStatement} /> : ""}

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
