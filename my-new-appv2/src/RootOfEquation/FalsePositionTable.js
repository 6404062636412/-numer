import { Table, Container } from "react-bootstrap";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(...registerables);

const FalsePositionTable = ({ data }) => {
    
    const chartData = {
        labels: data.map((item) => `Iteration ${item.iteration}`),
        datasets: [
            {
                label: 'XL',
                data: data.map((item) => item.Xl),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'XM',
                data: data.map((item) => item.Xm),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
            {
                label: 'XR',
                data: data.map((item) => item.Xr),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <Container>
            {data.length > 0 && (
                <>
                    
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th width="10%">Iteration</th>
                                <th width="30%">XL</th>
                                <th width="30%">XM</th>
                                <th width="30%">XR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.Xl}</td>
                                    <td>{element.Xm}</td>
                                    <td>{element.Xr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    
                    <h3>Graph of XL, XM, and XR</h3>
                    <Line data={chartData} />
                </>
            )}
        </Container>
    );
};

export default FalsePositionTable;
