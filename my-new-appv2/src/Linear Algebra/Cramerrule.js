import React, { useState, useEffect } from 'react';
import { det } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Cramerrule = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (rows > 0 && cols > 0) {
      const newMatrixA = Array.from({ length: rows }, () => Array(cols).fill(0));
      const newMatrixB = Array(rows).fill(0);
      setMatrixA(newMatrixA);
      setMatrixB(newMatrixB);
    }
  }, [rows, cols]);

  const fetchValuesFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/getData/Cramer');
      console.log(response.data); // ตรวจสอบข้อมูลที่ได้จาก API
      const { matrixA, matrixB, rows, cols } = response.data;
      setRows(rows);
      setCols(cols);
      setMatrixA(matrixA);
      setMatrixB(matrixB);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };



  const handleMatrixChange = (e, rowIndex, colIndex) => {
    const newMatrixA = [...matrixA];
    newMatrixA[rowIndex][colIndex] = parseFloat(e.target.value) || 0;
    setMatrixA(newMatrixA);
  };

  const handleMatrixBChange = (e, index) => {
    const newMatrixB = [...matrixB];
    newMatrixB[index] = parseFloat(e.target.value) || 0;
    setMatrixB(newMatrixB);
  };

  const createMatrixInputs = () => {
    return matrixA.map((row, rowIndex) => (
      <div key={`row${rowIndex}`}>
        {row.map((value, colIndex) => (
          <input
            type="number"
            key={`a${rowIndex}${colIndex}`}
            value={value} // กำหนดค่าเริ่มต้นจาก matrixA
            onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
            placeholder={`A[${rowIndex}][${colIndex}]`}
            style={{ width: '50px', margin: '5px' }}
          />
        ))}
      </div>
    ));
  };


  const calculateCramer = () => {
    const detA = det(matrixA);
    console.log(detA)

    if (detA === 0) {
      alert('Matrix A is singular, no unique solution.');
      return;
    }

    const results = [];
    for (let i = 0; i < cols; i++) {
      let matrixAi = matrixA.map((row) => [...row]);
      for (let j = 0; j < rows; j++) {
        matrixAi[j][i] = matrixB[j];
        console.log(j)
        console.log(i)
      }
      const detAi = det(matrixAi);
      results.push(detAi / detA);
    }

    setResult(results);
  };

  return (
    <div>
      <h2>Cramer’s Rule</h2>
      <div>
        <label>Rows: </label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Math.max(0, parseInt(e.target.value)))}
          min="1"
        />
        <label>Cols: </label>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Math.max(0, parseInt(e.target.value)))}
          min="1"
        />
      </div>
      <h3>Matrix A:</h3>
      <div>{createMatrixInputs()}</div>
      <h3>Matrix B:</h3>
      <div>
        {Array.from({ length: rows }, (_, index) => (
          <input
            type="number"
            key={`b${index}`}
            value={matrixB[index] || 0} // กำหนดค่าเริ่มต้นจาก matrixB
            onChange={(e) => handleMatrixBChange(e, index)}
            placeholder={`B[${index}]`}
            style={{ width: '50px', margin: '5px' }}
          />
        ))}
      </div>
      <button onClick={fetchValuesFromAPI}>API</button>
      <div>
        <button onClick={calculateCramer}>Calculate</button>
      </div>    
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

export default Cramerrule;
