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
  Skeleton,
  Text,
  VStack
} from '@hope-ui/solid';
import axios from 'axios';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';
import EditBankDetails from './editBankDetails';
import EditBusinessDetails from './editBusinessDetails';
import EditHandleDetails from './editHandleDetails';
import EditLocationDetails from './editLocationDetails';
import EditPersonalDetails from './editPersonalDetails';

let ProfilePage = () => {
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [pageIndex, setPageIndex] = createSignal(0);
  let [pageSettings, setPageSettings] = createStore(
    {
      editingPersonalDetails: false,
      editingBusinessDetails: false,
      editingHandleDetails: false,
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
      businessName: '',
      businessType: '',
      businessTypeDescription: '',
      businessRegistrationNumber: '',
    },
    { name: 'business-details' }
  );

  let [handleDetails, setHandleDetails] = createStore(
    {
      websiteUrl: '',
      facebookPageUrl: '',
      instagramPageUrl: '',
      youTubeChannelUrl: '',
    },
    { name: 'handle-details' }
  );

  let [bankDetails, setBankDetails] = createStore(
    {
      accountNumber: '',
      bankName: '',
      bankBranchCode: '',
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
        image: userState.image,
        firstName: userState.firstName,
        lastName: userState.lastName,
        idNumber: userState.idNumber,
        age: userState.age,
        gender: userState.gender,
        ethnicity: userState.ethnicity,
      });

      setBusinessDetails({
        businessName: userState.businessName,
        businessType: userState.businessType,
        businessTypeDescription: userState.businessTypeDescription || undefined,
        businessRegistrationNumber:
          userState.businessRegistrationNumber || undefined,
      });

      setHandleDetails({
        websiteUrl: userState.websiteUrl || undefined,
        facebookPageUrl: userState.facebookPageUrl || undefined,
        instagramPageUrl: userState.instagramPageUrl || undefined,
        youtubeChannelUrl: userState.youtubeChannelUrl || undefined,
      });

      setBankDetails({
        accountNumber: userState.accountNumber,
        bankName: userState.bankName,
        bankBranchCode: userState.bankBranchCode,
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

    body.location = [data.streetAddress, data.suburb, data.ward, data.city, data.areaCode, data.province, data.country].filter((piece) => piece !== undefined && piece !== null && piece !== "" && piece !== " ").join(", ");

    axios
      .put(
        apiUrl + '/users',
        { _id: userState._id, ...body },
        {
          headers: {
            Authorization: 'Bearer ' + authState.authenticationToken,
          },
        }
      )
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
      <Box w="100%" h="100%" overflowY="auto" px="$5" pb="$24">
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
                      src={
                        personalDetails.image
                          ? personalDetails.image
                          : 'broken-link'
                      }
                    />
                    <VStack w={'100%'} spacing={'$2'}>
                      <HStack w={'100%'} spacing={'$2'}>
                        <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>First Name</Box>
                          <Skeleton
                            startColor={'#d4d4d4'}
                            endColor={'#f5f5f5'}
                            loaded={!pageSettings.loadingDetails}
                          >
                            <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                              {personalDetails.firstName || 'Unspecified'}
                            </Box>
                          </Skeleton>
                        </VStack>
                        <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>Last Name</Box>
                          <Skeleton
                            startColor={'#d4d4d4'}
                            endColor={'#f5f5f5'}
                            loaded={!pageSettings.loadingDetails}
                          >
                            <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                              {personalDetails.lastName || 'Unspecified'}
                            </Box>
                          </Skeleton>
                        </VStack>
                      </HStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>ID Number</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {personalDetails.idNumber || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Age</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {personalDetails.age || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Gender</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {personalDetails.gender || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Ethnicity</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {personalDetails.ethnicity || 'Unspecified'}
                          </Box>
                        </Skeleton>
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
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Business Name</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {businessDetails.businessName || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Business Type</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {businessDetails.businessType
                              ? businessDetails.businessType
                                  .split('')[0]
                                  .toUpperCase() +
                                businessDetails.businessType.substring(
                                  1,
                                  businessDetails.businessType.length
                                )
                              : 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      {businessDetails.businessType === 'other' && (
                        <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                          <Box w={'100%'}>More</Box>
                          <Skeleton
                            startColor={'#d4d4d4'}
                            endColor={'#f5f5f5'}
                            loaded={!pageSettings.loadingDetails}
                          >
                            <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                              {businessDetails.businessTypeDescription ||
                                'Unspecified'}
                            </Box>
                          </Skeleton>
                        </VStack>
                      )}
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Registration Number</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {businessDetails.registrationNumer || 'Unspecified'}
                          </Box>
                        </Skeleton>
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
                Handle Details
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {pageSettings.editingHandleDetails && (
                <EditHandleDetails
                  data={{ ...handleDetails }}
                  onChange={(data) => {
                    updateData(data);
                    setPageSettings('editingHandleDetails', false);
                  }}
                />
              )}

              {!pageSettings.editingHandleDetails && (
                <Box w="100%" h="100%">
                  <VStack spacing="$3">
                    <VStack w={'100%'} spacing={'$2'}>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Website</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {handleDetails.websiteUrl || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Facebook</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {handleDetails.facebookPageUrl || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Instagram</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {handleDetails.instagramPageUrl || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>YouTube</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {handleDetails.youtubeChannelUrl || 'Unspecified'}
                          </Box>
                        </Skeleton>
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
                          setPageSettings('editingHandleDetails', true)
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
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Account Number</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {bankDetails.accountNumber || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Bank Name</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {bankDetails.bankName || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Branch Code</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {bankDetails.bankBranchCode || 'Unspecified'}
                          </Box>
                        </Skeleton>
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
            class={`${pageIndex() === 4 ? 'h-full overflow-y-auto' : ''}`}
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
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Street Address</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.streetAddress || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Suburb</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.suburb || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Ward</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.ward || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>City</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.city || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Area Code</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.areaCode || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Province</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.province || 'Unspecified'}
                          </Box>
                        </Skeleton>
                      </VStack>
                      <VStack alignItems="stretch" w={'100%'} spacing={'$1'}>
                        <Box w={'100%'}>Country</Box>
                        <Skeleton
                          startColor={'#d4d4d4'}
                          endColor={'#f5f5f5'}
                          loaded={!pageSettings.loadingDetails}
                        >
                          <Box w="100%" p="$3" bg="#e5e5e5" rounded="$sm">
                            {locationDetails.country || 'Unspecified'}
                          </Box>
                        </Skeleton>
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
