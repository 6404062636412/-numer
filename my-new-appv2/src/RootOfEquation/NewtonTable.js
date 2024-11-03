import { Table, Container } from "react-bootstrap";
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(...registerables);

const NewtonTable = ({ data }) => {
    const chartData = {
        labels: data.map((item) => `Iteration ${item.iteration}`),
        datasets: [
            {
                label: 'X',
                data: data.map((item) => item.X),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };
    console.log(data)

    return (
        <Container>
            {data.length > 0 && (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th width="20%">Iteration</th>
                                <th width="40%">X</th>
                                <th width="40%">Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X}</td>
                                    <td>{element.error ? element.error.toFixed(6) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Graph of Root Approximations</h3>
                    <Line data={chartData} />
                </>
            )}
        </Container>
    );
};

export default NewtonTable;
