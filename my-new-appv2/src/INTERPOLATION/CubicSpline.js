import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CubicSpline = () => {
    const [points, setPoints] = useState([]);
    const [numPoints, setNumPoints] = useState(0);
    const [inputX, setInputX] = useState(null);
    const [approxValue, setApproxValue] = useState(null);

    useEffect(() => {
        if (numPoints > 0) {
            setPoints(Array(numPoints).fill({ x: 0, y: 0 }));
        }
    }, [numPoints]);

    const handlePointsChange = (e, index, axis) => {
        const newPoints = [...points];
        newPoints[index] = { ...newPoints[index], [axis]: parseFloat(e.target.value) || 0 };
        setPoints(newPoints);
    };

    const calculateCubicSpline = () => {
        if (points.length < 2) {
            alert("Please provide at least 2 points.");
            return;
        }

        const sortedPoints = [...points].sort((a, b) => a.x - b.x);
        const n = sortedPoints.length - 1;
        const h = [];
        const alpha = [];

        for (let i = 0; i < n; i++) {
            h[i] = sortedPoints[i + 1].x - sortedPoints[i].x;
            alpha[i] = 
                (3 / h[i]) * (sortedPoints[i + 1].y - sortedPoints[i].y) -
                (3 / h[i - 1]) * (sortedPoints[i].y - sortedPoints[i - 1]?.y || 0);
        }

        const l = Array(n + 1).fill(1);
        const mu = Array(n + 1).fill(0);
        const z = Array(n + 1).fill(0);

        for (let i = 1; i < n; i++) {
            l[i] = 2 * (sortedPoints[i + 1].x - sortedPoints[i - 1].x) - h[i - 1] * mu[i - 1];
            mu[i] = h[i] / l[i];
            z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
        }

        const c = Array(n + 1).fill(0);
        const b = Array(n).fill(0);
        const d = Array(n).fill(0);

        for (let j = n - 1; j >= 0; j--) {
            c[j] = z[j] - mu[j] * c[j + 1];
            b[j] = (sortedPoints[j + 1].y - sortedPoints[j].y) / h[j] - (h[j] * (c[j + 1] + 2 * c[j])) / 3;
            d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
        }

        for (let i = 0; i < n; i++) {
            if (inputX >= sortedPoints[i].x && inputX <= sortedPoints[i + 1].x) {
                const xi = sortedPoints[i].x;
                const yi = sortedPoints[i].y;
                const diff = inputX - xi;
                const approx = yi + b[i] * diff + c[i] * Math.pow(diff, 2) + d[i] * Math.pow(diff, 3);
                setApproxValue(approx);
                return;
            }
        }

        setApproxValue("Value is out of range of provided points.");
    };

    const createPointsInputs = () => {
        return Array.from({ length: numPoints }, (_, index) => (
            <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <input
                    type="number"
                    value={points[index]?.x || ''}
                    placeholder={`x${index}`}
                    onChange={(e) => handlePointsChange(e, index, 'x')}
                    style={{ width: '60px' }}
                />
                <input
                    type="number"
                    value={points[index]?.y || ''}
                    placeholder={`y${index}`}
                    onChange={(e) => handlePointsChange(e, index, 'y')}
                    style={{ width: '60px' }}
                />
            </div>
        ));
    };

    const handleNumPointsChange = (e) => {
        const n = parseInt(e.target.value);
        if (n > 0) {
            setNumPoints(n);
            setPoints(Array(n).fill({ x: 0, y: 0 }));
        }
    };

    const fetchFromAPI = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/getData/CubicSpline');
            const { points, inputX } = response.data;
            setNumPoints(points.length);
            setPoints(points);
            setInputX(inputX);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            alert('Failed to fetch data from API. Please check if the server is running and try again.');
        }
    };

    return (
        <div>
            <h2>Cubic Spline Interpolation</h2>
            <div>
                <input
                    type="number"
                    onChange={handleNumPointsChange}
                    placeholder="Enter number of points"
                    style={{ marginBottom: '10px' }}
                />
            </div>
            {createPointsInputs()}
            <div>
                <input
                    type="number"
                    value={inputX || ''}
                    onChange={(e) => setInputX(parseFloat(e.target.value) || '')}
                    placeholder="Enter x value to approximate"
                    style={{ marginBottom: '10px' }}
                />
            </div>
            <button onClick={fetchFromAPI}>Fetch Data from API</button>
            <button onClick={calculateCubicSpline}>Calculate</button>
            {approxValue !== null && (
                <div style={{ marginTop: '20px' }}>
                    <p>At x = {inputX}, Approximate y = {approxValue}</p>
                </div>
            )}
        </div>
    );
};

export default CubicSpline;
