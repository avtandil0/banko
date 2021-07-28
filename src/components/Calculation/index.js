// // import LeftContentBlock from "./LeftContentBlock";
// import RightContentBlock from "../ContentBlock/RightContentBlock";

// const Calculation = (props) => {
//    return <RightContentBlock {...props} />;
// };

// export default Calculation;
import { useState, Fragment, lazy, useEffect } from "react";

import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";
import Form from "react-bootstrap/Form";

import SvgIcon from "../../common/SvgIcon";
import Button from "../../common/Button";

import * as S from "../ContentBlock/RightContentBlock/styles";

const Calculation = ({ title, content, button, icon, t, id }) => {
  const [deposit, setDeposit] = useState(0);
  const [statement, setStatement] = useState();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleChangeInput = (e) => {
    console.log("res", statement);
    // setStatement({...statement, deposit: res})
    //10%
    setStatement({ ...statement, [e.target.name]: e.target.value });

    let t;
    let r;
    let p;
    if (e.target.name == "amount") {
      r = e.target.value;
      t = statement?.term;
      p = statement?.percent;
    }
    if (e.target.name == "term") {
      t = e.target.value;
      r = statement?.amount;
      p = statement?.percent;
    }
    if (e.target.name == "percent") {
      p = e.target.value;
      t = statement?.term;
      r = statement?.amount;
    }
    let per = p / 12 / 100;
    let x = Math.pow(1 + per, t);
    console.log("xxxxxxxxxxx", x);
    var res = r / ((1 - 1 / x) / per);
    console.log("res", res);
    setDeposit(res.toFixed(2));
  };
  return (
    <S.RightBlockContainer>
      <Row type="flex" justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={11} xs={24}>
          <Slide left>
              <span style={{fontSize:'25px'}}>
                  დაითვალეთ ყოველთვიური შენატანი
              </span>
              <br></br>
            <S.ContentWrapper style={{ marginTop:'50px'}}>
              <Row>
                <Col className="form-group col-md-6">
                  <label for="inputEmail4">თანხა</label>
                  <Form.Control
                    type="number"
                    placeholder="თანხა"
                    name="amount"
                    value={statement?.amount}
                    onChange={handleChangeInput}
                  />
                </Col>
                <Col className="form-group col-md-6">
                  <label for="inputEmail4">ვადა (თვე)</label>
                  <Form.Control
                    type="number"
                    placeholder="ვადა (თვე)"
                    name="term"
                    value={statement?.term}
                    onChange={handleChangeInput}
                  />
                </Col>
                <Col className="form-group col-md-6">
                  <label for="inputEmail4">პროცენტი (წლიური)</label>
                  <Form.Control
                    type="number"
                    placeholder="პროცენტი"
                    name="percent"
                    value={statement?.percent}
                    onChange={handleChangeInput}
                  />
                </Col>
                <Col className="form-group col-md-6">
                  <label for="inputEmail4">შენატანი</label>
                  <Form.Control
                    disabled
                    type="number"
                    placeholder="შენატანი"
                    value={deposit}
                  />
                </Col>
              </Row>

              <S.ButtonWrapper>
                {button &&
                  typeof button === "object" &&
                  button.map((item, id) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        width="true"
                        onClick={() => scrollTo("products")}
                      >
                        {t(item.title)}
                      </Button>
                    );
                  })}
              </S.ButtonWrapper>
            </S.ContentWrapper>
          </Slide>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide right>
            <SvgIcon
              src={icon}
              className="about-block-image"
              width="100%"
              height="100%"
            />
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
};

export default withTranslation()(Calculation);
