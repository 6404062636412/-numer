import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewtonTable from "./NewtonTable";
import axios from "axios";

const NewtonRaphson = () => {
    const [data, setData] = useState([]);
    const [Equation, setEquation] = useState("x^-1 - 2");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState([]);

    const calculateRoot = () => {
        let xOld = parseFloat(X0);
        let xNew = 0;
        const epsilon = 0.00001;
        let iter = 0;
        const localData = [];

        while (iter < 50) {
            xNew = xOld - evaluate(Equation, { x: xOld }) / evaluate(derivative(Equation, 'x').toString(), { x: xOld });
            const error = Math.abs((xNew - xOld) / xNew) * 100;

            localData.push({
                iteration: iter + 1,
                X: xNew,
                error: isFinite(error) ? error : 1
            });

            if (error < epsilon) break;

            xOld = xNew;
            iter++;
        }

        setX(xNew);
        setData(localData);
    };

    const API = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/getData/Newton');
            const { Equation, X0 } = response.data;
            setEquation(Equation);
            setX0(X0);
            console.log(X0);
        } catch (error) {
            console.error("API error:", error);
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={Equation}
                        onChange={(e) => setEquation(e.target.value)}
                        style={{ width: "100%", margin: "0 auto" }}
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

            <h5>Answer = {X.toPrecision(20)}</h5>
            
            {data.length > 0 && <NewtonTable data={data} />}
        </Container>
    );
};

export default NewtonRaphson;