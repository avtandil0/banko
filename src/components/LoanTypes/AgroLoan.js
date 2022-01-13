import { useState, Fragment, lazy, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { ConsumerLoan } from "./ConsumerLoan";
import { BusinessLoan } from "./BusinessLoan";

export function AgroLoan({ statement, setStatement, agroType, disabled }) {

    return (
        <>

            {agroType == "physical" ? <ConsumerLoan statement={statement} setStatement={setStatement} disabled={disabled}/>
            : <BusinessLoan statement={statement} setStatement={setStatement}  disabled={disabled}/>}

        </>
    );
}




