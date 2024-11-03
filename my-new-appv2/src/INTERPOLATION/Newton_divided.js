import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NewtonDividedDifferences = () => {
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

  const calculateNewtonPolynomial = () => {
    const n = points.length;
    const table = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      table[i][0] = points[i].y;
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / (points[i + j].x - points[i].x);
      }
    }

    let terms = [`${table[0][0]}`];
    for (let i = 1; i < n; i++) {
      let term = `${table[0][i].toFixed(20)}`;
      for (let j = 0; j < i; j++) {
        term += ` * (x - ${points[j].x})`;
      }
      terms.push(term);
    }

    const polynomial = terms.join(" + ");
    setPolynomial(polynomial);

    let approx = table[0][0];
    let product = 1;
    for (let i = 1; i < n; i++) {
      product *= (inputX - points[i - 1].x);
      approx += table[0][i] * product;
    }

    setApproxValue(approx);
  };

  const createPointsInputs = () => {
    return Array.from({ length: numPoints }, (_, index) => (
      <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <input
          type="number"
          placeholder={`x${index}`}
          onChange={(e) => handlePointsChange(e, index, 'x')}
          value={points[index]?.x || ""}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          placeholder={`y${index}`}
          onChange={(e) => handlePointsChange(e, index, 'y')}
          value={points[index]?.y || ""}
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
      const response = await axios.get('http://localhost:5555/api/getData/NewtonDivided');
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
      <h2>Newton's Divided Differences</h2>
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
          onChange={(e) => setInputX(parseFloat(e.target.value))}
          value={inputX || ""}
          placeholder="Enter x value to approximate"
          style={{ marginBottom: '10px' }}
        />
      </div>
      <button onClick={API}>Fetch Data from API</button>
      <button onClick={calculateNewtonPolynomial}>Calculate</button>
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

export default NewtonDividedDifferences;
