import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import axios from "axios";

const SecantMethod = () => {
    const [equation, setEquation] = useState("(x^3) - x - 2");
    const [X0, setX0] = useState(0);
    const [X1, setX1] = useState(1);
    const [iterations, setIterations] = useState([]);

    const error = (xNew, xOld) => Math.abs((xNew - xOld) / xNew) * 100;

    const calculateSecant = (x0, x1) => {
        let xNew, fX0, fX1, ea;
        let iter = 0;
        const MAX_ITER = 50;
        const TOLERANCE = 0.00001;
        const results = [];
        
        do {
            fX0 = evaluate(equation, { x: x0 });
            fX1 = evaluate(equation, { x: x1 });
            xNew = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
            ea = error(xNew, x1);

            iter++;
            results.push({
                iteration: iter,
                x0: x0,
                x1: x1,
                xNew: xNew,
                error: ea
            });

            x0 = x1;
            x1 = xNew;
        } while (ea > TOLERANCE && iter < MAX_ITER);

        setIterations(results);
    };

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        const x1num = parseFloat(X1);
        if (!isNaN(x0num) && !isNaN(x1num)) {
            calculateSecant(x0num, x1num);
        } else {
            alert("กรุณาใส่ตัวเลขที่ถูกต้องสำหรับ X0 และ X1");
        }
    };

    // ดึงข้อมูลจาก API ที่เชื่อมกับ MongoDB
    const API = async () => {
        try {
            const response = await axios.get("http://localhost:5555/api/getSecantData"); // แก้ endpoint
            const { equation, x0, x1 } = response.data;
            setEquation(equation);
            setX0(x0);
            setX1(x1);
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
                    <Form.Label>Input X0</Form.Label>
                    <input
                        type="number"
                        value={X0}
                        onChange={(e) => setX0(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input X1</Form.Label>
                    <input
                        type="number"
                        value={X1}
                        onChange={(e) => setX1(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="primary" onClick={API}>ดึงข้อมูลจาก API</Button>
                <Button variant="dark" onClick={calculateRoot}>
                    คำนวณผลลัพธ์
                </Button>
            </Form>
            <br />
            <h5>ผลลัพธ์:</h5>
            <div>
                {iterations.map((item, index) => (
                    <p key={index}>
                        Iteration {item.iteration}: X0 = {item.x0.toFixed(6)}, X1 = {item.x1.toFixed(6)}, 
                        X_New = {item.xNew.toFixed(6)}, Error = {item.error.toFixed(6)}%
                    </p>
                ))}
            </div>
        </Container>
    );
};

export default SecantMethod;
