import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';
import OnepointTable from './OnepointTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const OnePoint = () => {
    const [data, setData] = useState([]);
    const [Equation, setEquation] = useState("(x^-1)-2");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const calculateRoot = () => {
        let xOld = parseFloat(X0);
        let xNew;
        const e = 0.00001;
        let iter = 0;
        const MAX = 50;
        const localData = [];
        let ea;

        do {
            const scope = { x: xOld };
            xNew = evaluate(Equation, scope);
            iter++;

            ea = error(xOld, xNew);

            localData.push({
                iteration: iter,
                X: xNew
            });

            xOld = xNew;
        } while (ea > e && iter < MAX);

        setX(xNew);
        setData(localData);
    };

    const API = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/getData/OnePoint');
            const { Equation, X0 } = response.data;
            setEquation(Equation);
            setX0(X0);
            console.log(X0)
        } catch(error){
            console.error("API error:", error);
        }
    };
    

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                    <input
                        type="text"
                        value={Equation}
                        onChange={(e) => setEquation(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input X0</Form.Label>
                    <input
                        type="number"
                        value={X0}
                        onChange={(e) => setX0(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="danger" onClick={API}>API</Button>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(20)}</h5>
            <OnepointTable data={data} />
        </Container>
    );
};

export default OnePoint;
