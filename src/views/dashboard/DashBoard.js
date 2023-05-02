import React from "react";
import "components/Dashboard/Dashboard.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import Footer from "components/Footers/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

let labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataYear = {
  labels,
  datasets: [
    {
      label: "User Visits",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Page Views",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Subscriptions",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgba(255, 205, 86, 0.5)",
    },
  ],
};

labels = [];

for (let i = 1; i <= 30; i++) {
  labels.push(i.toString());
}

export const dataMonthly = {
  labels,
  datasets: [
    {
      label: "User Visits",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Page Views",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 500)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Subscriptions",
      data: [...Array(30)].map(() => Math.floor(Math.random() * 50)),
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgba(255, 205, 86, 0.5)",
    },
  ],
};

labels = ["Food", "Transport", "Attraction", "Accomodation", "Others"];

const colors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
];

export const dataBar = {
  labels,
  datasets: [
    {
      label: "View",
      data: [...Array(30)].map(() =>
        Math.floor(Math.random() * (100 - 10 + 1) + 10)
      ),
      backgroundColor: colors,
    },
  ],
};

export function DashBoard() {
  return (
    <>
      <ExamplesNavbar isTransparent={false} />
      <div className="section main">
        <div className="section section-dark text-center dashboard-section">
          <Container>
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Highest Traffic</h4>
                    <span className="h2 font-weight-bold">350,897</span>
                    <br></br>
                    <span className="h5">per hour</span>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-alert-circle-i" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Page Views</h4>
                    <span className="h2 font-weight-bold mb-0">12045</span>
                    <br></br>
                    <span className="h5">for today</span>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-single-02" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Subscribers</h4>
                    <span className="h2 font-weight-bold mb-2">4023</span>
                    <br></br>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-satisfied mr-3" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Overall Rating</h4>
                    <span className="h2 font-weight-bold mb-0">4.5/5.0</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase  ls-1 mb-1">Overview</h6>
                      <h2 className=" mb-0">Blog Insight</h2>
                    </div>
                    <div className="col">
                      {/* <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          
                        >
                          <span className="d-none d-md-block">This Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          
                        >
                          <span className="d-none d-md-block">This Year</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav> */}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Line options={options} data={dataYear} />
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Analysis
                      </h6>
                      <h2 className="mb-0">Topic Engagement </h2>
                    </div>
                    <Bar data={dataBar} />
                  </Row>
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right"></div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Topic</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Number of Comments</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>Food</td>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="nc-icon nc-satisfied mr-3" /> 4.6
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>Attraction</td>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="nc-icon nc-satisfied mr-3" /> 3.2
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>Accomodation</td>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="nc-icon nc-satisfied mr-3" /> 1.5
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>Transport</td>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="nc-icon nc-satisfied mr-3" /> 2.3
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>Culture</td>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="nc-icon nc-satisfied mr-3" /> 5.0
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right"></div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col"> Total Share</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="progress-container progress-primary">
                          <span className="progress-badge">60%</span>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="progress-bar-primary"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="progress-container progress-danger">
                          <span className="progress-badge">50%</span>
                          <Progress
                            max="100"
                            value="50"
                            barClassName="progress-bar-danger"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="progress-container progress-warning">
                          <span className="progress-badge">77%</span>
                          <Progress
                            max="100"
                            value="77"
                            barClassName="progress-bar-warning"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="progress-container progress-success">
                          <span className="progress-badge">46%</span>
                          <Progress
                            max="100"
                            value="46"
                            barClassName="progress-bar-success"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />

      </div>
    </>
  );
}

export default DashBoard;
