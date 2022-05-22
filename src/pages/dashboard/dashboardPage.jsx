import useState from '../../hooks/state';
import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import moment from 'moment';
import { Skeleton, VStack } from '@hope-ui/solid';
import { createSignal } from 'solid-js';

let DashboardPage = () => {
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [products, setProducts] = createStore([], {
    name: 'dashboard-products',
  });
  let [sales, setSales] = createStore([], { name: 'dashboard-sales' });
  let [loading, setLoading] = createSignal(true);

  setTimeout(() => {
    loadProducts();
    loadSales();
  }, 300);

  let loadProducts = async () => {
    await axios
      .get(apiUrl + '/products', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setProducts([...response.data.data]);
        }
      });
  };

  let loadSales = async () => {
    await axios
      .get(apiUrl + '/sales', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setSales([...response.data.data]);
          profitChart(response.data.data);
        }
      });
  };

  let profitChart = (sales) => {
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

    setLoading(false);
  };

  return (
    <div class="flex flex-col w-full h-full text-black rounded-xl">
      <div class="flex w-full h-auto justify-between p-5">
        <div>Your Dashboard</div>
      </div>

      <div class="flex flex-col space-y-5 w-full h-full overflow-y-auto p-5 pt-0 pb-20">
        <div class="w-full font-bold">Analytics</div>

        <div class="flex space-x-5 w-full">
          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-2xl shadow-lime-400">
            <div class="text-white font-bold">Total Products</div>
            <div class="text-white">{products.length}</div>
          </div>

          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-2xl shadow-lime-400">
            <div class="text-white font-bold">Total Sales</div>
            <div class="text-white">{sales.length}</div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full space-y-5">
          <div class="w-full font-bold">Profit</div>
          <canvas
            id="profitChart"
            class="w-full max-h-96 border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
          ></canvas>
          <div class="w-full font-bold">Latest Sales</div>
          <div
            class="relative w-full h-32 overflow-hidden border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
            style={{ 'min-height': '150px' }}
          >
            <div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white"></div>

            <table class="table-auto w-full">
              <thead class={'h-10'}>
                <tr>
                  <th class={'text-left px-3'}>Date</th>
                  <th class={'text-left px-3'}>Name</th>
                  <th class={'text-right px-3'}>Price</th>
                  <th class={'text-right px-3'}>Cost</th>
                  <th class={'text-right px-3'}>Quantity</th>
                  <th class={'text-right px-3'}>Profit</th>
                </tr>
              </thead>
              <tbody>
                {!loading() &&
                  sales.filter((sale) => sale !== undefined).length > 0 &&
                  sales.map((sale) => (
                    <tr class="p-2">
                      <td class={'text-left px-3'}>
                        {moment(sale.date).format('DD/MM/YYYY')}
                      </td>
                      <td class={'text-left px-3'}>{sale.product.name}</td>
                      <td class={'text-right px-3'}>R {sale.product.cost}</td>
                      <td class={'text-right px-3'}>R {sale.product.price}</td>
                      <td class={'text-right px-3'}>{sale.numberSold}</td>
                      <td class={'text-right px-3'}>R {sale.profit}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {loading() && (
              <VStack w={'100%'} alignItems="stretch" spacing="$2" p={'$3'}>
                <Skeleton
                  height="40px"
                  startColor={'#d4d4d4'}
                  endColor={'#f5f5f5'}
                />
                <Skeleton
                  height="40px"
                  startColor={'#d4d4d4'}
                  endColor={'#f5f5f5'}
                />
                <Skeleton
                  height="40px"
                  startColor={'#d4d4d4'}
                  endColor={'#f5f5f5'}
                />
              </VStack>
            )}

            {!loading() && (
              <>
                {sales.filter((product) => product !== undefined).length ===
                  0 && (
                  <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                    You have no sales.
                  </VStack>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
