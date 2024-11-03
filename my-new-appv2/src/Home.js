import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <h1>Home</h1>
            <h1>RootOfEquation</h1>
            <Link to="/bisection">
                <Button variant="dark">Bisection</Button>
            </Link>
            <Link to="/FalsePosition">
                <Button variant="dark">FalsePosition</Button>
            </Link>
            <Link to="/OnePoint">
                <Button variant="dark">OnePoint</Button>
            </Link>
            <Link to="/Newton">
                <Button variant="dark">Newton</Button>
            </Link>
            <Link to="/SecantMethod">
                <Button variant="dark">secant</Button>
            </Link>
            <h1>Linear Algebra</h1>
            <Link to="/Cramerrule">
                <Button variant="dark">Cramerrule</Button>
            </Link>            
            <Link to="/GaussElimination">
                <Button variant="dark">GaussElimination</Button>
            </Link>
            <Link to="/MatrixInversion">
                <Button variant="dark">MatrixInversion</Button>
            </Link>
            <Link to="/Jacobi">
                <Button variant="dark">Jacobi</Button>
            </Link>
            <Link to="/GaussSeidel">
                <Button variant="dark">GaussSeidel</Button>
            </Link>
            <Link to="/GaussJordan">
                <Button variant="dark">GaussJordan</Button>
            </Link>
            <h1>INTERPOLATION</h1>
            <Link to="/Newton_divided">
                <Button variant="dark">Newton_divided</Button>
            </Link>
            <Link to="/Lagrange">
                <Button variant="dark">Lagrange</Button>
            </Link>
            <Link to="/LinearSpline">
                <Button variant="dark">LinearSpline</Button>
            </Link>
            <Link to="/CubicSpline">
                <Button variant="dark">CubicSpline</Button>
            </Link>
            <h1>Regression</h1>
            <Link to="/LinearRegression">
                <Button variant="dark">LinearRegression</Button>
            </Link>
            <Link to="/MultipleRegression">
                <Button variant="dark">MultipleRegression</Button>
            </Link>
            <h1>Integration</h1>
            <Link to="/Trapezoidal">
                <Button variant="dark">Trapezoidal</Button>
            </Link>
            <Link to="/SimpsonsRule">
                <Button variant="dark">SimpsonsRule</Button>
            </Link>
            <Link to="/CompositeTrapezoidal">
                <Button variant="dark">CompositeTrapezoidal</Button>
            </Link>
            <Link to="/CompositeSimpson">
                <Button variant="dark">CompositeSimpson</Button>
            </Link>
            <h1>DIFF</h1>
            <Link to="/DividedDifferences">
                <Button variant="dark">DividedDifferences</Button>
            </Link>
        </Container>
        
    );
};

export default Home;
