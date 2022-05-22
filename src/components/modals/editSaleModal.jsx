import {
  Box,
  Button,
  createDisclosure,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  notificationService,
  VStack,
} from '@hope-ui/solid';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';
import axios from 'axios';
import { createSignal, onMount } from 'solid-js';
import IconCheck from '../../icons/IconCheck';
import moment from 'moment';

let EditSaleModal = ({
  data = { id: '', date: '', product: {}, numberSold: 0, profit: 0 },
  onEdit = () => {},
}) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      id: data.id,
      date: data.date,
      product: data.product,
      numberSold: data.numberSold,
      profit: data.profit,
    },
    { name: 'sale-details' }
  );
  let [products, setProducts] = createStore([], { name: 'products-list' });
  let [selectedProduct, setSelectedProduct] = createSignal({});

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
        }
      });
  };

  let editSale = () => {
    axios
      .put(apiUrl + '/sales', details, {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) {
          return notificationService.show({
            status: 'danger' /* or success, warning, danger */,
            title: 'Error',
            description: 'Unable to edit sale.',
          });
        } else {
          onEdit(response.data.data);

          setDetails({
            id: undefined,
            date: undefined,
            product: undefined,
            numberSold: 0,
            profit: 0,
          });

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Edited a sale.',
          });
        }
      });
  };

  let setupDatePicker = () => {
    let element = document.getElementById('datepicker');

    if (element) {
      let datepicker = new Datepicker(element, {});

      element.addEventListener('changeDate', (event) => {
        setDetails({
          ...details,
          date: event.target.datepicker.dates[0],
        });
      });

      return datepicker;
    }

    return element;
  };

  return (
    <Box>
      <Modal
        opened={isOpen()}
        onClose={() => {
          onClose();

          setDetails({
            id: undefined,
            date: undefined,
            product: undefined,
            numberSold: 0,
            profit: 0,
          });
          setSelectedProduct({});
        }}
      >
        <ModalOverlay />
        <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
          <ModalCloseButton />
          <ModalHeader>Edit Sale</ModalHeader>
          <ModalBody>
            {!details.product && (
              <Box overflowY={'auto'} w="100%" maxH="200px">
                <VStack spacing={'$2'}>
                  {products.length === 0 && <Box>You have no products.</Box>}
                  {products.length > 0 &&
                    products.map((product) => (
                      <HStack w="100%" spacing="$2">
                        <Box
                          w="100%"
                          bg={`${
                            selectedProduct().name === product.name
                              ? '$lime400'
                              : '$gray200'
                          }`}
                          p="$3"
                          rounded="$sm"
                        >
                          {product.name}
                        </Box>
                        <Box
                          p="$3"
                          class={
                            'flex flex-col justify-center items-center w-10 h-10 hover:bg-gray-100 active:bg-gray-50 bg-opacity-50 rounded-full'
                          }
                          cursor={'pointer'}
                          onClick={() => {
                            setSelectedProduct(product);
                          }}
                        >
                          <IconCheck />
                        </Box>
                      </HStack>
                    ))}
                </VStack>
              </Box>
            )}

            {details.product && (
              <form>
                <VStack spacing={'$2'}>
                  <FormControl>
                    <FormLabel for="profit" color="black">
                      Product
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Product"
                      size="sm"
                      color="black"
                      id="profit"
                      type="text"
                      value={details.product.name || ''}
                      disabled={true}
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="numberSold" color="black">
                      Date Sold
                    </FormLabel>
                    <Input
                      id="datepicker"
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder={
                        setupDatePicker() &&
                        moment(details.date).format('MM/DD/YYYY')
                      }
                      size="sm"
                      color="black"
                      data-date={moment(details.date).format('MM/DD/YYYY')}
                    />
                    <FormHelperText>When was the sale made?</FormHelperText>
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="numberSold" color="black">
                      Number Sold
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Number Sold"
                      size="sm"
                      color="black"
                      id="numberSold"
                      type="number"
                      value={details.numberSold || ''}
                      onChange={(event) => {
                        let numberSold = event.target.value;
                        let profit =
                          (details.product.price - details.product.cost) *
                          numberSold;

                        setDetails({
                          ...details,
                          numberSold,
                          profit,
                        });
                      }}
                    />
                    <FormHelperText>
                      How many items of the product did you sell?
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel for="profit" color="black">
                      Profit
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Sale Profit"
                      size="sm"
                      color="black"
                      id="profit"
                      type="text"
                      value={'R ' + details.profit || ''}
                      disabled={true}
                    />
                    <FormHelperText>This is your profit.</FormHelperText>
                  </FormControl>
                </VStack>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack w={'100%'} spacing={'$2'}>
              {!details.product && products.length > 0 && (
                <Box w="100%">
                  <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => {
                      setDetails({ ...details, product: selectedProduct() });
                      setSelectedProduct({});
                    }}
                  >
                    Next
                  </Button>
                </Box>
              )}
              {details.product && (
                <Box w="100%">
                  <Button
                    color="white"
                    rounded="$md"
                    class="bg-red-500 shadow-lg shadow-red-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() =>
                      setDetails({
                        id: data.id,
                        date: data.date,
                        product: undefined,
                        numberSold: 0,
                        profit: 0,
                      })
                    }
                  >
                    Back
                  </Button>
                </Box>
              )}
              {details.product && (
                <Box w="100%">
                  <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => editSale()}
                  >
                    Edit
                  </Button>
                </Box>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box w={'100%'} h={'100%'} onClick={onOpen}>
        Edit Sale
      </Box>
    </Box>
  );
};

export default EditSaleModal;
