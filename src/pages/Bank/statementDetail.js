import React, { useState, Fragment, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";

import { PrinterOutlined,CloseOutlined ,CloseCircleFilled} from "@ant-design/icons";

import { ConsumerLoan } from "../../components/LoanTypes/ConsumerLoan";
import { MortgageLoan } from "../../components/LoanTypes/MortgageLoan";
import { BusinessLoan } from "../../components/LoanTypes/BusinessLoan";
import { AgroLoan } from "../../components/LoanTypes/AgroLoan";
import { CreditCard } from "../../components/LoanTypes/CreditCard";
import { AutoLeasing } from "../../components/LoanTypes/AutoLeasing";
import axios from "axios";
import constants from "../../constants";
import { Button } from "antd";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

import './index.css'
const StatementDetail = () => {
  let { id } = useParams();
  let history = useHistory();


  const [statement, setStatement] = useState({});
  const [productType, setProductType] = useState(0);

  useEffect(async () => {
    let us = JSON.parse(localStorage.getItem("user"));
    var res = await axios.get(
      constants.API_PREFIX + `/api/Home/getById/${id}`,
      {
        params: {
          token: us?.token,
        },
      }
    );
    setProductType(res.data[0].loantypeId);
    setStatement(res.data[0]);
  }, []);

  const printPage = () => {
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div c style={{ width: 800, marginTop: 50 }}>

      <Card border="info" style={{ width: '49rem' }}>
                <Card.Header>განმცხადებლის შესახებ</Card.Header>
                <Card.Body>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                სახელი<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="კომპანიის დასახელება"
                                name="borrowerName"
                                value={statement?.user?.name}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                მოითითეთ კომპანიის დასახელება.
                            </Form.Control.Feedback>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                გვარი<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="საიდენტიფიკაციო ნომერი"
                                name="taxcode"
                                value={statement?.user?.lastName}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                საიდენტიფინაციო ნომერი.
                            </Form.Control.Feedback>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                მობილური<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="კომპანიის დასახელება"
                                name="borrowerName"
                                value={statement?.user?.phoneNumber}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                მოითითეთ კომპანიის დასახელება.
                            </Form.Control.Feedback>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                ელ. ფოსტა<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="კომპანიის დასახელება"
                                name="borrowerName"
                                value={statement?.user?.email}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                მოითითეთ კომპანიის დასახელება.
                            </Form.Control.Feedback>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <br></br>

        {/* {productType == 3 ? businessLoan() : ""} */}
        {productType == 3 ? (
          <BusinessLoan statement={statement} setStatement={setStatement} />
        ) : (
          ""
        )}

        {/* {productType == 1 ? consumerLoan() : ""} */}
        {productType == 1 ? (
          <ConsumerLoan statement={statement} setStatement={setStatement} disabled={true}/>
        ) : (
          ""
        )}

        {/* {productType == 4 ? agroLoan() : ""} */}
        {productType == 4 ? (
          <AgroLoan statement={statement} setStatement={setStatement} disabled={true}/>
        ) : (
          ""
        )}

        {/* {consumerLoan()} */}
        {/* {productType == 2 ? mortgageLoan() : ""} */}
        {productType == 2 ? (
          <MortgageLoan statement={statement} setStatement={setStatement} disabled={true}/>
        ) : (
          ""
        )}

        {/* {productType == 6 ? autoLeasing() : ""} */}
        {productType == 6 ? (
          <AutoLeasing statement={statement} setStatement={setStatement} disabled={true}/>
        ) : (
          ""
        )}

        {/* {productType == 5 ? creditCard() : ""} */}
        {productType == 5 ? (
          <CreditCard statement={statement} setStatement={setStatement} disabled={true}/>
        ) : (
          ""
        )}
      </div>
      <br />
      <div className="print">
        <Button
          type="primary"
          icon={<PrinterOutlined style={{ color: "white" }} />}
          onClick={() => window.print()}
        >
          ბეჭდვა
        </Button>
        <Button
          style={{marginLeft: 15}}
          icon={<CloseOutlined />}
          onClick={() => history.push('/bank')}
        >
          დახურვა
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default StatementDetail;
