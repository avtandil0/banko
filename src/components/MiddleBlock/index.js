import { lazy } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";
import './index.css'; // Tell webpack that Button.js uses these styles


const Button = lazy(() => import("../../common/Button"));

const MiddleBlock = ({ title, content, button, t }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
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
                      <h5 class="pricing-title bg-info-hover text-white">სამომხმარებლო</h5>
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
                        <li><strong>Basic Package</strong></li>
                        <li><strong><del>Professional Features</del></strong></li>
                        <li><strong><del>Extra Options</del></strong></li>
                        <li><strong>24/7 Support</strong></li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-info"><span>Request Quote</span></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="pricing-table bg-lightgrey">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-primary-hover text-white">იპოთეკური</h5>
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
                        <li><strong>Management Package</strong></li>
                        <li><strong>Professional Features</strong></li>
                        <li><strong><del>Extra Options</del></strong></li>
                        <li><strong>24/7 Support</strong></li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-primary"><span>Request Quote</span></a>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div class="col-md-3">
                  <div class="pricing-table">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-info-hover text-white">ბიზნეს სესხი</h5>
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
                        <li><strong>Business Package</strong></li>
                        <li><strong>Professional Features</strong></li>
                        <li><strong>Extra Options</strong></li>
                        <li><strong>24/7 Support</strong></li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-info"><span>Request Quote</span></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="pricing-table bg-lightgrey">
                    <div class="pricing-table-title">
                      <h5 class="pricing-title bg-primary-hover text-white">აგრო</h5>
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
                        <li><strong>Management Package</strong></li>
                        <li><strong>Professional Features</strong></li>
                        <li><strong><del>Extra Options</del></strong></li>
                        <li><strong>24/7 Support</strong></li>
                      </ul>
                      <div class="pricing-table-button">
                        <a href="#x" class="btn btn-primary"><span>Request Quote</span></a>
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
