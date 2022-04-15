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
  RadioLabel,
  Tooltip,
  VStack,
} from '@hope-ui/solid';
import { createMemo, createSignal } from 'solid-js';
import { Outlet, useLocation, useNavigate } from 'solid-app-router';

import IconCube from '../../icons/IconCube';
import IconHome from '../../icons/IconHome';
import PurposeLogoSmall from '../../components/PurposeLogoSmall';
import useState from '../../hooks/state';
import IconProfile from '../../icons/IconProfile';
import IconLogout from '../../icons/IconLogout';
import IconCash from '../../icons/IconCash';
import IconDocumentsIn from '../../icons/IconDocumentsIn';

let RootPage = ({ children }) => {
  const { isOpen, onOpen, onClose } = createDisclosure();
  let navigate = useNavigate();

  let [authState, setAuthState, clearAuthState] = useState(
    'authenticationGuard'
  );
  let [userState, setUserState, clearUserState] = useState('userState');

  let [sidebarActive, setSidebarActive] = createSignal(false);

  let location = useLocation();

  let path = createMemo(() =>
    location.pathname.split('/')[1] !== ''
      ? '/' + location.pathname.split('/')[1]
      : '/'
  );

  return (
    <Box w="100%" h="100%" bg="$loContrast" class="select-none">
      <HStack h="100%" bg="$whiteAlpha6">
        <Box class="hidden md:block" h="100%">
          <VStack h="100%" class="justify-between" bg="$loContrast">
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
                    <Radio
                      name="dashboard"
                      rounded="$md"
                      shadow="$2xl"
                      bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                      color={path() === '/' ? '$lime4' : '$white'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => navigate('/')}
                    >
                      <RadioLabel>
                        <IconHome />
                      </RadioLabel>
                    </Radio>
                  </Tooltip>
                  <Tooltip
                    label="Products"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Box
                      cursor="pointer"
                      rounded="$md"
                      shadow="$2xl"
                      bg={
                        path() === '/products' ? '$limeAlpha4' : '$whiteAlpha6'
                      }
                      color={path() === '/products' ? '$lime4' : '$white'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => navigate('/products')}
                    >
                      <IconCube />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    label="Sales"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Box
                      cursor="pointer"
                      rounded="$md"
                      shadow="$2xl"
                      bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                      color={path() === '/' ? '$lime4' : '$white'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => navigate('/')}
                    >
                      <IconCash />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    label="Expenses"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Box
                      cursor="pointer"
                      rounded="$md"
                      shadow="$2xl"
                      bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                      color={path() === '/' ? '$lime4' : '$white'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => navigate('/')}
                    >
                      <IconDocumentsIn />
                    </Box>
                  </Tooltip>
                </VStack>
              </RadioGroup>
            </VStack>
            <VStack spacing="$10" py="$5" px="$5">
              <RadioGroup w="100%">
                <VStack spacing="$2">
                  <Tooltip
                    label="Profile"
                    placement="right"
                    color="white"
                    bg="$blackAlpha11"
                  >
                    <Radio
                      name="profile"
                      rounded="$md"
                      shadow="$2xl"
                      bg={
                        path() === '/profile' ? '$limeAlpha4' : '$whiteAlpha6'
                      }
                      color={path() === '/profile' ? '$lime4' : '$white'}
                      borderColor="none"
                      px="$4"
                      py="$3"
                      w="$full"
                      outline="none"
                      onClick={() => navigate('/profile')}
                    >
                      <RadioLabel>
                        <IconProfile />
                      </RadioLabel>
                    </Radio>
                  </Tooltip>
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
                      bg="$whiteAlpha6"
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

                        window.location = window.location;
                      }}
                    >
                      <IconLogout />
                    </Box>
                  </Tooltip>
                </VStack>
              </RadioGroup>
            </VStack>
          </VStack>
        </Box>

        <Box w="100%" h="100%" class={'px-0 md:px-5'} overflow="hidden">
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
                <DrawerContent bg="#111212">
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
                          <Radio
                            name="dashboard"
                            rounded="$md"
                            shadow="$2xl"
                            bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                            color={path() === '/' ? '$lime4' : '$white'}
                            borderColor="none"
                            px="$4"
                            py="$3"
                            w="$full"
                            outline="none"
                            onClick={() => {
                              navigate('/');
                              onClose();
                            }}
                          >
                            <RadioLabel>
                              <HStack spacing="$5">
                                <IconHome />
                                <Box as="div" class="select-none">
                                  Dashboard
                                </Box>
                              </HStack>
                            </RadioLabel>
                          </Radio>
                        </Tooltip>
                        <Tooltip
                          label="Products"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <Box
                            cursor="pointer"
                            rounded="$md"
                            shadow="$2xl"
                            bg={
                              path() === '/products'
                                ? '$limeAlpha4'
                                : '$whiteAlpha6'
                            }
                            color={path() === '/products' ? '$lime4' : '$white'}
                            borderColor="none"
                            px="$4"
                            py="$3"
                            w="$full"
                            outline="none"
                            onClick={() => {
                              navigate('/products');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconCube />
                              <Box as="div" class="select-none">
                                Products
                              </Box>
                            </HStack>
                          </Box>
                        </Tooltip>
                        <Tooltip
                          label="Sales"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <Box
                            cursor="pointer"
                            rounded="$md"
                            shadow="$2xl"
                            bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                            color={path() === '/' ? '$lime4' : '$white'}
                            borderColor="none"
                            px="$4"
                            py="$3"
                            w="$full"
                            outline="none"
                            onClick={() => {
                              navigate('/');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconCash />
                              <Box as="div" class="select-none">
                                Sales
                              </Box>
                            </HStack>
                          </Box>
                        </Tooltip>
                        <Tooltip
                          label="Expenses"
                          placement="right"
                          color="white"
                          bg="$blackAlpha11"
                        >
                          <Box
                            cursor="pointer"
                            rounded="$md"
                            shadow="$2xl"
                            bg={path() === '/' ? '$limeAlpha4' : '$whiteAlpha6'}
                            color={path() === '/' ? '$lime4' : '$white'}
                            borderColor="none"
                            px="$4"
                            py="$3"
                            w="$full"
                            outline="none"
                            onClick={() => {
                              navigate('/');
                              onClose();
                            }}
                          >
                            <HStack spacing="$5">
                              <IconDocumentsIn />
                              <Box as="div" class="select-none">
                                Expenses
                              </Box>
                            </HStack>
                          </Box>
                        </Tooltip>
                      </VStack>
                    </RadioGroup>
                  </DrawerBody>

                  <DrawerFooter>
                    <VStack w="100%" spacing="$10">
                      <RadioGroup w="100%">
                        <VStack w="100%" spacing="$2">
                          <Tooltip
                            label="Profile"
                            placement="right"
                            color="white"
                            bg="$blackAlpha11"
                            w="100%"
                          >
                            <Radio
                              name="profile"
                              rounded="$md"
                              shadow="$2xl"
                              bg={
                                path() === '/profile'
                                  ? '$limeAlpha4'
                                  : '$whiteAlpha6'
                              }
                              color={
                                path() === '/profile' ? '$lime4' : '$white'
                              }
                              borderColor="none"
                              px="$4"
                              py="$3"
                              w="100%"
                              outline="none"
                              onClick={() => {
                                navigate('/profile');
                                onClose();
                              }}
                            >
                              <RadioLabel>
                                <HStack spacing="$5">
                                  <IconProfile />
                                  <Box as="div" class="select-none">
                                    Profile
                                  </Box>
                                </HStack>
                              </RadioLabel>
                            </Radio>
                          </Tooltip>
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
                              bg="$whiteAlpha6"
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

                                window.location = window.location;

                                onClose();
                              }}
                            >
                              <HStack spacing="$5">
                                <IconLogout />
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
              Welcome, {userState.displayName}
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

export default RootPage;
