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
import apiUrl from '../../../apiUrl';
import useState from '../../../hooks/state';
import axios from 'axios';

let EditProduceModal = ({
  data = { id: '', name: '', cost: '', price: '' },
  onEdit = () => { },
}) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      id: data.id,
      image: data.image,
      name: data.name,
    },
    { name: 'produce-details' }
  );

  let editProduce = () => {
    axios
      .put(apiUrl + '/produce', details, {
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
            description: 'Unable to edit a produce.',
          });
        } else {
          onEdit(response.data.data);

          setDetails({
            id: '',
            image: '',
            name: '',
          });

          onClose();

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Edited a produce.',
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
          <ModalHeader>Edit Produce</ModalHeader>
          <ModalBody>
            <form>
              <VStack spacing={'$2'}>
                <FormControl required>
                  <FormLabel for="name" color="black">
                    Produce Image
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
                    placeholder="Produce Image"
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
                  <FormHelperText>Give your produce an image.</FormHelperText>
                </FormControl>

                <FormControl required>
                  <FormLabel for="name" color="black">
                    Produce Name
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Produce Name"
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
                  <FormHelperText>Give your produce a name.</FormHelperText>
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
                  onClick={() => editProduce()}
                >
                  Continue
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box w={'100%'} h={'100%'} onClick={onOpen}>
        Edit Produce
      </Box>
    </Box>
  );
};

export default EditProduceModal;
