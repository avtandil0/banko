import { Row, Col, Alert } from "antd";
import { withTranslation } from "react-i18next";
import Slide from "react-reveal/Slide";

import SvgIcon from "../../../common/SvgIcon";
import Button from "../../../common/Button";

import * as S from "./styles";

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id,
  additionalText,
}) => {
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
              <div>
                <h6>{t(title)}</h6>

              </div>
              <br />
              {/* <S.Content>{t(content)}</S.Content> */}
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
            {/* <div style={{marginTop: '25px', fontSize: 20}}>{t(additionalText)}</div> */}
            {/* <Alert description={t(additionalText)} type="success" showIcon /> */}
            {/* <div style={{ color: '#ff7340', borderColor: 1, fontSize: 17 }}>{t(additionalText)}</div> */}
            <div style={{
              border: '2px solid #FF6D00',
              padding: '10px',
              color: '#343D48',
              borderRadius: 13,
              fontSize: '1rem',
              fontWeight: 590,
              marginTop: 65
            }}>
              {t(additionalText)}
            </div>

          </Slide>
        </Col>
        <Col lg={11} md={11} sm={12} xs={24}>
          <Slide right>
            {/* <SvgIcon
              src={icon}
              className="about-block-image"
              width="100%"
              height="100%"
            /> */}
            <video width="550"  loop="true" autoPlay="true"  controls>
              <source src="/img/svg/video.mp4" type="video/mp4" />
            </video>
          </Slide>
        </Col>
      </Row>
    </S.RightBlockContainer>
  );
};

export default withTranslation()(RightBlock);
