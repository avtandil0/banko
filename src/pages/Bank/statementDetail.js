import React, { useState, Fragment, lazy, useEffect } from "react";
import {
    useParams
  } from "react-router-dom";



import { PrinterOutlined } from '@ant-design/icons';

     
  import { ConsumerLoan } from "../../components/LoanTypes/ConsumerLoan";
import { MortgageLoan } from "../../components/LoanTypes/MortgageLoan";
import { BusinessLoan } from "../../components/LoanTypes/BusinessLoan";
import { AgroLoan } from "../../components/LoanTypes/AgroLoan";
import { CreditCard } from "../../components/LoanTypes/CreditCard";
import { AutoLeasing } from "../../components/LoanTypes/AutoLeasing";
import axios from "axios";
import constants from '../../constants'
import {
    Button,
  } from "antd";

const StatementDetail = () => {
    let { id } = useParams();

    const [statement, setStatement] = useState({})
    const [productType, setProductType] = useState(0)

    useEffect(async () => {

        let us = JSON.parse(localStorage.getItem("user"));
        var res = await axios.get(
            constants.API_PREFIX + `/api/Home/getById/${id}`,
            {
              params: {
                token: us?.token
              }
            });
            console.log('resresres',res)
            setProductType(res.data[0].statementStatus)
            setStatement(res.data[0])
      }, []);

    
    return (
      <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
        
          <div c style={{width: 800, marginTop: 50}}>
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
                          />
                        ) : (
                          ""
                        )}

                        {/* {productType == 4 ? agroLoan() : ""} */}
                        {productType == 4 ? (
                          <AgroLoan
                            statement={statement}
                            setStatement={setStatement}
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
                
                <div>

                <Button type="primary" icon={<PrinterOutlined  style={{ color: 'white' }} />}>
                </Button>
                </div>
       
      </div>
    );
  };
  
  export default StatementDetail;
  