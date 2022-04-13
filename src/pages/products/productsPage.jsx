import {
  Box,
  HStack,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  notificationService,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@hope-ui/solid';
import AddProductModal from '../../components/modals/addProductModal';
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
            products.map((product) => {
              if (product.id === id) return;
              else return product;
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
    <VStack w="100%" h="100%" color="black">
      <HStack w="100%" p="$5" class="justify-between">
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

      <Box w={'100%'} h={'100%'} overflowY={'auto'}>
        <Table>
          <Thead>
            <Tr>
              <Th border={'none'}>Name</Th>
              <Th border={'none'} numeric>
                Cost
              </Th>
              <Th border={'none'} numeric>
                Price
              </Th>
              <Th border={'none'} w={'20px'}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {!loading() &&
              products.length > 0 &&
              products.map((product) => (
                <Tr>
                  <Td border={'none'}>{product.name}</Td>
                  <Td border={'none'} numeric>
                    R {product.cost}
                  </Td>
                  <Td border={'none'} numeric>
                    R {product.price}
                  </Td>
                  <Td border={'none'} w={'auto'}>
                    <Menu color={'black'}>
                      <MenuTrigger
                        as={HStack}
                        alignItems={'center'}
                        justifyContent={'center'}
                        w={'40px'}
                        h={'40px'}
                        _active={{ bg: '#d5d5d5' }}
                        cursor={'pointer'}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
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
                        shadow="$2xl"
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
                          Edit Product
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
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        {loading() && (
          <VStack w={'100%'} px={'$5'} alignItems="stretch" spacing="$2">
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

        {!loading() && products.length <= 0 && (
          <HStack
            w={'100%'}
            p={'$5'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            You have no products.
          </HStack>
        )}
      </Box>
    </VStack>
  );
};

export default ProductsPage;
