import React, { useEffect, useState }  from "react";
import "components/Dashboard/Dashboard.scss";
import { dataYear } from "./LineChartData";
import { dataBar } from "./BarChartData";
import { queryUserBlog } from "api/queryBlog";
import { getPostsWithCommentCount } from "api/analysis";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
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

export function DashBoard() {

  
  const userTemp = JSON.parse(localStorage.getItem("currentUser"));
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const fetchedPostList = await getPostsWithCommentCount (userTemp.uid); // Replace `authorId` with the appropriate value
        setPostList(fetchedPostList);
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    };
  
    fetchPostList();
  }, []);
  
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
                    <Bar options={options} data={dataBar} />
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
                    {/* fetched data is print out in the table */}
                  {postList.map((post) => (
        <tr key={post.postId}>
          <th scope="row">{post.topic}</th>
          <td>{post.topic}</td>
          <td>-</td>
          <td>{post.commentCount}</td>
          <td><i className="nc-icon nc-satisfied mr-3" />
          {post.rating.toString()}</td> {/* Convert rating to a string */}
        </tr>
      ))}
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
