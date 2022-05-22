import {
  Box,
  CircularProgress,
  CircularProgressIndicator,
  HStack,
  notificationService,
  Skeleton,
  Text,
  VStack,
} from '@hope-ui/solid';
import { useParams } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';
import IconExport from '../../icons/IconExport';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { userProfitChart } from '../../charts';

let AdminUserPage = () => {
  let params = useParams();

  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [userData, setUserData] = createStore(
    {},
    {
      name: 'user-data',
    }
  );

  onMount(() => {
    setTimeout(() => {
      loadUser(params.id);
    }, 300);
  });

  let loadUser = (id) => {
    axios
      .get(apiUrl + '/admin/users/' + id, {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          let userInfo = response.data.data;

          axios
            .get(apiUrl + '/admin/users/sales/' + id, {
              headers: {
                Authorization: 'Bearer ' + authState.authenticationToken,
              },
            })
            .then((response) => {
              if (response.data.error) return console.log(response.data);
              else {
                let sales = response.data.data;

                axios
                  .get(apiUrl + '/admin/users/products/' + id, {
                    responseType: 'json',
                    headers: {
                      Authorization: 'Bearer ' + authState.authenticationToken,
                    },
                  })
                  .then((response) => {
                    if (response.data.error) return console.log(response.data);
                    else {
                      let products = response.data.data;

                      setUserData({ ...userInfo, sales, products });

                      userProfitChart(sales, () => setLoading(false));
                    }
                  });
              }
            });
        }
      });
  };

  let exportUser = () => {
    axios
      .get(apiUrl + '/admin/exportUser/' + params.id, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          notificationService.show({
            id: 'download-progress',
            render: (props) => (
              <HStack
                bg="$loContrast"
                rounded="$md"
                border="1px solid $neutral7"
                shadow="$lg"
                p="$4"
                w="$full"
              >
                <CircularProgress value={percentCompleted}>
                  <CircularProgressIndicator />
                </CircularProgress>
                <VStack alignItems="flex-start">
                  <Text size="sm" fontWeight="$medium">
                    Downloading file
                  </Text>
                </VStack>
              </HStack>
            ),
          });
        },
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          if (response.status === 200) {
            saveAs(response.data, `${userData.email}-data.xlsx`);

            notificationService.hide('download-progress');

            return notificationService.show({
              title: 'Success',
              description: 'The file will be downloaded now.',
              status: 'success',
              duration: 3000,
            });
          }
        }
      });
  };

  return (
    userData && (
      <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
        <HStack w="100%" class="justify-between space-x-5">
          <Box
            class={`w-full ${
              loading() ? 'bg-gray-200 animate-pulse rounded-lg p-4' : ''
            }`}
          >
            {userData.displayName || ''}
          </Box>
          <div
            class="flex justify-center items-center px-3 py-2 space-x-2 bg-lime-400 rounded-lg shadow-2xl shadow-lime-400 cursor-pointer"
            onClick={() => exportUser()}
          >
            <IconExport />
            <div>User</div>
          </div>
        </HStack>

        <div class="flex space-x-5 w-full">
          <div
            class={`flex flex-col justify-center items-center w-full p-10 space-y-3 ${
              loading()
                ? 'bg-gray-200 animate-pulse rounded-lg'
                : 'bg-lime-400 rounded-lg shadow-lg shadow-lime-200'
            }`}
          >
            <div class="text-white font-bold">
              {!loading() && 'Total Products'}
            </div>
            <div class="text-white">
              {!loading() && userData.products.length}
            </div>
          </div>
          <div
            class={`flex flex-col justify-center items-center w-full p-10 space-y-3 ${
              loading()
                ? 'bg-gray-200 animate-pulse rounded-lg'
                : 'bg-lime-400 rounded-lg shadow-lg shadow-lime-200'
            }`}
          >
            <div class="text-white font-bold">
              {!loading() && 'Total Sales'}
            </div>
            <div class="text-white">{!loading() && userData.sales.length}</div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full space-y-5 overflow-y-auto pb-16">
          <canvas
            id="profitChart"
            class="w-full max-h-96 border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
          ></canvas>

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
                  <th class={'text-right px-3'}>Cost</th>
                  <th class={'text-right px-3'}>Price</th>
                  <th class={'text-right px-3'}>Quantity</th>
                  <th class={'text-right px-3'}>Profit</th>
                </tr>
              </thead>
              <tbody>
                {!loading() &&
                  userData.sales.filter((sale) => sale !== undefined).length >
                    0 &&
                  userData.sales.map((sale) => (
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
                {userData.sales.filter((product) => product !== undefined)
                  .length === 0 && (
                  <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                    You have no sales.
                  </VStack>
                )}
              </>
            )}
          </div>

          <iframe
            class={`w-full h-full rounded-lg bg-gray-200 mb-16 ${
              loading() && 'animate-pulse'
            }`}
            frameborder="0"
            style={{ border: 0, 'min-height': '300px' }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAH8g_iKPrzzhPiO_wae4uXjU5sNwP-h9o&q=${
              !loading() &&
              userData.streetAddress +
                ' ' +
                userData.suburb +
                ' ' +
                userData.city
            }`}
            allowfullscreen
          ></iframe>
        </div>
      </VStack>
    )
  );
};

export default AdminUserPage;
