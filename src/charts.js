import moment from 'moment';

export let salesChart = (sales, industry) => {
  let salesChart = document.getElementById('salesChart');
  let ctx = salesChart.getContext('2d');

  let chartAlreadyExists = Chart.getChart('salesChart');
  if (chartAlreadyExists) chartAlreadyExists.destroy();

  console.log(industry);

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let calculateMonthSales = (year, month, sales) => {
    let salesCount = 0;

    sales
      .filter((sale) => {
        console.log(sale);

        if (industry === 'all') return sale;
        else {
          if (sale.industry === industry) return sale;
        }
      })
      .map((sale) => {
        let saleMonth = moment(sale.date).format('MMMM');
        let saleYear = moment(sale.date).format('YYYY');

        if (saleMonth === month && saleYear === year) salesCount++;

        return sale;
      });

    return salesCount;
  };

  let getYearSales = (year) => {
    return [
      ...months.map((month) => {
        return {
          x: month,
          y: calculateMonthSales(year, month, sales),
        };
      }),
    ];
  };

  let data = {
    labels: months,
    datasets: [
      {
        label: '2022',
        type: 'bar',
        data: getYearSales('2022'),
        backgroundColor: 'rgba(163, 230, 53, 1)',
        borderColor: 'rgba(163, 230, 53, 0.5)',
        fill: false,
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Sales',
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Number of Sales',
          },
        },
      },
    },
  });
};

export let gendersChart = (users) => {
  let gendersChart = document.getElementById('gendersChart');
  let ctx = gendersChart.getContext('2d');

  let getGenderCounts = (users) => {
    let getMalesCount = () =>
      users.filter((user) => user.gender === 'Male').length;
    let getFemalesCount = () =>
      users.filter((user) => user.gender === 'Female').length;

    return [getMalesCount(), getFemalesCount()];
  };

  let data = {
    labels: ['Males', 'Females'],
    datasets: [
      {
        label: 'Genders',
        data: getGenderCounts(users),
        backgroundColor: ['rgb(99,102,241)', 'rgb(236,72,153)'],
        hoverOffset: 4,
      },
    ],
  };

  new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Gender Dominance',
        },
      },
    },
  });
};

export let userProfitChart = (sales, done = () => {}) => {
  let profitChart = document.getElementById('profitChart');
  let ctx = profitChart.getContext('2d');

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let calculateMonthProfit = (year, month, sales) => {
    let profit = 0;

    sales.map((sale) => {
      let saleMonth = moment(sale.date).format('MMMM');
      let saleYear = moment(sale.date).format('YYYY');

      if (saleMonth === month && saleYear === year) profit += sale.profit;

      return sale;
    });

    return profit;
  };

  let getYearProfits = (year) => {
    return [
      ...months.map((month) => {
        return {
          x: month,
          y: calculateMonthProfit(year, month, sales),
        };
      }),
    ];
  };

  let data = {
    labels: months,
    datasets: [
      {
        label: '2022',
        type: 'line',
        data: getYearProfits('2022'),
        backgroundColor: 'rgba(163, 230, 53, 1)',
        borderColor: 'rgba(163, 230, 53, 0.5)',
        fill: false,
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Monthly Profit',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = '';

              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-ZA', {
                  style: 'currency',
                  currency: 'ZAR',
                }).format(context.parsed.y);
              }

              return label;
            },
          },
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value (R)',
          },
        },
      },
    },
  });

  done();
};
