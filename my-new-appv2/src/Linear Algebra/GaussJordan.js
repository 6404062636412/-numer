import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const GaussJordan = () => {
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (numRows > 0 && numCols > 0) {
      setMatrixA(Array.from({ length: numRows }, () => Array(numCols).fill(0)));
      setMatrixB(Array(numRows).fill(0));
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

  const calculateGaussJordan = () => {
    const n = matrixA.length;
    const A = matrixA.map(row => row.slice());
    const B = [...matrixB];

    const augmentedMatrix = A.map((row, i) => [...row, B[i]]);

    for (let i = 0; i < n; i++) {
      const divisor = augmentedMatrix[i][i];
      if (divisor === 0) {
        alert('Matrix is singular or no unique solution exists.');
        return;
      }
      
      for (let j = 0; j < augmentedMatrix[i].length; j++) {
        augmentedMatrix[i][j] /= divisor;
      }

      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const multiplier = augmentedMatrix[j][i];
          for (let k = 0; k < augmentedMatrix[j].length; k++) {
            augmentedMatrix[j][k] -= multiplier * augmentedMatrix[i][k];
          }
        }
      }
    }

    const X = augmentedMatrix.map(row => row[row.length - 1]);
    setResult(X);
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

  const handleRowChange = (e) => {
    const rows = parseInt(e.target.value) || 0;
    setNumRows(rows);
    setMatrixA(Array.from({ length: rows }, () => Array(numCols).fill(0)));
    setMatrixB(Array(rows).fill(0));
  };

  const handleColChange = (e) => {
    const cols = parseInt(e.target.value) || 0;
    setNumCols(cols);
    setMatrixA(Array.from({ length: numRows }, () => Array(cols).fill(0)));
  };

  const API = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/getData/gaussJordan');
      console.log(response.data); // ตรวจสอบข้อมูลที่ได้จาก API
      const { matrixA, matrixB, rows, cols } = response.data;
      setNumRows(rows);
      setNumCols(cols);
      setMatrixA(matrixA);
      setMatrixB(matrixB);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <div>
      <h2>Gauss-Jordan</h2>
      <div>
        <label>Rows: </label>
        <input
          type="number"
          value={numRows}
          onChange={handleRowChange}
          placeholder="Enter number of equations (rows)"
          min="1"
        />
        <label>Cols: </label>
        <input
          type="number"
          value={numCols}
          onChange={handleColChange}
          placeholder="Enter number of variables (columns)"
          min="1"
        />
      </div>
      <h3>Matrix A:</h3>
      <div>{createMatrixAInputs()}</div>
      <h3>Matrix B:</h3>
      <div>{createMatrixBInputs()}</div>
      <button onClick={API}>API</button>
      <button onClick={calculateGaussJordan}>Calculate</button>
      {result.length > 0 && (
        <div>
          {result.map((res, index) => (
            <p key={index}>X{index + 1} = {res}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaussJordan;