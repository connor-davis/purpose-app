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
import axios from 'axios';
import apiUrl from '../../apiUrl';
import { createStore } from 'solid-js/store';
import AddProduceModal from '../../components/modals/ecd/addProduceModal';

let EcdProducePage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [produce, setProduce] = createStore([], {
    name: 'produce-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadProduce();
    }, 300);
  });

  let loadProduce = () => {
    axios
      .get(apiUrl + '/produce', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setProduce([
            ...produce,
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

  let deleteProduce = (id) => {
    axios
      .delete(apiUrl + '/produce/' + id, {
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
            description: 'Unable to delete produce.',
          });
        } else {
          setProduce(
            [
              ...produce.map((produce) => {
                if (produce.id !== id) return produce;
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
            description: 'Successfully deleted produce.',
          });
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Produce</Box>
        <AddProduceModal
          onAdd={(data) =>
            setProduce(
              [...produce, data].sort((a, b) => {
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
        overflow={'auto'}
      >
        <table class="table-auto w-full overflow-x-auto">
          <thead class={'h-10'}>
            <tr>
              <th class={'text-left px-3'}>Image</th>
              <th class={'text-left px-3'}>Name</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              produce.filter((produce) => produce !== undefined).length > 0 &&
              produce.map((produce) => (
                <tr>
                  <td class={'text-left px-3'}>
                    <img src={produce.image} class="w-20 h-20 bg-gray-200" />
                  </td>
                  <td class={'text-left px-3'}>{produce.name}</td>
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
                        {/* <MenuItem
                          colorScheme={'none'}
                          _hover={{ bg: '#e5e5e5' }}
                          rounded={'$lg'}
                          cursor={'pointer'}
                        >
                          <EditProduceModal
                            data={produce}
                            onEdit={(data) =>
                              setProduce(
                                [
                                  ...produce.map((produce) => {
                                    if (produce.id === data.id) return data;
                                    else return produce;
                                  }),
                                ].sort((a, b) => {
                                  if (a.name > b.name) return 1;
                                  if (a.name < b.name) return -1;
                                  return 0;
                                })
                              )
                            }
                          />
                          Coming Soon.
                        </MenuItem> */}

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-red-500 hover:text-white'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => deleteProduce(produce.id)}
                        >
                          Delete Produce
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
            {produce.filter((product) => product !== undefined).length ===
              0 && (
                <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                  You have no produce.
                </VStack>
              )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default EcdProducePage;
