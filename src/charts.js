import moment from 'moment';

export let salesChart = (sales, industry) => {
  let salesChart = document.getElementById('salesChart');
  let ctx = salesChart.getContext('2d');

  let chartAlreadyExists = Chart.getChart('salesChart');
  if (chartAlreadyExists) chartAlreadyExists.destroy();

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
    let totalProfit = 0;

    sales
      .filter((sale) => {
        if (industry === 'all') return sale;
        else {
          if (sale.owner.businessType === industry) return sale;
        }
      })
      .map((sale) => {
        let saleMonth = moment(sale.date).format('MMMM');
        let saleYear = moment(sale.date).format('YYYY');

        if (!sale.profit) return sale;

        if (saleMonth !== month) return sale;
        if (saleYear !== year) return sale;

        if (saleMonth === month && saleYear === year) totalProfit += sale.profit;

        return sale;
      });

    return totalProfit;
  };

  let getYearSales = (year) => {
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
          text: 'Monthly Profit',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `R ${context.parsed.y}`;
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
            text: 'Profit (R)',
          },
        },
      },
    },
  });
};

export let harvestsChart = (harvests) => {
  let harvestsChart = document.getElementById('harvestsChart');
  let ctx = harvestsChart.getContext('2d');

  let chartAlreadyExists = Chart.getChart('harvestsChart');
  if (chartAlreadyExists) chartAlreadyExists.destroy();

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

  let calculateMonthHarvests = (year, month, harvests) => {
    let totalHarvests = 0;

    harvests
      .map((harvest) => {
        let harvestMonth = moment(harvest.date).format('MMMM');
        let harvestYear = moment(harvest.date).format('YYYY');

        if (harvestMonth !== month) return harvest;
        if (harvestYear !== year) return harvest;

        if (harvestMonth === month && harvestYear === year) totalHarvests += 1;

        return harvest;
      });

    return totalHarvests;
  };

  let getYearHarvests = (year) => {
    return [
      ...months.map((month) => {
        return {
          x: month,
          y: calculateMonthHarvests(year, month, harvests),
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
        data: getYearHarvests('2022'),
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
          text: 'Monthly Harvests',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} harvests`;
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
            text: 'Number',
          },
        },
      },
    },
  });
};

export let agesChart = (users) => {
  let agesChart = document.getElementById('agesChart');
  let ctx = agesChart.getContext('2d');

  let chartAlreadyExists = Chart.getChart('agesChart');
  if (chartAlreadyExists) chartAlreadyExists.destroy();

  let ranges = [
    '1-10',
    '11-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61-70',
    '71-80',
    '81-90',
    '91-100',
  ];

  let calculateAges = (ageRangeMin, ageRangeMax, users) => {
    let agesCount = 0;

    users.map((user) => {
      if (user.age >= ageRangeMin && user.age <= ageRangeMax) agesCount++;
      return user;
    });

    return agesCount;
  };

  let getAges = () => {
    return [
      ...ranges.map((range) => {
        let rangeMinMax = range.split('-');
        return {
          x: range,
          y: calculateAges(rangeMinMax[0], rangeMinMax[1], users),
        };
      }),
    ];
  };

  let data = {
    labels: ranges,
    datasets: [
      {
        label: 'Ages',
        type: 'bar',
        data: getAges(),
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
          text: 'Ages',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${ranges[context.parsed.x]}: ${context.parsed.y}`;
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
            text: 'Number',
          },
        },
      },
    },
  });
};

export let typesChart = (users) => {
  let typesChart = document.getElementById('typesChart');
  let ctx = typesChart.getContext('2d');

  let chartAlreadyExists = Chart.getChart('typesChart');
  if (chartAlreadyExists) chartAlreadyExists.destroy();

  let types = [
    'Sewing',
    'Bakery',
    'Wood Work',
    'Garden Service',
    'Food And Beverage',
    'Gardening',
    'Nails',
    'Salon',
    'Consulting',
    'Construction',
    'Early Childhood Development Center',
    'Other',
  ];

  let calculateTypes = (type, users) => {
    let typesCount = 0;

    users.map((user) => {
      if (user.businessType === type) typesCount++;

      return user;
    });

    return typesCount;
  };

  let getTypes = () => {
    return [
      ...types.map((type) => {
        let typeSplit = type.toString().split(' ');
        let typeJoin = typeSplit.join('');
        let typeFormatted =
          typeJoin.split('')[0].toLowerCase() +
          typeJoin.substring(1, typeJoin.length);

        return {
          x: type,
          y: calculateTypes(typeFormatted, users),
        };
      }),
    ];
  };

  let data = {
    labels: types,
    datasets: [
      {
        label: '',
        type: 'bar',
        data: getTypes(),
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
          text: 'Business Types',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${types[context.parsed.x]}: ${context.parsed.y}`;
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
            text: 'Number of Types',
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

export let userProfitChart = (sales, done = () => { }) => {
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

export let ecdChildrenCountChart = (users) => {
  let ecdChildrenCountChart = document.getElementById('ecdChildrenCountChart');
  let ctx = ecdChildrenCountChart.getContext('2d');

  users = users.filter((user) => user.type === "earlyChildhoodDevelopmentCenter");

  let getChildrenPerEcd = () => {
    return users.map((user) => {
      return {
        x: user.displayName,
        y: user.numberOfChildren
      }
    })
  };

  let data = {
    labels: users.map((user) => {
      return user.displayName
    }),
    datasets: [
      {
        label: '2022',
        type: 'bar',
        data: getChildrenPerEcd(),
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
          text: 'Number of Children per ECD',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} children`;
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
            text: 'Number of Children',
          },
        },
      },
    },
  });
};