import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';
import FalsePositionTable from './FalsePositionTable';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FalsePosition = () => {
    const [Equation, setEquation] = useState("(x^4)-13");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [X, setX] = useState(0);
    const [data, setData] = useState([]);

    const error = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    const calculateRoot = () => {
        let xl = parseFloat(XL);
        let xr = parseFloat(XR);
        
        
        if (xl >= xr) {
            alert("XL must be less than XR.");
            return;
        }

        const e = 0.00001;
        let iter = 0;
        let MAX = 50;
        let xm;
        const localData = [];
        do {
            let fXl = evaluate(Equation, { x: xl });
            let fXr = evaluate(Equation, { x: xr });

            xm = xr - (fXr * (xl - xr)) / (fXl - fXr);
            let fXm = evaluate(Equation, { x: xm });

            localData.push({
                iteration: iter + 1,
                Xl: xl,
                Xm: xm,
                Xr: xr,
                fXl: fXl,
                fXr: fXr,
                fXm: fXm,
            });

            if (fXm * fXr < 0) {
                xl = xm;
            } else {
                xr = xm;
            }

            iter++;
        } while (error(xl, xr) > e && iter < MAX);

        setX(xm);
        setData(localData);
    };

    const ValuesAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/getData/FalsePosition');
            const { Equation, xl, xr } = response.data;
            setEquation(Equation);
            setXL(xl);
            setXR(xr);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            alert('Failed to fetch data from API. Please try again later.');
        }
    };

    // useEffect(() => {
    //     ValuesAPI();
    // }, []);

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" value={Equation} onChange={e => setEquation(e.target.value)} className="form-control" />
                    <Form.Label>Input XL</Form.Label>
                    <input type="number" value={XL} onChange={e => setXL(e.target.value)} className="form-control" />
                    <Form.Label>Input XR</Form.Label>
                    <input type="number" value={XR} onChange={e => setXR(e.target.value)} className="form-control" />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
                <Button variant="info" onClick={ValuesAPI} style={{ marginLeft: '10px' }}>API</Button>               
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(20)}</h5>
            <FalsePositionTable data={data} />
        </Container>
    );
};

export default FalsePosition;
