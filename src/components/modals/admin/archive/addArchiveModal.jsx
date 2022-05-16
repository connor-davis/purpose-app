import {
  Box,
  Button,
  createDisclosure,
  HStack,
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
import axios from 'axios';
import { createSignal } from 'solid-js';
import useState from '../../../../hooks/state';
import apiUrl from '../../../../apiUrl';
import IconPlus from '../../../../icons/IconPlus';

let AddArchiveModal = ({ onAdd = () => {} }) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [file, setFile] = createSignal(undefined);

  let addArchive = () => {
    let form = new FormData();

    form.append('file', file());

    axios
      .post(apiUrl + '/archive', form, {
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
            description: 'Unable to add new archive.',
          });
        } else {
          onAdd(response.data.data);

          return notificationService.show({
            status: 'success' /* or success, warning, danger */,
            title: 'Success',
            description: 'Added a new archive.',
          });
        }
      });
  };

  return (
    <Box>
      <Modal
        opened={isOpen()}
        onClose={() => {
          setFile(undefined);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
          <ModalCloseButton />
          <ModalHeader>Add Archive</ModalHeader>
          <ModalBody>
            <form>
              <VStack spacing={'$2'}>
                <label class="flex flex-col w-full h-auto border-2 rounded-lg border-gray-100 border-dashed hover:bg-gray-100 hover:border-lime-400">
                  {!file() && (
                    <div class="flex flex-col items-center justify-center p-3 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Attach file.
                      </p>
                    </div>
                  )}
                  {file() && (
                    <div class="flex flex-col items-center justify-center p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        {file().name}
                      </p>
                    </div>
                  )}
                  <input
                    id="documentsInput"
                    type="file"
                    class="hidden"
                    onClick={(event) => {
                      let documentsInput =
                        document.getElementById('documentsInput');

                      documentsInput.click();
                    }}
                    onChange={(event) => {
                      let f = event.target.files[0];

                      setFile(f);
                    }}
                  />
                </label>
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
                  onClick={() => {
                    setFile(undefined);
                    onClose();
                  }}
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
                  onClick={() => addArchive()}
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

export default AddArchiveModal;
