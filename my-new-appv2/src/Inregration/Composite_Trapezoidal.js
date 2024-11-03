import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { evaluate } from 'mathjs';

const CompositeTrapezoidal = () => {
    const [equation, setEquation] = useState("x^2");
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [n, setN] = useState(4);
    const [result, setResult] = useState(null);

    const calculateCompositeTrapezoidal = (equation, a, b, n) => {
        const h = (b - a) / n;
        let sum = 0;

        for (let i = 0; i <= n; i++) {
            const x = a + i * h;
            const fx = evaluate(equation, { x: x });
            
            if (i === 0 || i === n) {
                sum += fx;
            } else {
                sum += 2 * fx;
            }
        }

        const result = (h / 2) * sum;
        setResult(result);
    };

    const calculateIntegration = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const nNum = parseInt(n);
        if (!isNaN(aNum) && !isNaN(bNum) && nNum > 0) {
            calculateCompositeTrapezoidal(equation, aNum, bNum, nNum);
        } else {
            alert("กรุณาใส่ค่าที่ถูกต้องสำหรับ a, b และ n");
        }
    };

    const API = async () => {
        try {
            const response = await axios.get("http://localhost:5555/api/getData/CompositeTrapezoidal");
            const { equation, a, b, n } = response.data;
            setEquation(equation);
            setA(a);
            setB(b);
            setN(n);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("ไม่สามารถดึงข้อมูลจาก API ได้");
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input a (lower bound)</Form.Label>
                    <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input b (upper bound)</Form.Label>
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input n (number of subintervals)</Form.Label>
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" onClick={API}>ดึงข้อมูลจาก API</Button>
                <Button variant="dark" onClick={calculateIntegration}>
                    คำนวณผลลัพธ์
                </Button>
            </Form>
            <br />
            <h5>ผลลัพธ์:</h5>
            <div>
                {result !== null && (
                    <p>ผลการคำนวณโดยใช้ Composite Trapezoidal = {result.toFixed(6)}</p>
                )}
            </div>
        </Container>
    );
};

export default CompositeTrapezoidal;
