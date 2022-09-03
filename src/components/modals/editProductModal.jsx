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

let EditProductModal = ({
  data = { _id: '', name: '', cost: '', price: '' },
  onEdit = () => {},
}) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      id: data._id,
      name: data.name,
      cost: data.cost,
      price: data.price,
    },
    { name: 'product-details' }
  );

  let editProduct = () => {
    axios
      .put(apiUrl + '/products', details, {
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
            description: 'Unable to edit a product.',
          });
        } else {
          onEdit(response.data.data);

          setDetails({
            name: '',
            cost: '',
            price: '',
          });

          onClose();

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Edited a product.',
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
          <ModalHeader>Edit Product</ModalHeader>
          <ModalBody>
            <form>
              <VStack spacing={'$2'}>
                <FormControl required>
                  <FormLabel for="name" color="black">
                    Product Image
                  </FormLabel>
                  {details.image && (
                    <div class="flex justify-center items-center w-full max-h-64">
                      <img class="max-h-52" src={details.image} />
                    </div>
                  )}
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Product Image"
                    size="sm"
                    color="black"
                    id="name"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      let reader = new FileReader();

                      reader.onload = function () {
                        setDetails({ ...details, image: reader.result });
                      };

                      reader.readAsDataURL(event.target.files[0]);
                    }}
                  />
                  <FormHelperText>Give your product an image.</FormHelperText>
                </FormControl>

                <FormControl required>
                  <FormLabel for="name" color="black">
                    Product Name
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Product Name"
                    size="sm"
                    color="black"
                    id="name"
                    type="text"
                    value={details.name || ''}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        name: event.target.value,
                      });
                    }}
                  />
                  <FormHelperText>Give your product a name.</FormHelperText>
                </FormControl>

                <FormControl required>
                  <FormLabel for="cost" color="black">
                    Product Cost
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Product Cost"
                    size="sm"
                    color="black"
                    id="cost"
                    type="text"
                    value={details.cost || ''}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        cost: event.target.value,
                      });
                    }}
                  />
                  <FormHelperText>
                    How much it costs to produce the product.
                  </FormHelperText>
                </FormControl>

                <FormControl required>
                  <FormLabel for="price" color="black">
                    Product Price
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Product Price"
                    size="sm"
                    color="black"
                    id="price"
                    type="text"
                    value={details.price || ''}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        price: event.target.value,
                      });
                    }}
                  />
                  <FormHelperText>
                    How much you are selling this product for.
                  </FormHelperText>
                </FormControl>
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
                  onClick={() => editProduct()}
                >
                  Continue
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box w={'100%'} h={'100%'} onClick={onOpen}>
        Edit Product
      </Box>
    </Box>
  );
};

export default EditProductModal;
