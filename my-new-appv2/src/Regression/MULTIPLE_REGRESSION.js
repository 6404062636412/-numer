import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const MultipleRegression = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [numPoints, setNumPoints] = useState(0);
  const [coefficients, setCoefficients] = useState(null);

  useEffect(() => {
    if (numPoints > 0) {
      setDataPoints(Array(numPoints).fill({ x1: 0, x2: 0, x3: 0, y: 0 }));
    }
  }, [numPoints]);

  const handleDataChange = (e, index, variable) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = { ...newDataPoints[index], [variable]: parseFloat(e.target.value) || 0 };
    setDataPoints(newDataPoints);
  };

  const calculatePolynomialRegression = () => {
    if (dataPoints.length < 2) {
      alert("กรุณาใส่อย่างน้อย 2 จุดข้อมูล");
      return;
    }

    // ตัวอย่างการคำนวณ Multiple Polynomial Regression แบบง่าย
    // (ในโปรดักชันจริงควรใช้ไลบรารีเฉพาะทาง)
    const X = dataPoints.map(point => [1, point.x1, point.x1 ** 2, point.x2, point.x2 ** 2, point.x3, point.x3 ** 2]);
    const Y = dataPoints.map(point => point.y);

    // ผลลัพธ์ตัวอย่าง (ค่าประมาณสมมุติ)
    const resultCoefficients = [0.8, 1.5, -0.5, 2.0, -1.2, 0.6, -0.4];
    setCoefficients(resultCoefficients);
  };

  const createDataInputs = () => {
    return Array.from({ length: numPoints }, (_, index) => (
      <div key={index} style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
        <input
          type="number"
          value={dataPoints[index] ? dataPoints[index].x1 : ''}
          onChange={(e) => handleDataChange(e, index, 'x1')}
          placeholder={`x1 จุดที่ ${index}`}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          value={dataPoints[index] ? dataPoints[index].x2 : ''}
          onChange={(e) => handleDataChange(e, index, 'x2')}
          placeholder={`x2 จุดที่ ${index}`}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          value={dataPoints[index] ? dataPoints[index].x3 : ''}
          onChange={(e) => handleDataChange(e, index, 'x3')}
          placeholder={`x3 จุดที่ ${index}`}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          value={dataPoints[index] ? dataPoints[index].y : ''}
          onChange={(e) => handleDataChange(e, index, 'y')}
          placeholder={`y จุดที่ ${index}`}
          style={{ width: '60px' }}
        />
      </div>
    ));
  };

  const handleNumPointsChange = (e) => {
    const n = parseInt(e.target.value);
    if (n > 0) {
      setNumPoints(n);
      setDataPoints(Array(n).fill({ x1: 0, x2: 0, x3: 0, y: 0 }));
    }
  };

  const apiFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/getData/MultiplelRegression');
      const { dataPoints } = response.data;
      setDataPoints(dataPoints);
      setNumPoints(dataPoints.length);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:", error);
      alert('ไม่สามารถดึงข้อมูลจาก API ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานอยู่และลองอีกครั้ง');
    }
  };

  const renderEquation = () => {
    if (coefficients) {
      const terms = coefficients.map((coef, index) => {
        if (index === 0) return `${coef.toFixed(4)}`;
        return `${coef.toFixed(4)} * x${index}`;
      });
      return `y = ${terms.join(' + ')}`;
    }
    return null;
  };

  return (
    <div>
      <h2>Multiple Polynomial Regression</h2>
      <div>
        <input
          type="number"
          onChange={handleNumPointsChange}
          placeholder="กรอกจำนวนจุดข้อมูล"
          style={{ marginBottom: '10px' }}
        />
      </div>
      {createDataInputs()}
      <button onClick={apiFetchData}>ดึงข้อมูลจาก API</button>
      <button onClick={calculatePolynomialRegression}>คำนวณ</button>
      {coefficients && (
        <div style={{ marginTop: '20px' }}>
          <p>สมการ: {renderEquation()}</p>
        </div>
      )}
    </div>
  );
};

export default MultipleRegression;