import {
  Box,
  createDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Radio,
  RadioGroup,
  Tooltip,
  VStack
} from '@hope-ui/solid';
import { Outlet, useLocation, useNavigate } from 'solid-app-router';
import { createMemo, createSignal } from 'solid-js';
import AdminAnnouncementModal from '../../components/modals/admin/announcements/adminAnnouncementModal';
import PurposeLogoSmall from '../../components/PurposeLogoSmall';
import useState from '../../hooks/state';
import IconDocumentsArchive from '../../icons/IconDocumentsArchive';
import IconDocumentsIn from '../../icons/IconDocumentsIn';
import IconEmployees from '../../icons/IconEmployees';
import IconHome from '../../icons/IconHome';
import IconLogout from '../../icons/IconLogout';
import IconUsers from '../../icons/IconUsers';

let AdminRootPage = ({ children }) => {
  const { isOpen, onOpen, onClose } = createDisclosure();
  let navigate = useNavigate();

  let [authState, setAuthState, clearAuthState] = useState(
    'authenticationGuard'
  );
  let [userState, setUserState, clearUserState] = useState('userState');

  let [sidebarActive, setSidebarActive] = createSignal(false);
  let [isShowing, setIsShowing] = createSignal(false);

  let location = useLocation();

  let path = createMemo(() =>
    location.pathname.split('/')[1] !== ''
      ? '/' + location.pathname.split('/')[1]
      : '/'
  );

  let showAnnouncementModal = () => {
    setIsShowing(!isShowing());
  };

  return (
    <Box w="100%" h="100%" bg="$gray800" color={'white'}>
      <HStack h="100%" bg="$gray800">
        <Box class="hidden md:block" h="100%">
          <VStack h="100%" class="justify-between" bg="$gray900">
            <VStack spacing="$10" py="$5" px="$5">
              <Box>
                <PurposeLogoSmall className={'w-10 h-10 p-0 m-0'} />
              </Box>
              <RadioGroup w="100%">
                <VStack spacing="$2">
                  <Tooltip
                    label="Dashboard"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="dashboard"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${path() === '/' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => navigate('/')}
                    >
                      <IconHome class="w-4 h-4" />
                    </div>
                  </Tooltip>
                  <Tooltip
                    label="Users"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="dashboard"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${path() === '/users' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => navigate('/users')}
                    >
                      <IconUsers class="w-4 h-4" />
                    </div>
                  </Tooltip>
                  {/* <Tooltip
                    label="Employees"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="employees"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${path() === '/employees' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => navigate('/employees')}
                    >
                      <IconEmployees class="w-4 h-4" />
                    </div>
                  </Tooltip> */}
                  <Tooltip
                    label="Documents"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="dashboard"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${path() === '/documents' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => navigate('/documents')}
                    >
                      <IconDocumentsIn class="w-4 h-4" />
                    </div>
                  </Tooltip>
                  <Tooltip
                    label="Archive"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="dashboard"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${path() === '/archive' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => navigate('/archive')}
                    >
                      <IconDocumentsArchive class="w-4 h-4" />
                    </div>
                  </Tooltip>
                  <Tooltip
                    label="Announcement"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <div
                      name="dashboard"
                      class={`flex flex-col items-center justify-center rounded-md shadow-2xl w-full p-3 ${isShowing() ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                      onClick={() => {
                        setIsShowing(true);
                      }}
                    >
                      <AdminAnnouncementModal
                        toggled={isShowing}
                        closed={() => setIsShowing(false)}
                      />
                    </div>
                  </Tooltip>
                </VStack>
              </RadioGroup>
            </VStack>
            <VStack spacing="$10" py="$5" px="$5">
              <RadioGroup w="100%">
                <VStack spacing="$2">
                  <Tooltip
                    label="Logout"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Box
                      cursor="pointer"
                      rounded="$md"
                      shadow="$2xl"
                      bg="$gray800"
                      color="white"
                      class="hover:bg-red-400 hover:bg-opacity-50 hover:text-red-500"
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => {
                        clearUserState();
                        clearAuthState();

                        window.location.href = '/';
                      }}
                    >
                      <IconLogout class="w-5 h-5" />
                    </Box>
                  </Tooltip>
                </VStack>
              </RadioGroup>
            </VStack>
          </VStack>
        </Box>

        <Box
          w="100%"
          h="100%"
          class={'px-0 md:px-5'}
          overflow="hidde"
          color={'white'}
        >
          <HStack class={'px-5 pt-5'}>
            <div class="md:hidden">
              <Box as={'button'} mb="$5" onClick={onOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Box>
              <Drawer opened={isOpen()} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg={'$gray900'} color={'white'}>
                  <DrawerCloseButton />
                  <HStack alignItems="center" w="100%" h="auto" p="$3">
                    <Box w="100%" h="auto">
                      <PurposeLogoSmall className={'w-10 h-10 p-0 m-0'} />
                    </Box>
                  </HStack>

                  <DrawerBody>
                    <RadioGroup w="100%">
                      <VStack spacing="$2">
                        <Tooltip
                          label="Dashboard"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="dashboard"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${path() === '/' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              navigate('/');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconHome class="w-4 h-4" />
                              <Box as="div" class="select-none">
                                Dashboard
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip>
                        <Tooltip
                          label="Users"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="dashboard"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${path() === '/users' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              navigate('/users');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconUsers class="w-4 h-4" />
                              <Box as="div" class="select-none">
                                Users
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip>
                        {/* <Tooltip
                          label="Employees"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="employees"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${path() === '/employees' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              navigate('/employees');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconEmployees class="w-4 h-4" />
                              <Box as="div" class="select-none">
                                Employees
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip> */}
                        <Tooltip
                          label="Documents"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="dashboard"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${path() === '/documents' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              navigate('/documents');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconDocumentsIn class="w-4 h-4" />
                              <Box as="div" class="select-none">
                                Documents
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip>
                        <Tooltip
                          label="Archive"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="dashboard"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${path() === '/archive' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              navigate('/archive');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconDocumentsArchive class="w-4 h-4" />
                              <Box as="div" class="select-none">
                                Archive
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip>
                        <Tooltip
                          label="Announcement"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <div
                            name="dashboard"
                            class={`flex items-center rounded-md shadow-2xl w-full p-3 ${isShowing() === '/' ? 'text-white bg-lime-400' : 'bg-gray-800 text-gray-400'}`}
                            onClick={() => {
                              setIsShowing(true);

                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <AdminAnnouncementModal
                                toggled={isShowing}
                                closed={() => setIsShowing(false)}
                              />
                              <Box as="div" class="select-none">
                                Announcement
                              </Box>
                            </HStack>
                          </div>
                        </Tooltip>
                      </VStack>
                    </RadioGroup>
                  </DrawerBody>

                  <DrawerFooter>
                    <VStack w="100%" spacing="$10">
                      <RadioGroup w="100%">
                        <VStack w="100%" spacing="$2">
                          <Tooltip
                            label="Logout"
                            placement="right"
                            color="white"
                            bg="$blackAlpha11"
                          >
                            <Box
                              cursor="pointer"
                              rounded="$md"
                              shadow="$2xl"
                              bg="$gray800"
                              color="white"
                              class="hover:bg-red-400 hover:bg-opacity-50 hover:text-red-500"
                              borderColor="none"
                              px="$4"
                              py="$3"
                              w="$full"
                              outline="none"
                              onClick={() => {
                                clearUserState();
                                clearAuthState();

                                window.location.href = '/';

                                onClose();
                              }}
                            >
                              <HStack spacing="$5">
                                <IconLogout class="w-4 h-4" />
                                <Box as="div" class="select-none">
                                  Logout
                                </Box>
                              </HStack>
                            </Box>
                          </Tooltip>
                        </VStack>
                      </RadioGroup>
                    </VStack>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <Box as={'div'} ml="auto" mb="$5">
              Welcome, Admin
            </Box>
          </HStack>
          <VStack w="100%" h="100%" bg="white" roundedTop="$xl">
            <Outlet />
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default AdminRootPage;
