import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';
import BisectionTable from './BisectionTable';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bisection = () => {
    const [data, setData] = useState([]);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [dataId, setDataId] = useState(""); // สร้าง state สำหรับเก็บ id

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calbisection = (xl, xr) => {
        let xm, fXm, fXr, ea, scope;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        let newData = [];

        do {
            xm = (xl + xr) / 2.0;
            scope = { x: xr };
            fXr = evaluate(Equation, scope);

            scope = { x: xm };
            fXm = evaluate(Equation, scope);

            iter++;
            ea = error(xr, xm);

            newData.push({
                iteration: iter,
                Xl: xl,
                Xm: xm,
                Xr: xr
            });

            if (fXm * fXr > 0) {
                xr = xm;
            } else {
                xl = xm;
            }
        } while (ea > e && iter < MAX);

        setData(newData);
        setX(xm);
    };

    const inputEquation = (event) => {
        setEquation(event.target.value);
    };

    const inputXL = (event) => {
        setXL(event.target.value);
    };

    const inputXR = (event) => {
        setXR(event.target.value);
    };

    const inputId = (event) => {
        setDataId(event.target.value);
    };

    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        const xrnum = parseFloat(XR);
        if (!isNaN(xlnum) && !isNaN(xrnum)) {
            Calbisection(xlnum, xrnum);
        } else {
            alert("Please enter valid numbers for XL and XR.");
        }
    };

    const ValuesAPI = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getdata/${dataId}`);
            const { Equation: equationFromAPI, xl, xr } = response.data;
            
            if (equationFromAPI && !isNaN(xl) && !isNaN(xr)) {
                setEquation(equationFromAPI);
                setXL(xl);
                setXR(xr);
            } else {
                alert("Invalid data received from API.");
            }
        } catch (error) {
            console.error('Error fetching data from API:', error);
            alert("Error fetching data from API.");
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Data ID</Form.Label>
                    <input type="text" value={dataId} onChange={inputId} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                    <Form.Label>Input XL</Form.Label>
                    <input type="number" value={XL} onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                    <Form.Label>Input XR</Form.Label>
                    <input type="number" value={XR} onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button variant="info" onClick={ValuesAPI} style={{ marginLeft: '10px' }}>
                    API
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(20)}</h5>
            <BisectionTable data={data} /> 
        </Container>
    );
};

export default Bisection;
