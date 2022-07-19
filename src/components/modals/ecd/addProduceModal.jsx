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
import IconPlus from '../../../icons/IconPlus';
import { createStore } from 'solid-js/store';
import apiUrl from '../../../apiUrl';
import useState from '../../../hooks/state';
import axios from 'axios';
import Beans from "../../../assets/beans.png";
import BeetRoot from "../../../assets/beetroot.png";
import Butternut from "../../../assets/butternut.png";
import Cabbage from "../../../assets/cabbage.png";
import Cauliflower from "../../../assets/cauliflower.png";
import Cucumber from "../../../assets/cucumber.png";
import Kale from "../../../assets/kale.png";
import Lettuce from "../../../assets/lettuce.png";
import Onion from "../../../assets/onion.png";
import Peppers from "../../../assets/peppers.png";
import Pumpkin from "../../../assets/pumpkin.png";
import Rocket from "../../../assets/rocket.png";
import Rosemary from "../../../assets/rosemary.png";
import SpringOnion from "../../../assets/springonion.png";
import Thyme from "../../../assets/thyme.png";
import Tomatoe from "../../../assets/tomatoe.png";
import { createSignal } from 'solid-js';

let AddProduceModal = ({ onAdd = () => { } }) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      image: '',
      name: '',
    },
    { name: 'product-details' }
  );

  let items = [
    { name: "Beans", image: Beans },
    { name: "Beetroot", image: BeetRoot },
    { name: "Butternut", image: Butternut },
    { name: "Cabbage", image: Cabbage },
    { name: "Cauliflower", image: Cauliflower },
    { name: "Cucumber", image: Cucumber },
    { name: "Kale", image: Kale },
    { name: "Lettuce", image: Lettuce },
    { name: "Onion", image: Onion },
    { name: "Peppers", image: Peppers },
    { name: "Pumpkin", image: Pumpkin },
    { name: "Rocket", image: Rocket },
    { name: "Rosemary", image: Rosemary },
    { name: "Spring Onion", image: SpringOnion },
    { name: "Thyme", image: Thyme },
    { name: "Tomatoe", image: Tomatoe },
  ]

  let [selected, setSelected] = createSignal({});

  let addProduce = () => {
    axios
      .post(apiUrl + '/produce', selected(), {
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
            description: 'Unable to add new produce.',
          });
        } else {
          onAdd(response.data.data);

          setSelected({});

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Added a new produce.',
          });
        }
      });
  };

  return (
    <Box>
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
          <ModalCloseButton />
          <ModalHeader>Add Produce</ModalHeader>
          <ModalBody>
            <form>
              <VStack spacing={'$2'} overflowY={"auto"} maxH={"$64"}>
                {items.map((item) => (
                  <div class="flex w-full items-center space-x-2">
                    <div class={`flex w-full items-center space-x-3 ${selected().name === item.name && "bg-lime-400 text-white rounded-lg"}`}>
                      <img src={item.image} class="w-10 h-10" />
                      <div>{item.name}</div>
                    </div>
                    <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" onClick={() => setSelected(item)}>Select</div>
                  </div>
                ))}
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <HStack w={'100%'} spacing={'$2'}>
              <Box w="100%">
                <Button
                  color="white"
                  rounded="$md"
                  class="bg-red-500 shadow-lg shadow-red-200 select-none outline-none"
                  w="100%"
                  variant="solid"
                  colorScheme="$lime4"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Box>
              <Box w="100%">
                <Button
                  color="black"
                  rounded="$md"
                  class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                  w="100%"
                  variant="solid"
                  colorScheme="$lime4"
                  onClick={() => addProduce()}
                >
                  Add
                </Button>
              </Box>
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

export default AddProduceModal;
