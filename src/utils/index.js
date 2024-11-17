export const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");

  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat to format the date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  // console.log(formattedDate); // "20 Nov 2024"
  return formattedDate;
};

export const itineraryRoute = (ports, separators = " - ") => {
  let routeArr = [];
  ports.forEach((port) => {
    if (port?.name !== "At Sea") routeArr.push(port?.name);
  });

  return routeArr.join(separators);
};
