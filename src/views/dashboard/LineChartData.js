

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