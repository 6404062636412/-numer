import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LinearSpline = () => {
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

  const calculateLinearSpline = () => {
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);

    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const x0 = sortedPoints[i].x;
      const y0 = sortedPoints[i].y;
      const x1 = sortedPoints[i + 1].x;
      const y1 = sortedPoints[i + 1].y;

      if (inputX >= x0 && inputX <= x1) {
        const slope = (y1 - y0) / (x1 - x0);
        const approx = y0 + slope * (inputX - x0);
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
          value={points[index]?.x || ""}
          onChange={(e) => handlePointsChange(e, index, 'x')}
          placeholder={`x${index}`}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          value={points[index]?.y || ""}
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

  const API = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/getData/LinearSpline');
      const { points, inputX } = response.data;
      setNumPoints(points.length);
      setPoints(points);
      setInputX(inputX);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <div>
      <h2>Linear Spline Interpolation</h2>
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
          value={inputX || ""}
          onChange={(e) => setInputX(parseFloat(e.target.value))}
          placeholder="Enter x value to approximate"
          style={{ marginBottom: '10px' }}
        />
      </div>
      <button onClick={API}>API</button>
      <button onClick={calculateLinearSpline}>Calculate</button>
      {approxValue !== null && (
        <div style={{ marginTop: '20px' }}>
          <p>At x = {inputX}, Approximate y = {approxValue}</p>
        </div>
      )}
    </div>
  );
};

export default LinearSpline;
