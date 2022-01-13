import { useState, Fragment, lazy, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import constants from '../../constants'


export function ConsumerLoan({ statement, setStatement, setValidated, disabled }) {

    const [municipals, setMunicipals] = useState([]);
    const [controledMunicipals, setControledMunicipals] = useState([]);
    const [deposit, setDeposit] = useState(0);
    const [incomeSource, setIncomeSource] = useState([]);
    const [workExperiance, setWorkExperiance] = useState([]);
    const [regions, setRegions] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [monthlyAverageIncomeValidate, setMonthlyAverageIncomeValidate] = useState(null);
    const [agroType, setAgroType] = useState("physical");


    useEffect(async () => {
        // Good!
        console.log('ConsumerLoanConsumerLoanConsumerLoanConsumerLoanConsumerLoanConsumerLoan')
        let us = JSON.parse(localStorage.getItem("user"));
        // setUser(localStorage.getItem('user'))
        // setCurrentUser(us);

        // setStatement({ ...statement, userId: us?.id });
        // console.log("currentUser", currentUser);

        var result1 = await axios.get(constants.API_PREFIX +`/api/IncomeSource`,{
            params: {
              token: us?.token
            }});
        console.log('result IncomeSource', result1)
        setIncomeSource(result1.data);
        var result2 = await axios.get(constants.API_PREFIX +`/api/WorkExperience`,{
            params: {
              token: us?.token
            }});
        console.log("result WorkExperience", result2);
        setWorkExperiance(result2.data);

        var regionsRes = await axios.get(constants.API_PREFIX +`/api/Region`,{
            params: {
              token: us?.token
            }});
        console.log("result regions", regionsRes);
        setRegions(regionsRes.data)

        var municipalsRes = await axios.get(constants.API_PREFIX +`/api/Municipal`,{
            params: {
              token: us?.token
            }});
        console.log("result municipals", municipalsRes);
        setMunicipals(municipalsRes.data)

        var cc = [...municipalsRes.data.filter(r => r.regionId == statement.regionId)];
        console.log(111111111111, cc)

        setControledMunicipals([...cc])


        if(statement?.requestedAmount || statement?.term){
            let t = statement?.term;
            let r = statement?.requestedAmount;
            
            let per = 1 / 100;
            let x = Math.pow((1 + per), t);
            console.log('xxxxxxxxxxx', x)
            var res = r / ((1 - (1 / x)) / per);
            setDeposit(res.toFixed(2))
        }
        

    }, []);

    const calculateMonthlyAverageIncome = () =>{
        console.log('currency', statement)
        if(statement.loantypeId != 1 && statement.loantypeId != 2){
            setMonthlyAverageIncomeValidate(true)
            return
        }
        if (statement.currency == "GEL") {
            if (statement?.monthlyAverageIncome < 1000) {
                // setValidated(true)
                let monthlyAverageIncomePart = statement?.monthlyAverageIncome * 25 / 100;

                let valid = monthlyAverageIncomePart > deposit ? true : false
                setMonthlyAverageIncomeValidate(valid)

                console.log('statement.monthlyAverageIncome', statement.monthlyAverageIncome)

            } else {
                let monthlyAverageIncomePart = statement?.monthlyAverageIncome * 50 / 100;

                let valid = monthlyAverageIncomePart > deposit ? true : false
                setMonthlyAverageIncomeValidate(valid)
            }
        } else {
            console.log('elslelsllelsllell')
            if (statement?.monthlyAverageIncome < 1000) {
                // setValidated(true)
                let monthlyAverageIncomePart = statement?.monthlyAverageIncome * 20 / 100;

                let valid = monthlyAverageIncomePart > deposit ? true : false
                setMonthlyAverageIncomeValidate(valid)

                console.log('statement.monthlyAverageIncome', statement.monthlyAverageIncome)

            } else {
                let monthlyAverageIncomePart = statement?.monthlyAverageIncome * 30 / 100;

                let valid = monthlyAverageIncomePart > deposit ? true : false
                setMonthlyAverageIncomeValidate(valid)
            }
        }

    }

    useEffect(async () => {
        console.log('5556666')
        calculateMonthlyAverageIncome();

    }, [statement?.monthlyAverageIncome,statement?.currency, statement?.term, statement?.requestedAmount]);

    const handleChangeOverlay = (e) => {
        console.log("eee", e.target.checked);
        setOverlay(e.target.checked);
    };

    const handleChangeInput = (e) => {
        console.log('change', statement, e.target.name, e.target.value)
        if (e.target.name == 'regionId') {
            var cc = [...municipals.filter(r => r.regionId == e.target.value)];
            console.log(111111111111, cc)

            setControledMunicipals([...cc])
        }
        // setStatement({...statement, deposit: res})
        //10%
        setStatement({ ...statement, [e.target.name]: e.target.value });

        //setStatement({...statement, kk: res})
        if (e.target.name == 'term' || e.target.name == 'requestedAmount') {
            let t;
            let r;
            if (e.target.name == 'requestedAmount') {
                t = statement.term;
                r = e.target.value;
            }
            if (e.target.name == 'term') {
                t = e.target.value;
                r = statement.requestedAmount;
            }
            let per = 1 / 100;
            let x = Math.pow((1 + per), t);
            console.log('xxxxxxxxxxx', x)
            var res = r / ((1 - (1 / x)) / per);
            setDeposit(res.toFixed(2))
        }

        //თვიური შემოსავლის ვალიდაცია

        if (e.target.name == 'currentOverdue') {
            setStatement({ ...statement, [e.target.name]: JSON.parse(e.target.value) });
        }
        console.log("statement", statement);
    };
    return (
        <>
            <Card border="info" style={{ width: '49rem' }}>
                <Card.Header>მოთხოვნილი პროდუქტი</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div >
                            <div className="form-row">
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{fontSize:'15px'}}>
                                        მოთხოვნილი თანხა <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <Form.Control
                                      min="0"
                                        required
                                        type="number"
                                        className="form-control"
                                        id="inputEmail4"
                                        placeholder="თანხა"
                                        name="requestedAmount"
                                        value={statement?.requestedAmount}
                                        onChange={handleChangeInput}
                                        disabled={disabled}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        მიუთითეთ მოთხოვნილი თანხა.
                                    </Form.Control.Feedback>
                                </div>
                                <div className=" col-md-2">
                                    <label for="inputEmail4" style={{fontSize:'15px'}}>
                                        ვალუტა<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                        id="inputcurrency"
                                        className="form-control"
                                        name="currency"
                                        value={statement?.currency}
                                        onChange={handleChangeInput}
                                        disabled={disabled}
                                    >
                                        <option >GEL</option>
                                        <option>USD</option>
                                        <option>EUR</option>
                                    </select>
                                </div>
                                <div className=" col-md-2">
                                    {statement?.loantypeId != 5 ? (
                                        <>
                                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                                ვადა (თვე)<span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                              min="0"
                                                required
                                                type="number"
                                                className="form-control"
                                                id="inputPassword4"
                                                placeholder="ვადა"
                                                name="term"
                                                value={statement?.term}
                                                onChange={handleChangeInput}
                                                disabled={disabled}
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
                                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                                შენატანი (სავარაუდო)
                                            </label>
                                            <input
                                                disabled
                                                type="number"
                                                className="form-control"
                                                id="inputPassword4"
                                                placeholder="შენატანი"
                                                name="deposit"
                                                value={deposit}
                                                disabled={disabled}
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
            <br>
            </br>

            <Card border="info" style={{ width: '49rem' }}>
                <Card.Header>შემოსავლები</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <label for="inputPassword4" style={{fontSize:'15px'}}>
                                    თვიური საშუალო შემოსავალი (ლარში) <span style={{ color: "red" }}>*</span>
                                </label>
                                <Form.Control
                                    min="0"
                                    required
                                    type="number"
                                    className="form-control"
                                    id="inputPassword4"
                                    placeholder="შემოსავალი"
                                    name="monthlyAverageIncome"
                                    value={statement?.monthlyAverageIncome}
                                    onChange={handleChangeInput}
                                    isInvalid={statement?.monthlyAverageIncome ? !monthlyAverageIncomeValidate : false}
                                    isValid={monthlyAverageIncomeValidate}
                                    disabled={disabled}
                                />
                                {/* <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="inputPassword4"
                                    placeholder="შემოსავალი"
                                    name="monthlyAverageIncome"
                                    value={statement?.monthlyAverageIncome}
                                    onChange={handleChangeInput}
                                    isInvalid={statement?.monthlyAverageIncome  > 10}
                                    isValid={statement?.monthlyAverageIncome<  11}
                                /> */}
                                <Form.Control.Feedback type="invalid">
                                    {/* მიუთითეთ თვიური საშუალო შემოსავალი. */}
                                    შემოსავალი არ არის საკმარისი სესხის მომსახურებისთვის,
                                    გაზარდეთ სესხის ვადა ან შეამცირეთ თანხა
                                </Form.Control.Feedback>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputState" style={{fontSize:'15px'}}>
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
                                    disabled={disabled}
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
                                        {/* <>
                                            <label for="inputPassword4" style={{fontSize:'15px'}}>
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
                                            />
                                        </> */}
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
                                        <label for="inputState" style={{fontSize:'15px'}}>
                                            სად გერიცხებათ ხელფასი<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <select
                                            required
                                            id="inputState"
                                            className="form-control"
                                            name="incomeAccrue"
                                            value={statement?.incomeAccrue}
                                            onChange={handleChangeInput}
                                            disabled={disabled}
                                        >
                                            <option selected></option>
                                            <option value="ბანკში">ბანკში</option>
                                            <option value="ხელზე">ხელზე</option>
                                        </select>
                                        <Form.Control.Feedback type="invalid">
                                            მიუთითეთ  სად გერიცებათ ხელფასი.
                                        </Form.Control.Feedback>
                                    </div>
                                    {/* <div className="form-group col-md-7">
                                        <label for="inputState" style={{fontSize:'15px'}}>
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
                                            მიუთითეთ  სტაჟი.
                                        </Form.Control.Feedback>
                                    </div> */}
                                </>
                            )}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />



            <Card border="info" style={{ width: '49rem' }}>
                <Card.Header>დამატებითი ინფორმაცია</Card.Header>
                <Card.Body>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                ფაქტიური მისამართი<span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <select
                                        required
                                        id="inputState"
                                        className="form-control"
                                        name="regionId"
                                        value={statement?.regionId}
                                        onChange={handleChangeInput}
                                        disabled={disabled}
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
                                {/* <div className="form-group col-md-6">
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
                                </div> */}

                            </div>

                            <Form.Control.Feedback type="invalid">
                                მიუთითეთ  მისამართი.
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
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                სხვა არსებული სესხები (ჯამურად ლარში)
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              min="0"
                                required
                                type="number"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="ჯამი"
                                name="existingLoans"
                                onChange={handleChangeInput}
                                value={statement?.existingLoans}
                                disabled={disabled}
                            />
                            <Form.Control.Feedback type="invalid">
                                სხვა არსებული სესხები (ჯამურად).
                            </Form.Control.Feedback>
                        </div>
                        <div className="form-group col-md-7">
                            <label for="inputPassword4" style={{fontSize:'15px'}}>
                                რამდენს იხდით სესხებში ყოველთვიურად? (ლარში)
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              min="0"
                                required
                                type="number"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="თანხა"
                                name="montlyPaidAmount"
                                onChange={handleChangeInput}
                                value={statement?.montlyPaidAmount}
                                disabled={disabled}
                            />
                            <Form.Control.Feedback type="invalid">
                                სხვა არსებული სესხები (ჯამურად).
                            </Form.Control.Feedback>
                        </div>
                        <div className="form-group col-md-5">
                            <label for="inputState" style={{fontSize:'15px'}}>
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
                                disabled={disabled}
                            >
                                <option selected></option>
                                <option value={true}>მაქვს მიმდინარე ვადაგადაცილება</option>
                                <option value={false}>არ მაქვს ვადაგადაცილება</option>
                            </select>
                            <Form.Control.Feedback type="invalid">
                                აირჩიეთ .
                            </Form.Control.Feedback>
                        </div>
                        {/* <div className="form-group col-md-6">
                            <label>
                                {" "}
                                <input
                                    type="checkbox"
                                    checked={overlay}
                                    onChange={handleChangeOverlay}
                                />{" "}
                                აპირებთ თუ არა სხვა სესხების გადაფარვას?{" "}
                            </label>
                        </div>
                        {overlay ? (
                            <>
                                <div className="form-group col-md-6">
                                    <input
                                      min="0"
                                        type="number"
                                        className="form-control"
                                        id="inputPassword4"
                                        placeholder="მიუთითეთ თანხა"
                                        name="overlayAmount"
                                        onChange={handleChangeInput}
                                        value={statement?.overlayAmount}
                                    />
                                </div>
                            </>
                        ) : (
                            ""
                        )} */}
                    </div>
                </Card.Body>
            </Card>



        </>
    );
}



