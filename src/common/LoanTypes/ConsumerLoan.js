import { withTranslation } from "react-i18next";


const ConsumerLoan = () => {
  return (
    <div id='team'>
      <section className="our-webcoderskull padding-lg">
        <div className="container">
          <div className="row heading heading-icon">
            <h2>Our Team</h2>
          </div>
          <ul className="row">
            <li className="col-12 col-md-6 col-lg-3">
              <div className="cnt-block equal-hight" style={{height: "349px"}}>
                <figure>
                  <img
                    src="http://www.webcoderskull.com/img/team4.png"
                    className="img-responsive"
                    alt=""
                  />
                </figure>
                <h3>
                  <a href="http://www.webcoderskull.com/">Web coder skull</a>
                </h3>
                <p>Freelance Web Developer</p>
                <ul className="follow-us clearfix">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" ></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="col-12 col-md-6 col-lg-3">
              <div className="cnt-block equal-hight"style={{height: "349px"}}>
                <figure>
                  <img
                    src="http://www.webcoderskull.com/img/team1.png"
                    className="img-responsive"
                    alt=""
                  />
                </figure>
                <h3>
                  <a href="#">Kappua </a>
                </h3>
                <p>Freelance Web Developer</p>
                <ul className="follow-us clearfix">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="col-12 col-md-6 col-lg-3">
              <div className="cnt-block equal-hight" style={{height: "349px"}}>
                <figure>
                  <img
                    src="http://www.webcoderskull.com/img/team4.png"
                    className="img-responsive"
                    alt=""
                  />
                </figure>
                <h3>
                  <a href="http://www.webcoderskull.com/">Manish </a>
                </h3>
                <p>Freelance Web Developer</p>
                <ul className="follow-us clearfix">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="col-12 col-md-6 col-lg-3">
              <div className="cnt-block equal-hight" style={{height: "349px"}}>
                <figure>
                  <img
                    src="http://www.webcoderskull.com/img/team2.png"
                    className="img-responsive"
                    alt=""
                  />
                </figure>
                <h3>
                  <a href="http://www.webcoderskull.com/">Atul </a>
                </h3>
                <p>Freelance Web Developer</p>
                <ul className="follow-us clearfix">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default withTranslation()(ConsumerLoan);
