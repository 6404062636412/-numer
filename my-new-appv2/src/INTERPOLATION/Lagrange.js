import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LagrangeInterpolation = () => {
  const [points, setPoints] = useState([]);
  const [numPoints, setNumPoints] = useState(0);
  const [polynomial, setPolynomial] = useState("");
  const [approxValue, setApproxValue] = useState(null);
  const [inputX, setInputX] = useState(null);

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

  const calculateLagrangePolynomial = () => {
    const n = points.length;
    let terms = [];

    for (let i = 0; i < n; i++) {
      let term = `${points[i].y}`;
      let product = points[i].y;

      for (let j = 0; j < n; j++) {
        if (i !== j) {
          term += ` * ((x - ${points[j].x}) / (${points[i].x} - ${points[j].x}))`;
          product *= (inputX - points[j].x) / (points[i].x - points[j].x);
        }
      }
      terms.push(term);
    }

    const polynomial = terms.join(" + ");
    setPolynomial(polynomial);

    let approx = 0;
    for (let i = 0; i < n; i++) {
      let product = points[i].y;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          product *= (inputX - points[j].x) / (points[i].x - points[j].x);
        }
      }
      approx += product;
    }

    setApproxValue(approx);
  };

  const createPointsInputs = () => {
    return Array.from({ length: numPoints }, (_, index) => (
      <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <input
          type="number"
          value={points[index]?.x || ''} // Ensure value is shown
          onChange={(e) => handlePointsChange(e, index, 'x')}
          placeholder={`x${index}`}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          value={points[index]?.y || ''} // Ensure value is shown
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
      const response = await axios.get('http://localhost:5555/api/getData/Lagrange');
      console.log(response.data);
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
      <h2>Lagrange Interpolation</h2>
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
          value={inputX || ''} // Ensure value is shown
          onChange={(e) => setInputX(parseFloat(e.target.value))}
          placeholder="Enter x value to approximate"
          style={{ marginBottom: '10px' }}
        />
      </div>
      <button onClick={API}>Fetch Data from API</button>
      <button onClick={calculateLagrangePolynomial}>Calculate</button>
      {polynomial && (
        <div style={{ marginTop: '20px' }}>
          <p>{polynomial}</p>
          {approxValue !== null && (
            <div>
              <p>At x = {inputX}, y = {approxValue}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LagrangeInterpolation;
