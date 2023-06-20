import React, { useEffect, useState }  from "react";
import "components/Dashboard/Dashboard.scss";
import { dataYear } from "./LineChartData";
import { dataBar } from "./BarChartData";
import {  getPostsWithCommentCount, fetchTagCounts ,fetchPostView } from "api/analysis";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,Nav, 
  NavItem, 
  NavLink
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
  Legend,
  ArcElement
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

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
const currentYear = currentDate.getFullYear();

const parseTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const [month, day, year] = formattedDate.split(' ');

  return [parseInt(year), month, parseInt(day)];
};



const generateDataBar = (data) => {

  const labels = Object.keys(data);
  const values = Object.values(data);

  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
  ];

  const dataBar = {
    labels,
    datasets: [
      {
        label: "View",
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  return dataBar;
};

const generateDataLine = (dataPost,viewData) => {

  const dailyPostCounts = {}; // Object to store the count of posts for each day
  const dailyViewCounts = {};

  // Initialize dayCounts object with day numbers as keys and initial count of 0
  for (let day = 1; day <= currentDay; day++) {
    dailyPostCounts [day] = 0;
    dailyViewCounts [day] = 0;
  }

  dataPost.forEach(obj => {
    
    const timePost = parseTimestamp(obj.timestamp);
  if (timePost[0] == currentYear && timePost[1]  == currentMonth){
    // Increment the count for the corresponding day
   if ( dailyPostCounts.hasOwnProperty(timePost[2])) {
    dailyPostCounts[timePost[2]]++;
  } else {
    dailyPostCounts[timePost[2]] = 1;
  }
  }
   
});

for (const view of viewData) {
   const timeView = parseTimestamp(view.timestamp);
   if (timeView[0] == currentYear && timeView[1] == currentMonth) {
    // Increment the count for the corresponding day
    let day = timeView[2];
     if (dailyViewCounts.hasOwnProperty(day)) {
       dailyViewCounts[day]++;
     } else {
       dailyViewCounts[day] = 1;
     }
   }
}

  const labelDay = Object.keys(dailyPostCounts).map(day => parseInt(day));
  const PostValueDay = Object.values(dailyPostCounts);
  const viewValueDay = Object.values(dailyViewCounts);
  console.log(PostValueDay);
  let labels = labelDay;

  const dataLine = {
    labels,
  datasets: [
    {
      label: "Number of Created Post",
      data: PostValueDay,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Page Views",
      data: viewValueDay,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    }
  ],
  };

  return dataLine;
};
const generateDataLineByMonth = (dataPost, viewData) => {
  const monthlyPostCounts = {}; // Object to store the count of posts for each month
  const monthlyViewCounts = {};

    // Initialize dayCounts object with day numbers as keys and initial count of 0
    for (let m = 1; m <= currentMonth; m++) {
      monthlyPostCounts = 0; // Object to store the count of posts for each month
      monthlyViewCounts = 0;
    }

  dataPost.forEach((obj) => {
    const timePost = parseTimestamp(obj.timestamp);

    if (timePost[0] === currentYear) {
      const month = timePost[1]; // Get the month

      if (monthlyPostCounts.hasOwnProperty(month)) {
        monthlyPostCounts[month]++;
      } else {
        monthlyPostCounts[month] = 1;
      }
    }
  });

  for (const view of viewData) {
    const timeView = parseTimestamp(view.timestamp);

    if (timeView[0] === currentYear) {
      const month = timeView[1]; // Get the month

      if (monthlyViewCounts.hasOwnProperty(month)) {
        monthlyViewCounts[month]++;
      } else {
        monthlyViewCounts[month] = 1;
      }
    }
  }

  const labels = Object.keys(monthlyPostCounts).map((month) => parseInt(month));
  const postValues = Object.values(monthlyPostCounts);
  const viewValues = Object.values(monthlyViewCounts);

  const dataLine = {
    labels,
    datasets: [
      {
        label: 'Number of Created Post',
        data: postValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Page Views',
        data: viewValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return dataLine;
};

const generateDataDoughnut = (pageViews) => {
  const genders = pageViews.map((pageView) => pageView.viewer_gender);

  const maleCount = genders.filter((gender) => gender === 'male').length;
  const femaleCount = genders.filter((gender) => gender === 'female').length;

  const dataDoughnut = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '# of Votes',
        data: [maleCount, femaleCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return dataDoughnut;
};

//calculate a rating for a post
const averageRating = (post_rating) => {
  const values = Object.values(post_rating);

  if (values.length === 0) {
    return 0; // Handle the case when the object is empty
  }

  const sum = values.reduce((acc, value) => acc + value, 0);
  const average = sum / values.length;
  const roundedAverage = average.toFixed(1); // Round to 1 decimal point

  return Number(roundedAverage); // Convert back to a number
}

//avergae for overall rating
const calculateOverallRating = (post_list) =>{
  if (post_list.length === 0) {
    return 0; // Handle the case when the array is empty
  }
  

  let sum = 0;
  let existedRating =0;
  for (let i = 0; i < post_list.length; i++) {
    let avePost = averageRating( post_list[i].rating);
    if (avePost > 0){
      existedRating++;
      sum += avePost;
    }
  }

  const average = sum / existedRating;

  
  return  average.toFixed(1);
}

const calculateTotalView = (postViewList, post_id) => {
  let totalViews = 0;

  for (const viewPage of postViewList) {
    if (viewPage.post_id === post_id) {
      totalViews += 1;
    }
  }

  return totalViews;
};

const calculateReach = (postViewList) => {
  // Create a Set to store unique viewer IDs
  const uniqueViewers = new Set();

  // Iterate through each post view object
  for (const postView of postViewList) {
    const viewerId = postView.viewer_id;
    uniqueViewers.add(viewerId); // Add viewer ID to the Set
  }

  // Calculate the reach as the number of unique viewers
  const reach = uniqueViewers.size;

  return reach;
};





const countTags = (postList, pageViewList) => {
  const tagCounts = {};

  for (const view of pageViewList) {
    
    const postId = view.post_id;
    const post = postList.find((post) => post.postId === postId);

    if (post) {
      const tags = post.tag;

      for (const tag of tags) {
        if (tagCounts.hasOwnProperty(tag)) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      }
    }
  }
 

  return tagCounts;
};




export function DashBoard() {

  
  const [postList, setPostList] = useState([]);
  const [postViewList, setPostView] = useState([]);
  const [showAnotherChart, setShowAnotherChart] = useState(false);
 
 // Function to handle the toggle
 const handleToggle = () => {
  setShowAnotherChart(!showAnotherChart);
};

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const fetchedPostList = await getPostsWithCommentCount (); 
        const fecthPostView = await fetchPostView();

      
        setPostList(fetchedPostList);
        setPostView(fecthPostView);
      

      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    };

    fetchAllData();
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
                    <h4 className="info-title">Total Page Views</h4>
                    <span className="h2 font-weight-bold">{postViewList.length}</span>
                    <br></br>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-alert-circle-i" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Total Post</h4>
                    <span className="h2 font-weight-bold mb-0">{postList.length}</span>
                    <br></br>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-single-02" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Reach</h4>
                    <span className="h2 font-weight-bold mb-2">{calculateReach(postViewList)}</span>
                    <br></br>
                    <span className="h5">users</span>
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
                    <span className="h2 font-weight-bold mb-0">{calculateOverallRating(postList)}/5.0</span>
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
                      <h2 className=" mb-0">Blog Insight </h2>
                    </div>
                    <div className="col">
                    <Nav className="justify-content-end" pills>
              <NavItem>
                <NavLink
                  className={!showAnotherChart ? 'active' : ''}
                  onClick={() => setShowAnotherChart(false)}
                >
                  <span className="d-none d-md-block">This Month</span>
                  <span className="d-md-none">M</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={showAnotherChart ? 'active' : ''}
                  onClick={() => setShowAnotherChart(true)}
                >
                  <span className="d-none d-md-block">This Year</span>
                  <span className="d-md-none">W</span>
                </NavLink>
              </NavItem>
            </Nav>
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
                {showAnotherChart ? (
          <Line options={options} data={generateDataLineByMonth(postList,postViewList)} />
        ) : (
          <Line options={options} data={generateDataLine(postList, postViewList)} />
        )}
                  
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
                      <h2 className="mb-0">Viewer Gender Breakdown </h2>
                     </div>
                     <Doughnut data={generateDataDoughnut(postViewList)} />
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
                      <th scope="col">Post Title</th>
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
          <td>{calculateTotalView(postViewList, post.postId)}</td>
          <td>{post.commentCount}</td>
          <td><i className="nc-icon nc-satisfied mr-3" />
          {averageRating(post.rating)}</td> {/* Convert rating to a string */}
        </tr>
      ))}
                  </tbody>
                </Table>
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
                     <Bar data={generateDataBar(countTags(postList,postViewList))} />
                  </Row>
              </CardHeader>
                <CardBody></CardBody>
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
