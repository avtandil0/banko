// // import LeftContentBlock from "./LeftContentBlock";
// import RightContentBlock from "../ContentBlock/RightContentBlock";

// const Calculation = (props) => {
//    return <RightContentBlock {...props} />;
// };

// export default Calculation;

import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";
import Form from "react-bootstrap/Form";

import SvgIcon from "../../common/SvgIcon";
import Button from "../../common/Button";

import * as S from "../ContentBlock/RightContentBlock/styles";

const Calculation = ({ title, content, button, icon, t, id }) => {
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: "smooth",
        });
    };
    return (
        <S.RightBlockContainer>
            <Row type="flex" justify="space-between" align="middle" id={id}>
                <Col lg={11} md={11} sm={11} xs={24}>
                    <Slide left>
                        <S.ContentWrapper>




                            <Row >
                                <Col  className="form-group col-md-6">
                                    <Form.Control type="number" placeholder="თანხა" />
                                </Col>
                                <Col  className="form-group col-md-6">
                                    <Form.Control type="number" placeholder="ვადა (თვე)" />
                                </Col>
                                <Col  className="form-group col-md-6">
                                    <Form.Control type="number" placeholder="პროცენტი" />
                                </Col>
                                <Col  className="form-group col-md-6">
                                    <Form.Control disabled type="number" placeholder="შენატანი" />
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
