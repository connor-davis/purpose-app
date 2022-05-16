import useState from '../../hooks/state';
import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import AdminUserMap from './adminUserMap';

let AdminDashboardPage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let [users, setUsers] = createStore([], {
    name: 'dashboard-users',
  });

  setTimeout(() => {
    loadUsers();

    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (data) => {
            axios
              .put(
                apiUrl + '/users',
                {
                  lat: data.coords.latitude,
                  lng: data.coords.longitude,
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + authState.authenticationToken,
                  },
                }
              )
              .then((response) => {
                if (response.data.error) return console.log(response.data);
                else {
                  let data = response.data.data;

                  updateUserState({
                    ...userState,
                    ...data,
                  });
                }
              });
          },
          () => {},
          { enableHighAccuracy: true }
        );
      } else {
        console.log(`Can't update coords, geolocation isn't supported.`);
      }
    }, 300);
  }, 300);

  let loadUsers = async () => {
    await axios
      .get(apiUrl + '/admin/users', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setUsers([...response.data.data]);
        }
      });
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
            <div class="text-white font-bold">Total Users</div>
            <div class="text-white">{users.length}</div>
          </div>
        </div>
        <div class="w-full font-bold">Users Map</div>
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
