const mongoose = require("mongoose");

const secantSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    x0: { type: Number, required: true },
    x1: { type: Number, required: true }
});

const falsePositionSchema = new mongoose.Schema({
    Equation: { type: String, required: true },
    xl: { type: Number, required: true },
    xr: { type: Number, required: true }
});

const onePointSchema = new mongoose.Schema({
    Equation: { type: String, required: true },
    X0: { type: Number, required: true }    
});

const NewtonSchema = new mongoose.Schema({
    Equation: { type: String, required: true },
    X0: { type: Number, required: true }    
});

const cramerSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true },
    matrixB: { type: [Number], required: true },  
    rows: { type: Number, required: true },       
    cols: { type: Number, required: true }     
});

const gaussEliminationSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true }, 
    matrixB: { type: [Number], required: true },   
    rows: { type: Number, required: true },        
    cols: { type: Number, required: true }         
});

const gaussJordanSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true }, 
    matrixB: { type: [Number], required: true },   
    rows: { type: Number, required: true },        
    cols: { type: Number, required: true }         
});

const gaussSeidelSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true },
    matrixB: { type: [Number], required: true },  
    rows: { type: Number, required: true },        
    cols: { type: Number, required: true },       
    initialX: { type: [Number], required: true }   
});

const jacobiSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true },  
    matrixB: { type: [Number], required: true },    
    rows: { type: Number, required: true },        
    cols: { type: Number, required: true },        
    initialX: { type: [Number], required: true } 
});

const matrixInversionSchema = new mongoose.Schema({
    matrixA: { type: [[Number]], required: true }, // 2D array for matrix A
    matrixB: { type: [Number], required: true },   // Array for matrix B
    rows: { type: Number, required: true },        // Number of rows
    cols: { type: Number, required: true }         // Number of columns
});

const newtonDividedSchema = new mongoose.Schema({
    points: {
        type: [
            {
                x: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    },
    inputX: { type: Number, required: true } 
});

const lagrangeSchema = new mongoose.Schema({
    points: {
        type: [
            {
                x: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    },
    inputX: { type: Number, required: true } // ค่าที่ต้องการใช้ในการคำนวณค่า y โดยใช้พหุนาม Lagrange
});

const linearSplineSchema = new mongoose.Schema({
    points: {
        type: [
            {
                x: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    },
    inputX: { type: Number, required: true }
});

const cubicSplineSchema = new mongoose.Schema({
    points: {
        type: [
            {
                x: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    },
    inputX: { type: Number, required: true }
});

const linearRegressionSchema = new mongoose.Schema({
    points: {
        type: [
            {
                x: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    }
});

const multiplelRegressionSchema = new mongoose.Schema({
    dataPoints: {
        type: [
            {
                x1: { type: Number, required: true },
                x2: { type: Number, required: true },
                x3: { type: Number, required: true },
                y: { type: Number, required: true }
            }
        ],
        required: true
    },
    coefficients: {
        type: [Number], // ค่าสัมประสิทธิ์ของพหุนามที่คำนวณได้
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const trapezoidalSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    a: { type: Number, required: true }, // Lower bound
    b: { type: Number, required: true }, // Upper bound
    n: { type: Number, required: true }, // Number of subintervals
    result: { type: Number, required: false }, // Calculated result
    createdAt: { type: Date, default: Date.now }
});


const simpsonSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    a: { type: Number, required: true }, 
    b: { type: Number, required: true }, 
    n: { type: Number, required: true }, 
    result: { type: Number, required: false }, 
    createdAt: { type: Date, default: Date.now }
});


const compositeTrapezoidalSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    a: { type: Number, required: true }, 
    b: { type: Number, required: true }, 
    n: { type: Number, required: true }, 
    result: { type: Number, required: false }, 
    createdAt: { type: Date, default: Date.now }
});


const compositeSimpsonSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    a: { type: Number, required: true }, 
    b: { type: Number, required: true }, 
    n: { type: Number, required: true }, 
    result: { type: Number, required: false }, 
    createdAt: { type: Date, default: Date.now }
});

const dividedDifferencesSchema = new mongoose.Schema({
    equation: { type: String, required: true },
    x: { type: Number, required: true },
    h: { type: Number, required: true }
});

const DividedDifferences = mongoose.model('DividedDifferences', dividedDifferencesSchema, "DividedDifferences");
const CompositeSimpson = mongoose.model('CompositeSimpson', compositeSimpsonSchema, "CompositeSimpson");
const CompositeTrapezoidal = mongoose.model('CompositeTrapezoidal', compositeTrapezoidalSchema, "CompositeTrapezoidal");
const Simpson = mongoose.model('Simpson', simpsonSchema, "Simpson");
const Trapezoidal = mongoose.model('Trapezoidal', trapezoidalSchema, "Trapezoidal");
const MultiplelRegression = mongoose.model('MultiplelRegression', multiplelRegressionSchema, "MultiplelRegression");
const LinearRegression = mongoose.model('LinearRegression', linearRegressionSchema, "LinearRegression");
const CubicSpline = mongoose.model('CubicSpline', cubicSplineSchema, "CubicSpline");
const LinearSpline = mongoose.model('LinearSpline', linearSplineSchema, "LinearSpline");
const Lagrange = mongoose.model('Lagrange', lagrangeSchema, "Lagrange");
const NewtonDivided = mongoose.model('NewtonDivided', newtonDividedSchema, "NewtonDivided");
const MatrixInversion = mongoose.model("MatrixInversion", matrixInversionSchema, "MatrixInversion");
const Jacobi = mongoose.model("Jacobi", jacobiSchema, "Jacobi");
const GaussSeidel = mongoose.model("GaussSeidel", gaussSeidelSchema, "GaussSeidel");
const GaussJordan = mongoose.model("GaussJordan", gaussJordanSchema, "GaussJordan");
const GaussElimination = mongoose.model("GaussElimination", gaussEliminationSchema, "GaussElimination");
const Cramer = mongoose.model("Cramer", cramerSchema, "Cramer");
const Secant = mongoose.model("Secant", secantSchema, "Secant");
const FalsePosition = mongoose.model("FalsePosition", falsePositionSchema, "FalsePosition");
const OnePoint = mongoose.model("OnePoint", onePointSchema, "OnePoint");
const Newton = mongoose.model("Newton", NewtonSchema, "Newton");

module.exports = { Secant, FalsePosition, OnePoint,Newton,Cramer,GaussElimination,GaussJordan,GaussSeidel,Jacobi,MatrixInversion,NewtonDivided,Lagrange,LinearSpline,CubicSpline,LinearRegression,MultiplelRegression,Trapezoidal,Simpson,CompositeTrapezoidal,CompositeSimpson,DividedDifferences };
