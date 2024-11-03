
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";
import Bisection from "./RootOfEquation/Bisection";
import FalsePosition from "./RootOfEquation/FalsePosition";
import OnePoint from "./RootOfEquation/OnePoint";
import Newton from "./RootOfEquation/Newton";
import Cramerrule from "./Linear Algebra/Cramerrule";
import GaussElimination from "./Linear Algebra/GaussElimination";
import GaussJordan from "./Linear Algebra/GaussJordan";
import Jacobi from "./Linear Algebra/Jacobi";
import MatrixInversion from "./Linear Algebra/MatrixInversion";
import SecantMethod from "./RootOfEquation/SecantMethod";
import GaussSeidel from "./Linear Algebra/GaussSeidel";
import Newton_divided from "./INTERPOLATION/Newton_divided";
import Lagrange from "./INTERPOLATION/Lagrange";
import LinearSpline from "./INTERPOLATION/LinearSpline";
import CubicSpline from "./INTERPOLATION/CubicSpline";
import LinearRegression from "./Regression/Linear_Regression";
import MultipleRegression from "./Regression/MULTIPLE_REGRESSION";
import Trapezoidal from "./Inregration/Trapezoidal";
import SimpsonsRule from "./Inregration/Simpson";
import CompositeTrapezoidal from "./Inregration/Composite_Trapezoidal";
import CompositeSimpson from "./Inregration/Composite_Simpson";
import DividedDifferences from "./DIFF/DividedDifferences";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bisection" element={<Bisection />} />
                <Route path="/FalsePosition" element={<FalsePosition />} />
                <Route path="/OnePoint" element={<OnePoint />} />
                <Route path="/Newton" element={<Newton />} />
                <Route path="/Cramerrule" element={<Cramerrule />} />
                <Route path="/GaussElimination" element={<GaussElimination />} />
                <Route path="/GaussJordan" element={<GaussJordan />} />
                <Route path="/Jacobi" element={<Jacobi />} />
                <Route path="/MatrixInversion" element={<MatrixInversion />} />            
                <Route path="/SecantMethod" element={<SecantMethod />} />
                <Route path="/GaussSeidel" element={<GaussSeidel />} />
                <Route path="/Newton_divided" element={<Newton_divided />} />
                <Route path="/Lagrange" element={<Lagrange />} />
                <Route path="/LinearSpline" element={<LinearSpline />} />
                <Route path="/CubicSpline" element={<CubicSpline />} />
                <Route path="/LinearRegression" element={<LinearRegression />} />
                <Route path="/MultipleRegression" element={<MultipleRegression />} />
                <Route path="/Trapezoidal" element={<Trapezoidal />} />
                <Route path="/SimpsonsRule" element={<SimpsonsRule />} />
                <Route path="/CompositeTrapezoidal" element={<CompositeTrapezoidal />} />
                <Route path="/CompositeSimpson" element={<CompositeSimpson />} />
                <Route path="/DividedDifferences" element={<DividedDifferences />} />
                
            </Routes>
        </Router>
)};

export default App;
