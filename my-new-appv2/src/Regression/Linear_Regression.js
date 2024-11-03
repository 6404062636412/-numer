import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LinearRegression = () => {
    const [points, setPoints] = useState([]);
    const [numPoints, setNumPoints] = useState(0);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);

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

    const calculateLinearRegression = () => {
        if (points.length < 2) {
            alert("Please provide at least 2 points.");
            return;
        }

        const n = points.length;
        const sumX = points.reduce((sum, point) => sum + point.x, 0);
        const sumY = points.reduce((sum, point) => sum + point.y, 0);
        const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
        const sumX2 = points.reduce((sum, point) => sum + point.x * point.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        setSlope(slope);
        setIntercept(intercept);
    };

    const createPointsInputs = () => {
        return Array.from({ length: numPoints }, (_, index) => (
            <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <input
                    type="number"
                    value={points[index] ? points[index].x : ''}
                    onChange={(e) => handlePointsChange(e, index, 'x')}
                    placeholder={`x${index}`}
                    style={{ width: '60px' }}
                />
                <input
                    type="number"
                    value={points[index] ? points[index].y : ''}
                    onChange={(e) => handlePointsChange(e, index, 'y')}
                    placeholder={`y${index}`}
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
            const response = await axios.get('http://localhost:5555/api/getData/LinearRegression');
            const { points } = response.data;
            setPoints(points);
            setNumPoints(points.length);
        } catch (error) {
            console.error('Error fetching data from API:', error);
            alert('Failed to fetch data from API. Please check if the server is running and try again.');
        }
    };

    return (
        <div>
            <h2>Linear Regression</h2>
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
                <button onClick={fetchFromAPI}>Fetch Data from API</button>
                <button onClick={calculateLinearRegression}>Calculate</button>
            </div>
            {slope !== null && intercept !== null && (
                <div style={{ marginTop: '20px' }}>
                    <p>Slope (m) = {slope.toFixed(6)}</p>
                    <p>Intercept (b) = {intercept.toFixed(6)}</p>
                    <p>Equation: y = {slope.toFixed(6)}x + {intercept.toFixed(6)}</p>
                </div>
            )}
        </div>
    );
};

export default LinearRegression;