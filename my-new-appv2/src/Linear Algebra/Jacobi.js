import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Jacobi = () => {
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [initialX, setInitialX] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [result, setResult] = useState([]);
  const [iterations, setIterations] = useState(100);

  useEffect(() => {
    if (numRows > 0 && numCols > 0) {
      setMatrixA(Array.from({ length: numRows }, () => Array(numCols).fill(0)));
      setMatrixB(Array(numRows).fill(0));
      setInitialX(Array(numRows).fill(0));
    }
  }, [numRows, numCols]);

  const handleMatrixAChange = (e, rowIndex, colIndex) => {
    const newMatrixA = [...matrixA];
    newMatrixA[rowIndex][colIndex] = parseFloat(e.target.value) || 0;
    setMatrixA(newMatrixA);
  };

  const handleMatrixBChange = (e, rowIndex) => {
    const newMatrixB = [...matrixB];
    newMatrixB[rowIndex] = parseFloat(e.target.value) || 0;
    setMatrixB(newMatrixB);
  };

  const handleInitialXChange = (e, index) => {
    const newInitialX = [...initialX];
    newInitialX[index] = parseFloat(e.target.value) || 0;
    setInitialX(newInitialX);
  };

  const calculateJacobi = () => {
    const n = matrixA.length;
    const A = matrixA.map(row => row.slice());
    const B = [...matrixB];

    let X = [...initialX];
    let newX = Array(n).fill(0);
    const iterationResults = [];

    for (let it = 0; it < iterations; it++) {
      const X_prev = [...X];
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            sum += A[i][j] * X_prev[j];
          }
        }
        newX[i] = (B[i] - sum) / A[i][i];
      }
      iterationResults.push({ iteration: it + 1, values: [...newX] });
      X = [...newX];
    }

    setResult(iterationResults);
  };

  const createMatrixAInputs = () => {
    return matrixA.map((row, rowIndex) => (
      <div key={`rowA${rowIndex}`}>
        {row.map((value, colIndex) => (
          <input
            type="number"
            key={`a${rowIndex}${colIndex}`}
            value={value}
            onChange={(e) => handleMatrixAChange(e, rowIndex, colIndex)}
            placeholder={`A[${rowIndex}][${colIndex}]`}
            style={{ width: '50px', margin: '5px' }}
          />
        ))}
      </div>
    ));
  };

  const createMatrixBInputs = () => {
    return matrixB.map((value, rowIndex) => (
      <div key={`rowB${rowIndex}`}>
        <input
          type="number"
          value={value}
          onChange={(e) => handleMatrixBChange(e, rowIndex)}
          placeholder={`B[${rowIndex}]`}
          style={{ width: '50px', margin: '5px' }}
        />
      </div>
    ));
  };

  const createInitialXInputs = () => {
    return initialX.map((value, index) => (
      <div key={`initialX${index}`}>
        <input
          type="number"
          value={value}
          onChange={(e) => handleInitialXChange(e, index)}
          placeholder={`X${index + 1} Initial`}
          style={{ width: '50px', margin: '5px' }}
        />
      </div>
    ));
  };

  const handleRowChange = (e) => {
    const rows = parseInt(e.target.value);
    if (rows > 0) {
      setNumRows(rows);
      setMatrixA(Array.from({ length: rows }, () => Array(numCols).fill(0)));
      setMatrixB(Array(rows).fill(0));
      setInitialX(Array(rows).fill(0));
    }
  };

  const handleColChange = (e) => {
    const cols = parseInt(e.target.value);
    if (cols > 0) {
      setNumCols(cols);
      setMatrixA(Array.from({ length: numRows }, () => Array(cols).fill(0)));
    }
  };

  const API = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/getData/Jacobi');
      console.log(response.data);
      const { matrixA, matrixB, rows, cols, initialX } = response.data;
      setNumRows(rows);
      setNumCols(cols);
      setMatrixA(matrixA);
      setMatrixB(matrixB);
      setInitialX(initialX);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <div>
      <h2>Jacobi Method</h2>
      <div>
        <input
          type="number"
          value={numRows}
          onChange={handleRowChange}
          placeholder="Number of rows"
        />
        <input
          type="number"
          value={numCols}
          onChange={handleColChange}
          placeholder="Number of columns"
        />
        <label>Iterations: </label>
        <input
          type="number"
          value={iterations}
          onChange={(e) => setIterations(parseInt(e.target.value))}
        />
      </div>
      <h3>Initial Values for X:</h3>
      <div>{createInitialXInputs()}</div>
      <h3>Matrix A (Coefficients):</h3>
      <div>{createMatrixAInputs()}</div>
      <h3>Matrix B (Constants):</h3>
      <div>{createMatrixBInputs()}</div>
      <button onClick={API}>API</button>
      <button onClick={calculateJacobi}>Calculate</button>
      {result.length > 0 && (
        <div>
          {result.map((res, index) => (
            <div key={index}>
              <h5>Iteration {res.iteration}</h5>
              {res.values.map((value, i) => (
                <p key={i}>X{i + 1} = {value.toFixed(6)}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jacobi;