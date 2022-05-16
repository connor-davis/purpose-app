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

let ProductsPage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [products, setProducts] = createStore([], {
    name: 'products-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadProducts();
    }, 300);
  });

  let loadProducts = () => {
    axios
      .get(apiUrl + '/products', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setProducts([
            ...products,
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

  let deleteProduct = (id) => {
    axios
      .delete(apiUrl + '/products/' + id, {
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
            description: 'Unable to delete product.',
          });
        } else {
          setProducts(
            [
              ...products.map((product) => {
                if (product.id !== id) return product;
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
            description: 'Successfully deleted product.',
          });
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Products</Box>
        <AddProductModal
          onAdd={(data) =>
            setProducts(
              [...products, data].sort((a, b) => {
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
              <th class={'text-left px-3'}>Image</th>
              <th class={'text-left px-3'}>Name</th>
              <th class={'text-right px-3'}>Price</th>
              <th class={'text-right px-3'}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              products.filter((product) => product !== undefined).length > 0 &&
              products.map((product) => (
                <tr>
                  <td class={'text-left px-3'}>
                    <img src={product.image} class="w-20 h-20 bg-gray-200" />
                  </td>
                  <td class={'text-left px-3'}>{product.name}</td>
                  <td class={'text-right px-3'}>R {product.cost}</td>
                  <td class={'text-right px-3'}>R {product.price}</td>
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
                          <EditProductModal
                            data={product}
                            onEdit={(data) =>
                              setProducts(
                                [
                                  ...products.map((product) => {
                                    if (product.id === data.id) return data;
                                    else return product;
                                  }),
                                ].sort((a, b) => {
                                  if (a.name > b.name) return 1;
                                  if (a.name < b.name) return -1;
                                  return 0;
                                })
                              )
                            }
                          />
                        </MenuItem>

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-red-500 hover:text-white'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => deleteProduct(product.id)}
                        >
                          Delete Product
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
            {products.filter((product) => product !== undefined).length ===
              0 && (
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

export default ProductsPage;
