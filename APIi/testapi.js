const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Secant, FalsePosition, OnePoint, Newton, Cramer, GaussElimination, GaussJordan, GaussSeidel, Jacobi, MatrixInversion, NewtonDivided, Lagrange, LinearSpline, CubicSpline, LinearRegression, MultiplelRegression, Trapezoidal, Simpson, CompositeTrapezoidal, CompositeSimpson, DividedDifferences } = require("./models/Schema");

const app = express();
const port = 5555;

app.use(cors());
app.use(express.json());



// เชื่อมต่อกับ MongoDB
mongoose.connect("mongodb://localhost:27017/secantDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// เส้นทาง API เพื่อบันทึกข้อมูล Secant
app.post("/api/secant", async (req, res) => {
    const data = new Secant(req.body);
    await data.save();
    res.json({ message: "Secant data saved" });
});

// เส้นทาง API เพื่อบันทึกข้อมูล False Position
app.post("/api/FalsePosition", async (req, res) => {
    try {
        const falsePositionData = new FalsePosition(req.body);
        await falsePositionData.save();
        res.json({ message: "FalsePosition data saved", data: falsePositionData });
    } catch (error) {
        console.error("Error saving FalsePosition data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving FalsePosition data", error: error.message });
    }
});

app.post("/api/OnePoint", async (req, res) => {
    try {
        const OnePointData = new OnePoint(req.body);
        await OnePointData.save();
        res.json({ message: "OnePoint data saved", data: OnePointData });
    } catch (error) {
        console.error("Error saving OnePoint data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving OnePoint data", error: error.message });
    }
});

app.post("/api/Newton", async (req, res) => {
    try {
        const NewtonData = new Newton(req.body);
        await NewtonData.save();
        res.json({ message: "Newton data saved", data: NewtonData });
    } catch (error) {
        console.error("Error saving Newton data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Newton data", error: error.message });
    }
});

app.post("/api/Cramer", async (req, res) => {
    try {
        const CramerData = new Cramer(req.body);
        await CramerData.save();
        res.json({ message: "Cramer data saved", data: CramerData });
    } catch (error) {
        console.error("Error saving Cramer data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Cramer data", error: error.message });
    }
});

app.post("/api/GaussElimination", async (req, res) => {
    try {
        const GaussEliminationData = new GaussElimination(req.body);
        await GaussEliminationData.save();
        res.json({ message: "GaussElimination data saved", data: GaussEliminationData });
    } catch (error) {
        console.error("Error saving GaussElimination data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving GaussElimination data", error: error.message });
    }
});

app.post("/api/GaussJordan", async (req, res) => {
    try {
        const GaussJordanData = new GaussJordan(req.body);
        await GaussJordanData.save();
        res.json({ message: "GaussJordan data saved", data: GaussJordanData });
    } catch (error) {
        console.error("Error saving GaussJordan data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving GaussJordan data", error: error.message });
    }
});

app.post("/api/GaussSeidel", async (req, res) => {
    try {
        const GaussSeidelData = new GaussSeidel(req.body);
        await GaussSeidelData.save();
        res.json({ message: "GaussSeidel data saved", data: GaussSeidel });
    } catch (error) {
        console.error("Error saving GaussSeidel data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving GaussSeidel data", error: error.message });
    }
});

app.post("/api/Jacobi", async (req, res) => {
    try {
        const JacobiData = new Jacobi(req.body);
        await JacobiData.save();
        res.json({ message: "Jacobi data saved", data: Jacobi });
    } catch (error) {
        console.error("Error saving Jacobi data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Jacobi data", error: error.message });
    }
});

app.post("/api/MatrixInversion", async (req, res) => {
    try {
        const MatrixInversionData = new MatrixInversion(req.body);
        await MatrixInversionData.save();
        res.json({ message: "MatrixInversion data saved", data: MatrixInversion });
    } catch (error) {
        console.error("Error saving MatrixInversion data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving MatrixInversion data", error: error.message });
    }
});

app.post("/api/NewtonDivided", async (req, res) => {
    try {
        const NewtonDividedData = new NewtonDivided(req.body);
        await NewtonDividedData.save();
        res.json({ message: "NewtonDivided data saved", data: NewtonDivided });
    } catch (error) {
        console.error("Error saving NewtonDivided data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving NewtonDivided data", error: error.message });
    }
});

app.post("/api/Lagrange", async (req, res) => {
    try {
        const LagrangeData = new Lagrange(req.body);
        await LagrangeData.save();
        res.json({ message: "Lagrange data saved", data: Lagrange });
    } catch (error) {
        console.error("Error saving Lagrange data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Lagrange data", error: error.message });
    }
});

app.post("/api/LinearSpline", async (req, res) => {
    try {
        const LinearSplineData = new LinearSpline(req.body);
        await LinearSplineData.save();
        res.json({ message: "LinearSpline data saved", data: LinearSpline });
    } catch (error) {
        console.error("Error saving LinearSpline data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving LinearSpline data", error: error.message });
    }
});

app.post("/api/CubicSpline", async (req, res) => {
    try {
        const CubicSplineData = new CubicSpline(req.body);
        await CubicSplineData.save();
        res.json({ message: "CubicSpline data saved", data: CubicSpline });
    } catch (error) {
        console.error("Error saving CubicSpline data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving CubicSpline data", error: error.message });
    }
});

app.post("/api/LinearRegression", async (req, res) => {
    try {
        const LinearRegressionData = new LinearRegression(req.body);
        await LinearRegressionData.save();
        res.json({ message: "LinearRegression data saved", data: LinearRegression });
    } catch (error) {
        console.error("Error saving LinearRegression data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving LinearRegression data", error: error.message });
    }
});

app.post("/api/MultiplelRegression", async (req, res) => {
    try {
        const MultiplelRegressionData = new MultiplelRegression(req.body);
        await MultiplelRegressionData.save();
        res.json({ message: "MultiplelRegression data saved", data: MultiplelRegression });
    } catch (error) {
        console.error("Error saving MultiplelRegression data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving MultiplelRegression data", error: error.message });
    }
});

app.post("/api/Trapezoidal", async (req, res) => {
    try {
        const TrapezoidalData = new Trapezoidal(req.body);
        await TrapezoidalData.save();
        res.json({ message: "Trapezoidal data saved", data: Trapezoidal });
    } catch (error) {
        console.error("Error saving Trapezoidal data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Trapezoidal data", error: error.message });
    }
});

app.post("/api/Simpson", async (req, res) => {
    try {
        const SimpsonData = new Simpson(req.body);
        await SimpsonData.save();
        res.json({ message: "Simpson data saved", data: Simpson });
    } catch (error) {
        console.error("Error saving Simpson data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving Simpson data", error: error.message });
    }
});

app.post("/api/CompositeTrapezoidal", async (req, res) => {
    try {
        const CompositeTrapezoidalData = new CompositeTrapezoidal(req.body);
        await CompositeTrapezoidalData.save();
        res.json({ message: "CompositeTrapezoidal data saved", data: CompositeTrapezoidal });
    } catch (error) {
        console.error("Error saving CompositeTrapezoidal data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving CompositeTrapezoidal data", error: error.message });
    }
});

app.post("/api/CompositeSimpson", async (req, res) => {
    try {
        const CompositeSimpsonData = new CompositeSimpson(req.body);
        await CompositeSimpsonData.save();
        res.json({ message: "CompositeSimpson data saved", data: CompositeSimpson });
    } catch (error) {
        console.error("Error saving CompositeSimpson data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving CompositeSimpson data", error: error.message });
    }
});

app.post("/api/DividedDifferences", async (req, res) => {
    try {
        const DividedDifferencesData = new DividedDifferences(req.body);
        await DividedDifferencesData.save();
        res.json({ message: "DividedDifferences data saved", data: DividedDifferences });
    } catch (error) {
        console.error("Error saving DividedDifferences data:", error); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: "Error saving DividedDifferences data", error: error.message });
    }
});

// ---------------------------------------------------------------------------------------------------------------------------------------
app.get("/api/getSecantData", async (req, res) => {
    try {
        const secantData = await Secant.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(secantData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// เส้นทาง API เพื่อดึงข้อมูลล่าสุดของ False Position
app.get("/api/getData/FalsePosition", async (req, res) => {
    try {
        const data = await FalsePosition.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

// เส้นทาง API เพื่อดึงข้อมูลล่าสุดของ False Position
app.get("/api/getData/OnePoint", async (req, res) => {
    try {
        const data = await OnePoint.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/Newton", async (req, res) => {
    try {
        const data = await Newton.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/Cramer", async (req, res) => {
    try {
        const data = await Cramer.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/GaussElimination", async (req, res) => {
    try {
        const data = await GaussElimination.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/GaussJordan", async (req, res) => {
    try {
        const data = await GaussJordan.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/GaussSeidel", async (req, res) => {
    try {
        const data = await GaussSeidel.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/Jacobi", async (req, res) => {
    try {
        const data = await Jacobi.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/MatrixInversion", async (req, res) => {
    try {
        const data = await MatrixInversion.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/NewtonDivided", async (req, res) => {
    try {
        const data = await NewtonDivided.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/Lagrange", async (req, res) => {
    try {
        const data = await Lagrange.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/LinearSpline", async (req, res) => {
    try {
        const data = await LinearSpline.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/CubicSpline", async (req, res) => {
    try {
        const data = await CubicSpline.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/LinearRegression", async (req, res) => {
    try {
        const data = await LinearRegression.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/MultiplelRegression", async (req, res) => {
    try {
        const data = await MultiplelRegression.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});
app.get("/api/getData/Trapezoidal", async (req, res) => {
    try {
        const data = await Trapezoidal.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});
app.get("/api/getData/Trapezoidal", async (req, res) => {
    try {
        const data = await Trapezoidal.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});
app.get("/api/getData/Simpson", async (req, res) => {
    try {
        const data = await Simpson.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/CompositeTrapezoidal", async (req, res) => {
    try {
        const data = await CompositeTrapezoidal.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/CompositeSimpson", async (req, res) => {
    try {
        const data = await CompositeSimpson.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.get("/api/getData/DividedDifferences", async (req, res) => {
    try {
        const data = await DividedDifferences.findOne().sort({ _id: -1 }); // ดึงข้อมูลล่าสุด
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
