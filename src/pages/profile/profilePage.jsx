import useState from '../../hooks/state';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from '@hope-ui/solid';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import EditPersonalDetails from './editPersonalDetails';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import EditBusinessDetails from './editBusinessDetails';
import EditBankDetails from './editBankDetails';
import EditLocationDetails from './editLocationDetails';

let ProfilePage = () => {
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [pageIndex, setPageIndex] = createSignal(0);
  let [pageSettings, setPageSettings] = createStore(
    {
      editingPersonalDetails: false,
      editingBusinessDetails: false,
      editingBankDetails: false,
      editingLocationDetails: false,
      loadingDetails: true,
    },
    { name: 'page-settings' }
  );

  let [personalDetails, setPersonalDetails] = createStore(
    {
      firstName: '',
      lastName: '',
      idNumber: '',
      age: '',
      gender: '',
      ethnicity: '',
    },
    { name: 'personal-details' }
  );

  let [businessDetails, setBusinessDetails] = createStore(
    {
      displayName: '',
      type: '',
      typeDescription: '',
      registrationNumber: '',
    },
    { name: 'business-details' }
  );

  let [bankDetails, setBankDetails] = createStore(
    {
      accountNumber: '',
      bankName: '',
      bankBranch: '',
    },
    { name: 'bank-details' }
  );

  let [locationDetails, setLocationDetails] = createStore(
    {
      streetAddress: '',
      suburb: '',
      ward: '',
      city: '',
      areaCode: '',
      province: '',
      country: '',
    },
    { name: 'location-details' }
  );

  onMount(() => {});

  setTimeout(() => {
    axios
      .get(apiUrl + '/users', {
        headers: {
          Authorization: `Bearer ${authState.authenticationToken}`,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          updateUserState(response.data.data);

          setPageSettings('loadingDetails', false);

          loadDetails();
        }
      });
  }, 300);

  let loadDetails = () => {
    setTimeout(() => {
      setPersonalDetails({
        firstName: userState.firstName,
        lastName: userState.lastName,
        idNumber: userState.idNumber,
        age: userState.age,
        gender: userState.gender,
        ethnicity: userState.ethnicity,
      });

      setBusinessDetails({
        displayName: userState.displayName,
        type: userState.type,
        typeDescription: userState.typeDescription || undefined,
        registrationNumber: userState.registrationNumber || undefined,
      });

      setBankDetails({
        accountNumber: userState.accountNumber,
        bankName: userState.bankName,
        bankBranch: userState.bankBranch,
      });

      setLocationDetails({
        streetAddress: userState.streetAddress,
        suburb: userState.suburb,
        ward: userState.ward || undefined,
        city: userState.city,
        areaCode: userState.areaCode,
        province: userState.province,
        country: userState.country,
      });
    }, 100);
  };

  let updateData = (data) => {
    setPageSettings('loadingDetails', true);

    let body = {};

    for (let key in data) {
      if (data[key] !== userState[key]) {
        body[key] = data[key];
      }
    }

    axios
      .put(apiUrl + '/users', body, {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          let data = response.data.data;

          updateUserState({
            ...userState,
            ...data,
          });

          setPageSettings('loadingDetails', false);

          return loadDetails();
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" roundedTop={'$2xl'}>
      <HStack w="100%" p="$5" class="justify-between">
        <Box>Your Profile</Box>
      </HStack>
      <Box w="100%" h="100%" overflowY="auto" px="$5" pb="$16">
        <Accordion
          index={pageIndex()}
          onChange={(value) => {
            if (value >= 0) return setPageIndex(value);
            else return setPageIndex(0);
          }}
          as={VStack}
          spacing={'$2'}
          w={'100%'}
          h={'100%'}
        >
          <AccordionItem
            borderRadius="$2xl"
            borderWidth="1px"
            borderColor="#e5e5e5"
            rounded={'$lg'}
            w={'100%'}
            class={`${pageIndex() === 0 ? 'h-full overflow-y-auto' : ''}`}
            bg={'white'}
          >
            <AccordionButton _hover={{ bg: 'white', color: 'black' }}>
              <Text flex={1} fontWeight="$medium" textAlign="start">
                Personal Details
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {pageSettings.editingPersonalDetails && (
                <EditPersonalDetails
                  data={{ ...personalDetails }}
                  onChange={(data) => {
                    updateData(data);
                    setPageSettings('editingPersonalDetails', false);
                  }}
                />
              )}

              {!pageSettings.editingPersonalDetails && (
                <Box w="100%" h="100%">
                  <VStack spacing="$3">
                    <Avatar
                      size={'2xl'}
                      bg={'$lime4'}
                      name={
                        personalDetails.firstName +
                          ' ' +
                          personalDetails.lastName || ''
                      }
                      src="broken-link"
                    />
                    <VStack w={'100%'} spacing={'$2'}>
                      <HStack w={'100%'} spacing={'$2'}>
                        <VStack w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>First Name</Box>
                          <Box
                            w="100%"
                            p="$3"
                            bg="#e5e5e5"
                            rounded="$sm"
                            class={`${
                              pageSettings.loadingDetails ? 'animate-pulse' : ''
                            }`}
                          >
                            {!pageSettings.loadingDetails ? (
                              personalDetails.firstName || 'Unspecified'
                            ) : (
                              <>&#160;</>
                            )}
                          </Box>
                        </VStack>
                        <VStack w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>Last Name</Box>
                          <Box
                            w="100%"
                            p="$3"
                            bg="#e5e5e5"
                            rounded="$sm"
                            class={`${
                              pageSettings.loadingDetails ? 'animate-pulse' : ''
                            }`}
                          >
                            {!pageSettings.loadingDetails ? (
                              personalDetails.lastName || 'Unspecified'
                            ) : (
                              <>&#160;</>
                            )}
                          </Box>
                        </VStack>
                      </HStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>ID Number</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            personalDetails.idNumber || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Age</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            personalDetails.age || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Gender</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            personalDetails.gender || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Ethnicity</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            personalDetails.ethnicity || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                    </VStack>
                    <Box w="100%">
                      <Button
                        color="black"
                        rounded="$md"
                        class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                        w="100%"
                        variant="solid"
                        colorScheme="$lime4"
                        onClick={() =>
                          setPageSettings('editingPersonalDetails', true)
                        }
                      >
                        Edit
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            borderRadius="$2xl"
            borderWidth="1px"
            borderColor="#e5e5e5"
            rounded={'$lg'}
            w={'100%'}
            class={`${pageIndex() === 1 ? 'h-full overflow-y-auto' : ''}`}
            bg={'white'}
          >
            <AccordionButton _hover={{ bg: 'white', color: 'black' }}>
              <Text flex={1} fontWeight="$medium" textAlign="start">
                Business Details
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {pageSettings.editingBusinessDetails && (
                <EditBusinessDetails
                  data={{ ...businessDetails }}
                  onChange={(data) => {
                    updateData(data);
                    setPageSettings('editingBusinessDetails', false);
                  }}
                />
              )}

              {!pageSettings.editingBusinessDetails && (
                <Box w="100%" h="100%">
                  <VStack spacing="$3">
                    <VStack w={'100%'} spacing={'$2'}>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Business Name</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            businessDetails.displayName || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Business Type</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            businessDetails.type ? (
                              businessDetails.type.split('')[0].toUpperCase() +
                              businessDetails.type.substring(
                                1,
                                businessDetails.type.length
                              )
                            ) : (
                              'Unspecified'
                            )
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      {businessDetails.type === 'other' && (
                        <VStack w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>More</Box>
                          <Box
                            w="100%"
                            p="$3"
                            bg="#e5e5e5"
                            rounded="$sm"
                            class={`${
                              pageSettings.loadingDetails ? 'animate-pulse' : ''
                            }`}
                          >
                            {!pageSettings.loadingDetails ? (
                              businessDetails.typeDescription || 'Unspecified'
                            ) : (
                              <>&#160;</>
                            )}
                          </Box>
                        </VStack>
                      )}
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Registration Number</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            businessDetails.registrationNumer || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                    </VStack>
                    <Box w="100%">
                      <Button
                        color="black"
                        rounded="$md"
                        class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                        w="100%"
                        variant="solid"
                        colorScheme="$lime4"
                        onClick={() =>
                          setPageSettings('editingBusinessDetails', true)
                        }
                      >
                        Edit
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            borderRadius="$2xl"
            borderWidth="1px"
            borderColor="#e5e5e5"
            rounded={'$lg'}
            w={'100%'}
            class={`${pageIndex() === 2 ? 'h-full overflow-y-auto' : ''}`}
            bg={'white'}
          >
            <AccordionButton _hover={{ bg: 'white', color: 'black' }}>
              <Text flex={1} fontWeight="$medium" textAlign="start">
                Bank Details
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {pageSettings.editingBankDetails && (
                <EditBankDetails
                  data={{ ...bankDetails }}
                  onChange={(data) => {
                    updateData(data);
                    setPageSettings('editingBankDetails', false);
                  }}
                />
              )}

              {!pageSettings.editingBankDetails && (
                <Box w="100%" h="100%">
                  <VStack spacing="$3">
                    <VStack w={'100%'} spacing={'$2'}>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Account Number</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            bankDetails.accountNumber || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Bank Name</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            bankDetails.bankName || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Branch Code</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            bankDetails.bankBranch || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                    </VStack>
                    <Box w="100%">
                      <Button
                        color="black"
                        rounded="$md"
                        class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                        w="100%"
                        variant="solid"
                        colorScheme="$lime4"
                        onClick={() =>
                          setPageSettings('editingBankDetails', true)
                        }
                      >
                        Edit
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            borderRadius="$2xl"
            borderWidth="1px"
            borderColor="#e5e5e5"
            rounded={'$lg'}
            w={'100%'}
            class={`${pageIndex() === 3 ? 'h-full overflow-y-auto' : ''}`}
            bg={'white'}
          >
            <AccordionButton _hover={{ bg: 'white', color: 'black' }}>
              <Text flex={1} fontWeight="$medium" textAlign="start">
                Location Details
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {pageSettings.editingLocationDetails && (
                <EditLocationDetails
                  data={{ ...locationDetails }}
                  onChange={(data) => {
                    updateData(data);
                    setPageSettings('editingLocationDetails', false);
                  }}
                />
              )}

              {!pageSettings.editingLocationDetails && (
                <Box w="100%" h="100%">
                  <VStack spacing="$3">
                    <VStack w={'100%'} spacing={'$2'}>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Street Address</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.streetAddress || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Suburb</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.suburb || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Ward</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.ward || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>City</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.city || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Area Code</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.areaCode || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Province</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.province || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                      <VStack w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Country</Box>
                        <Box
                          w="100%"
                          p="$3"
                          bg="#e5e5e5"
                          rounded="$sm"
                          class={`${
                            pageSettings.loadingDetails ? 'animate-pulse' : ''
                          }`}
                        >
                          {!pageSettings.loadingDetails ? (
                            locationDetails.country || 'Unspecified'
                          ) : (
                            <>&#160;</>
                          )}
                        </Box>
                      </VStack>
                    </VStack>
                    <Box w="100%">
                      <Button
                        color="black"
                        rounded="$md"
                        class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                        w="100%"
                        variant="solid"
                        colorScheme="$lime4"
                        onClick={() =>
                          setPageSettings('editingLocationDetails', true)
                        }
                      >
                        Edit
                      </Button>
                    </Box>
                  </VStack>
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </VStack>
  );
};

export default ProfilePage;
