import useState from '../../hooks/state';
import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import AdminUserMap from './adminUserMap';
import { gendersChart, salesChart } from './charts';

let AdminDashboardPage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let [users, setUsers] = createStore([], {
    name: 'dashboard-users',
  });
  let [sales, setSales] = createStore([], {
    name: 'dashboard-sales',
  });

  setTimeout(() => {
    loadUsers();
    loadSales();
  }, 300);

  let loadUsers = async () => {
    await axios
      .get(apiUrl + '/admin/users', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setUsers([...response.data.data]);
        }
      });
  };

  let loadSales = async () => {
    await axios
      .get(apiUrl + '/admin/users/sales/all', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setSales([...response.data.data]);

          salesChart(sales);
          gendersChart(users);
        }
      });
  };

  return (
    <div class="flex flex-col w-full h-full text-black rounded-xl overflow-y-scroll">
      <div class="flex w-full h-auto justify-between p-5">
        <div>Your Dashboard</div>
      </div>
      <div class="flex flex-col space-y-5 w-full h-full p-5 pt-0 pb-20">
        <div class="w-full font-bold">Analytics</div>
        <div class="flex space-x-5 w-full">
          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-xl shadow-lime-200">
            <div class="text-white font-bold">Total Users</div>
            <div class="text-white">{users.length}</div>
          </div>
          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-xl shadow-lime-200">
            <div class="text-white font-bold">Total Sales</div>
            <div class="text-white">{sales.length}</div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full space-y-5">
          <canvas
            id="salesChart"
            class="w-full max-h-96 border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
          ></canvas>
          <canvas
            id="gendersChart"
            class="w-full max-h-96 border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
          ></canvas>
        </div>
        <AdminUserMap />
        {/*TODO*/}
        {/*<div class="w-full font-bold">Latest Sales</div>*/}
        {/*<div class="relative w-full h-32 overflow-hidden border-l border-t border-r border-b border-gray-200 rounded-2xl p-2">*/}
        {/*  <div class="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white"></div>*/}
        {/*  <table class="table-auto w-full">*/}
        {/*    <tbody>*/}
        {/*      {!loading() &&*/}
        {/*        userData.filter((sale) => sale !== undefined).length > 0 &&*/}
        {/*        userData.map((sale) => (*/}
        {/*          <tr class="p-2">*/}
        {/*            <td class={'text-left px-3'}>*/}
        {/*              {moment(sale.date).format('DD/MM/YYYY')}*/}
        {/*            </td>*/}
        {/*            <td class={'text-left px-3'}>{sale.product.name}</td>*/}
        {/*            <td class={'text-right px-3'}>R {sale.product.cost}</td>*/}
        {/*            <td class={'text-right px-3'}>R {sale.product.price}</td>*/}
        {/*            <td class={'text-right px-3'}>{sale.numberSold}</td>*/}
        {/*            <td class={'text-right px-3'}>R {sale.profit}</td>*/}
        {/*          </tr>*/}
        {/*        ))}*/}
        {/*    </tbody>*/}
        {/*  </table>*/}

        {/*  {loading() && (*/}
        {/*    <VStack w={'100%'} alignItems="stretch" spacing="$2" p={'$3'}>*/}
        {/*      <Skeleton*/}
        {/*        height="40px"*/}
        {/*        startColor={'#d4d4d4'}*/}
        {/*        endColor={'#f5f5f5'}*/}
        {/*      />*/}
        {/*      <Skeleton*/}
        {/*        height="40px"*/}
        {/*        startColor={'#d4d4d4'}*/}
        {/*        endColor={'#f5f5f5'}*/}
        {/*      />*/}
        {/*      <Skeleton*/}
        {/*        height="40px"*/}
        {/*        startColor={'#d4d4d4'}*/}
        {/*        endColor={'#f5f5f5'}*/}
        {/*      />*/}
        {/*    </VStack>*/}
        {/*  )}*/}

        {/*  {!loading() && (*/}
        {/*    <>*/}
        {/*      {userData.filter((product) => product !== undefined).length ===*/}
        {/*        0 && (*/}
        {/*        <VStack w={'100%'} justifyContent={'center'} py={'$5'}>*/}
        {/*          You have no userData.*/}
        {/*        </VStack>*/}
        {/*      )}*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
