import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { evaluate } from 'mathjs';

const CompositeSimpson = () => {
    const [equation, setEquation] = useState("x^2");
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [n, setN] = useState(4);
    const [result, setResult] = useState(null);

    const calculateCompositeSimpson = (equation, a, b, n) => {
        if (n % 2 !== 0) {
            alert("n ต้องเป็นจำนวนคู่สำหรับ Composite Simpson's Rule");
            return;
        }
        
        const h = (b - a) / n;
        let sum = evaluate(equation, { x: a }) + evaluate(equation, { x: b });

        for (let i = 1; i < n; i++) {
            const x = a + i * h;
            const fx = evaluate(equation, { x: x });

            if (i % 2 === 0) {
                sum += 2 * fx;
            } else {
                sum += 4 * fx;
            }
        }

        const result = (h / 3) * sum;
        setResult(result);
    };

    const calculateIntegration = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const nNum = parseInt(n);
        if (!isNaN(aNum) && !isNaN(bNum) && nNum > 0) {
            calculateCompositeSimpson(equation, aNum, bNum, nNum);
        } else {
            alert("กรุณาใส่ค่าที่ถูกต้องสำหรับ a, b และ n");
        }
    };

    const API = async () => {
        try {
            const response = await axios.get("http://localhost:5555/api/getData/CompositeSimpson");
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
                    <p>ผลการคำนวณโดยใช้ Composite Simpson's Rule = {result.toFixed(6)}</p>
                )}
            </div>
        </Container>
    );
};

export default CompositeSimpson;
