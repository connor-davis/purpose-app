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
  VStack
} from '@hope-ui/solid';
import axios from 'axios';
import moment from 'moment';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../../apiUrl';
import useState from '../../../hooks/state';
import IconCheck from '../../../icons/IconCheck';
import IconPlus from '../../../icons/IconPlus';

let AddSaleModal = ({ onAdd = () => {} }) => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      produce: undefined,
      numberSold: 0,
      profit: 0,
    },
    { name: 'sale-details' }
  );
  let [produce, setProduce] = createStore([], { name: 'produce-list' });
  let [selectedProduce, setSelectedProduce] = createSignal({});

  onMount(() => {
    setDetails({
      product: undefined,
      numberSold: 0,
      profit: 0,
    });
    setSelectedProduce({});

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
        }
      });
  };

  let addSale = () => {
    axios
      .post(
        apiUrl + '/sales',
        { ...details, product: { ...details.produce, cost: 0 } },
        {
          headers: {
            Authorization: 'Bearer ' + authState.authenticationToken,
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          return notificationService.show({
            status: 'danger' /* or success, warning, danger */,
            title: 'Error',
            description: 'Unable to add new sale.',
          });
        } else {
          onAdd(response.data.data);

          setDetails({
            produce: undefined,
            numberSold: 0,
            profit: 0,
          });

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Added a new sale.',
          });
        }
      });
  };

  let setupDatePicker = () => {
    let element = document.getElementById('datepicker');

    if (element) {
      let datepicker = new Datepicker(element, { minDate: '01/01/2022' });

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
            product: undefined,
            numberSold: 0,
            profit: 0,
          });
          setSelectedProduce({});
        }}
      >
        <ModalOverlay />
        <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
          <ModalCloseButton />
          <ModalHeader>Add Sale</ModalHeader>
          <ModalBody>
            {!details.produce && (
              <Box overflowY={'auto'} w="100%" maxH="200px">
                <VStack spacing={'$2'}>
                  {produce.length === 0 && <Box>You have no produce.</Box>}
                  {produce.length > 0 &&
                    produce.map((produce) => (
                      <HStack w="100%" spacing="$2">
                        <Box
                          w="100%"
                          bg={`${
                            selectedProduce().name === produce.name
                              ? '$lime400'
                              : '$gray200'
                          }`}
                          p="$3"
                          rounded="$sm"
                        >
                          {produce.name}
                        </Box>
                        <Box
                          p="$3"
                          class={
                            'flex flex-col justify-center items-center w-10 h-10 hover:bg-gray-100 active:bg-gray-50 bg-opacity-50 rounded-full'
                          }
                          cursor={'pointer'}
                          onClick={() => {
                            setSelectedProduce(produce);
                          }}
                        >
                          <IconCheck />
                        </Box>
                      </HStack>
                    ))}
                </VStack>
              </Box>
            )}

            {details.produce && (
              <form>
                <VStack spacing={'$2'}>
                  <FormControl>
                    <FormLabel for="profit" color="black">
                      Produce
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
                      value={details.produce.name || ''}
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
                        setupDatePicker() && moment().format('MM/DD/YYYY')
                      }
                      size="sm"
                      color="black"
                      data-date={moment().format('MM/DD/YYYY')}
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
                        let profit = details.produce.price * numberSold;

                        setDetails({
                          ...details,
                          numberSold,
                          profit,
                        });
                      }}
                    />
                    <FormHelperText>
                      How many items of the produce did you sell?
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
              {!details.produce && produce.length > 0 && (
                <Box w="100%">
                  <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => {
                      setDetails({ ...details, produce: selectedProduce() });
                      setSelectedProduce({});
                    }}
                  >
                    Next
                  </Button>
                </Box>
              )}
              {details.produce && (
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
                        produce: undefined,
                        numberSold: 0,
                        profit: 0,
                      })
                    }
                  >
                    Back
                  </Button>
                </Box>
              )}
              {details.produce && (
                <Box w="100%">
                  <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => addSale()}
                  >
                    Add
                  </Button>
                </Box>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack
        spacing={'$2'}
        bg={'#e5e5e5'}
        p={'$2'}
        rounded={'$md'}
        cursor={'pointer'}
        onClick={onOpen}
      >
        <IconPlus />
        <Box>Add</Box>
      </HStack>
    </Box>
  );
};

export default AddSaleModal;
