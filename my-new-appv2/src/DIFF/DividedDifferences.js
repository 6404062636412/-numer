import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { evaluate } from 'mathjs';
import axios from 'axios';


const DividedDifferences = () => {
    const [equation, setEquation] = useState("x^2-3");
    const [x, setX] = useState(0);
    const [h, setH] = useState(0.1);
    const [results, setResults] = useState({});

    const calculateDifferences = () => {
        const forward1 = (evaluate(equation, { x: x + h }) - evaluate(equation, { x })) / h;
        const backward1 = (evaluate(equation, { x }) - evaluate(equation, { x: x - h })) / h;
        const central1 = (evaluate(equation, { x: x + h }) - evaluate(equation, { x: x - h })) / (2 * h);

        const forward2 = (-3 * evaluate(equation, { x }) + 4 * evaluate(equation, { x: x + h }) - evaluate(equation, { x: x + 2 * h })) / (2 * h);
        const backward2 = (3 * evaluate(equation, { x }) - 4 * evaluate(equation, { x: x - h }) + evaluate(equation, { x: x - 2 * h })) / (2 * h);
        const central2 = (-evaluate(equation, { x: x + 2 * h }) + 8 * evaluate(equation, { x: x + h }) - 8 * evaluate(equation, { x: x - h }) + evaluate(equation, { x: x - 2 * h })) / (12 * h);

        setResults({ forward1, backward1, central1, forward2, backward2, central2 });
    };
    const API = async () => {
        try {
            const response = await axios.get("http://localhost:5555/api/getData/DividedDifferences"); // แก้ endpoint
            const { equation, x, h } = response.data;
            setEquation(equation);
            setH(h);
            setX(x);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("ไม่สามารถดึงข้อมูลจาก API ได้");
        }
    };
    

    return (
        <div className="container">
            <h2>Divided Differences Calculations</h2>
            <div className="mb-3">
                <label>Input f(x)</label>
                <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    className="form-control"
                />
                <label>Input x</label>
                <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(parseFloat(e.target.value))}
                    className="form-control"
                />
                <label>Input h (step size)</label>
                <input
                    type="number"
                    value={h}
                    onChange={(e) => setH(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
            <button onClick={API}>API</button>
            <button className="btn btn-primary" onClick={calculateDifferences}>Calculate</button>
            {Object.keys(results).length > 0 && (
                <div className="mt-4">
                    <h5>Results:</h5>
                    <ul>
                        <li>Forward Divided-Differences (Error of order h): {results.forward1.toFixed(6)}</li>
                        <li>Backward Divided-Differences (Error of order h): {results.backward1.toFixed(6)}</li>
                        <li>Central Divided-Differences (Error of order h^2): {results.central1.toFixed(6)}</li>
                        <li>Forward Divided-Differences (Error of order h^2): {results.forward2.toFixed(6)}</li>
                        <li>Backward Divided-Differences (Error of order h^2): {results.backward2.toFixed(6)}</li>
                        <li>Central Divided-Differences (Error of order h^4): {results.central2.toFixed(6)}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DividedDifferences;
