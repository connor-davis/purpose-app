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
  Textarea,
  VStack,
} from '@hope-ui/solid';
import { createStore } from 'solid-js/store';
import useState from '../../../../hooks/state';
import IconAnnouncement from '../../../../icons/IconAnnouncement';

let AddProductModal = ({ toggled, closed = () => {} }) => {
  let [authState, updateAuthState] = useState('authenticationGuard');

  let { isOpen, onOpen, onClose } = createDisclosure();
  let [details, setDetails] = createStore(
    {
      announcementTitle: '',
      announcementBody: '',
    },
    { name: 'announcement-details' }
  );

  let addAnnouncement = () => {
    socket.emit('announcement', {
      data: details,
      token: authState.authenticationToken,
    });

    setDetails({ announcementTitle: '', announcementBody: '' });

    onClose();
  };

  return (
    <Box>
      <Modal
        opened={toggled()}
        onClose={() => {
          closed();
        }}
      >
        <ModalOverlay />
        <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
          <ModalCloseButton />
          <ModalHeader>Add Announcement</ModalHeader>
          <ModalBody>
            <form>
              <VStack spacing={'$2'}>
                <FormControl required>
                  <FormLabel for="cost" color="black">
                    Title
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Title"
                    size="sm"
                    color="black"
                    id="cost"
                    type="text"
                    value={details.announcementTitle || ''}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        announcementTitle: event.target.value,
                      });
                    }}
                  />
                  <FormHelperText>Title of the announcement.</FormHelperText>
                </FormControl>

                <FormControl required>
                  <FormLabel for="price" color="black">
                    Body
                  </FormLabel>
                  <Textarea
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Body"
                    size="sm"
                    color="black"
                    id="price"
                    type="text"
                    value={details.announcementBody || ''}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        announcementBody: event.target.value,
                      });
                    }}
                  />
                  <FormHelperText>Body of the announcement.</FormHelperText>
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
                  onClick={() => {
                    closed();
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
                  onClick={() => addAnnouncement()}
                >
                  Continue
                </Button>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div class="w-full h-full text-white">
        <IconAnnouncement />
      </div>
    </Box>
  );
};

export default AddProductModal;
