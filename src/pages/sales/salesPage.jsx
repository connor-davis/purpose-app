import {
  Box,
  HStack,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  notificationService,
  Skeleton,
  VStack,
} from '@hope-ui/solid';
import AddProductModal from '../../components/modals/addProductModal';
import EditProductModal from '../../components/modals/editProductModal';
import useState from '../../hooks/state';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import AddSaleModal from '../../components/modals/addSaleModal';

let SalesPage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [sales, setSales] = createStore([], {
    name: 'sales-list',
  });

  onMount(() => {
    setTimeout(() => {
      // loadSales();
    }, 300);
  });

  let loadSales = () => {
    axios
      .get(apiUrl + '/sales', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setSales([
            ...sales,
            ...response.data.data.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            }),
          ]);

          return setLoading(false);
        }
      });
  };

  let deleteSale = (id) => {
    axios
      .delete(apiUrl + '/sales/' + id, {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data);

          return notificationService.show({
            status: 'danger' /* or success, warning, danger */,
            title: 'Error',
            description: 'Unable to delete sale.',
          });
        } else {
          setSales(
            [
              ...sales.map((sale) => {
                if (sale.id !== id) return sale;
              }),
            ].sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;

              return 0;
            })
          );

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Successfully deleted sale.',
          });
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Sales</Box>
        <AddSaleModal
          onAdd={(data) =>
            setSales(
              [...sales, data].sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
            )
          }
        />
      </HStack>

      <Box
        w={'$full'}
        h={'$full'}
        borderRadius={'$2xl'}
        borderWidth={'1px'}
        borderColor={'$gray200'}
        mb={'$16'}
        p={'$2'}
        overflowY={'auto'}
      >
        <table class="table-auto w-full">
          <thead class={'h-10'}>
            <tr>
              <th class={'text-left px-3'}>Name</th>
              <th class={'text-right px-3'}>Price</th>
              <th class={'text-right px-3'}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              sales.filter((sale) => sale !== undefined).length > 0 &&
              sales.map((sale) => (
                <tr>
                  <td class={'text-left px-3'}>{sale.name}</td>
                  <td class={'text-right px-3'}>R {sale.cost}</td>
                  <td class={'text-right px-3'}>R {sale.price}</td>
                  <td class={'w-10 p-0 m-0'}>
                    <Menu color={'black'} as>
                      <MenuTrigger
                        class={
                          'flex flex-col justify-center items-center w-10 h-10 hover:bg-gray-100 active:bg-gray-50 bg-opacity-50 rounded-full'
                        }
                        cursor={'pointer'}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="!h-6 !w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </MenuTrigger>
                      <MenuContent
                        minW="$60"
                        bg="white"
                        shadow="$md"
                        borderRadius="$2xl"
                        borderWidth="1px"
                        borderColor="#e5e5e5"
                        rounded={'$lg'}
                        color={'black'}
                      >
                        <MenuItem
                          colorScheme={'none'}
                          _hover={{ bg: '#e5e5e5' }}
                          rounded={'$lg'}
                          cursor={'pointer'}
                        >
                          {/*<EditProductModal*/}
                          {/*  data={sale}*/}
                          {/*  onEdit={(data) =>*/}
                          {/*    setSales(*/}
                          {/*      [*/}
                          {/*        ...sales.map((sale) => {*/}
                          {/*          if (sale.id === data.id) return data;*/}
                          {/*          else return sale;*/}
                          {/*        }),*/}
                          {/*      ].sort((a, b) => {*/}
                          {/*        if (a.name > b.name) return 1;*/}
                          {/*        if (a.name < b.name) return -1;*/}
                          {/*        return 0;*/}
                          {/*      })*/}
                          {/*    )*/}
                          {/*  }*/}
                          {/*/>*/}
                        </MenuItem>

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-red-500 hover:text-white'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => deleteSale(sale.id)}
                        >
                          Delete Sale
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </td>
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
            {sales.filter((product) => product !== undefined).length === 0 && (
              <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                You have no products.
              </VStack>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default SalesPage;
