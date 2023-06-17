let labels = ["Food", "Transport", "Attraction", "Accomodation", "Others"];

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