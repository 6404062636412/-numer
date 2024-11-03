import { Table, Container } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

const OnepointTable = ({ data }) => {
    const chartData = {
        labels: data.map(item => `Iteration ${item.iteration}`),
        datasets: [
            {
                label: 'X Values',
                data: data.map(item => item.X),
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
                                <th width="30%">X Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Graph of X Values</h3>
                    <Line data={chartData} />
                </>
            )}
        </Container>
    );
};

export default OnepointTable;
