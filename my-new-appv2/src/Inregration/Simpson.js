import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import axios from "axios";

const SimpsonsRule = () => {
    const [equation, setEquation] = useState("x^2");
    const [a, setA] = useState(0);
    const [b, setB] = useState(1);
    const [n, setN] = useState(4);
    const [result, setResult] = useState(null);

    const calculateSimpsonsRule = (equation, a, b, n) => {
        if (n % 2 !== 0) {
            alert("n ต้องเป็นจำนวนคู่สำหรับ Simpson's Rule");
            return;
        }
        const h = (b - a) / n;
        let sum = 0;

        for (let i = 0; i <= n; i++) {
            const x = a + i * h;
            const fx = evaluate(equation, { x: x });

            if (i === 0 || i === n) {
                sum += fx;
            } else if (i % 2 === 0) {
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
            calculateSimpsonsRule(equation, aNum, bNum, nNum);
        } else {
            alert("กรุณาใส่ค่าที่ถูกต้องสำหรับ a, b และ n");
        }
    };

    const API = async () => {
        try {
            const response = await axios.get("http://localhost:5555/api/getData/Simpson");
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
                        className="form-control"
                    />
                    <Form.Label>Input a (lower bound)</Form.Label>
                    <input
                        type="number"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="form-control"
                    />
                    <Form.Label>Input b (upper bound)</Form.Label>
                    <input
                        type="number"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="form-control"
                    />
                    <Form.Label>Input n (number of subintervals)</Form.Label>
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
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
                    <p>ผลการคำนวณโดยใช้กฎ Simpson = {result.toFixed(6)}</p>
                )}
            </div>
        </Container>
    );
};

export default SimpsonsRule;
