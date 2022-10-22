import {
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputRightElement,
  notificationService,
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
  VStack
} from '@hope-ui/solid';
import { createSignal, For, onMount } from 'solid-js';

import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';
import IconArrowLeft from '../../icons/IconArrowLeft';
import IconArrowRight from '../../icons/IconArrowRight';
import IconCheck from '../../icons/IconCheck';
import IconSearch from '../../icons/IconSearch';
import { FormHelperText } from '@hope-ui/solid';

let SetupProfilePage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');
  let [stage, setStage] = createSignal(0);
  let navigate = useNavigate();

  let [details, setDetails] = createStore({}, { name: 'details' });

  let [userGender, setUserGender] = createSignal('Select');
  let [userEthnicity, setUserEthnicity] = createSignal('Select');
  let [userType, setUserType] = createSignal('Select');
  let [files, setFiles] = createStore([], { name: 'files' });
  let [searchValue, setSearchValue] = createSignal('');
  let [searchResults, setSearchResults] = createStore([], {
    name: 'searchResults',
  });

  onMount(() => { });

  setTimeout(() => {
    setStage(stage() + 1);

    if (userState.gender)
      setUserGender(
        userState.gender.split('')[0].toUpperCase() +
        userState.gender.substring(1, userState.gender.length)
      );

    if (userState.ethnicity)
      setUserEthnicity(
        userState.ethnicity.split('')[0].toUpperCase() +
        userState.ethnicity.substring(1, userState.ethnicity.length)
      );

    if (userState.type)
      setUserType(
        userState.type.split('')[0].toUpperCase() +
        userState.type.substring(1, userState.type.length)
      );

    setDetails(userState);
  }, 3000);

  let completeProfile = () => {
    axios
      .put(
        apiUrl + '/users',
        {
          ...details,
          email: userState.email,
          completedProfile: true,
        },
        {
          headers: {
            authorization: 'Bearer ' + authState.authenticationToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setStage(stage() + 1);

          setTimeout(() => {
            setStage(0);

            navigate('/');

            updateUserState({ ...userState, ...response.data.data });
          }, 4000);
        }
      })
      .catch(() => { });
  };

  return (
    <Center w="100%" h="100%" bg="white">
      <VStack>
        {stage() === 0 && (
          <Box class="animate-fade-in" color="black">
            Let's begin with your basic details.
          </Box>
        )}

        {stage() === 2 && (
          <Box class="animate-fade-in" color="black">
            Let's get your business details.
          </Box>
        )}

        {stage() === 4 && (
          <Box class="animate-fade-in" color="black">
            Let's get your handles. You can leave stuff out here if you don't
            have it.
          </Box>
        )}

        {stage() === 6 && (
          <Box class="animate-fade-in" color="black">
            Let's get your bank details.
          </Box>
        )}

        {stage() === 8 && (
          <Box class="animate-fade-in" color="black">
            Let's get your location details.
          </Box>
        )}

        {stage() === 10 && (
          <Box class="animate-fade-in" color="black">
            Thank you for setting up your profile, we look forward to working
            with you.
          </Box>
        )}

        {stage() === 1 && (
          <form id="personalForm">
            <Box class="animate-fade-in">
              <HStack spacing="$5">
                {/* <div class="self-end">Back</div> */}
                <VStack
                  bg="white"
                  shadow="$2xl"
                  borderRadius="$2xl"
                  borderWidth="1px"
                  borderColor="#e5e5e5"
                  p="$5"
                  rounded="$2xl"
                  spacing="$3"
                  w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                >
                  <FormControl required>
                    <FormLabel for="firstName" color="black">
                      First Name
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="First Name"
                      size="sm"
                      color="black"
                      id="firstName"
                      type="text"
                      value={details.firstName || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          firstName: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="lastName" color="black">
                      Last Name
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Last Name"
                      size="sm"
                      color="black"
                      id="lastName"
                      type="text"
                      value={details.lastName || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          lastName: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="idNumber" color="black">
                      ID Number
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="ID Number"
                      size="sm"
                      color="black"
                      id="idNumber"
                      type="text"
                      value={details.idNumber || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          idNumber: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="age" color="black">
                      Age
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Age"
                      size="sm"
                      color="black"
                      id="age"
                      type="text"
                      value={details.age || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          age: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="gender" color="black">
                      Gender
                    </FormLabel>
                    <Select
                      id="gender"
                      variant="unstyled"
                      value={
                        (details.gender &&
                          details.gender.split('')[0].toUpperCase() +
                          details.gender.substring(
                            1,
                            details.gender.length
                          )) ||
                        ''
                      }
                      onChange={(gender) => setDetails({ ...details, gender })}
                    >
                      <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                      >
                        <SelectPlaceholder>Choose Gender</SelectPlaceholder>
                        <SelectValue />
                        <SelectIcon />
                      </SelectTrigger>
                      <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                          <For each={['Male', 'Female']}>
                            {(item) => (
                              <SelectOption
                                value={item}
                                w="100%"
                                bg="white"
                                _active={{ bg: 'white' }}
                                color="black"
                              >
                                <SelectOptionText>{item}</SelectOptionText>
                                <SelectOptionIndicator color="$lime4" />
                              </SelectOption>
                            )}
                          </For>
                        </SelectListbox>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="ethnicity" color="black">
                      Ethnicity
                    </FormLabel>
                    <Select
                      id="ethnicity"
                      variant="unstyled"
                      value={
                        (details.ethnicity &&
                          details.ethnicity.split('')[0].toUpperCase() +
                          details.ethnicity.substring(
                            1,
                            details.ethnicity.length
                          )) ||
                        ''
                      }
                      onChange={(ethnicity) =>
                        setDetails({ ...details, ethnicity })
                      }
                    >
                      <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                      >
                        <SelectPlaceholder>Choose Ethnicity</SelectPlaceholder>
                        <SelectValue />
                        <SelectIcon />
                      </SelectTrigger>
                      <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                          <For each={['White', 'Coloured', 'Indian', 'Black']}>
                            {(item) => (
                              <SelectOption
                                value={item}
                                w="100%"
                                bg="white"
                                _active={{ bg: 'white' }}
                                color="black"
                              >
                                <SelectOptionText>{item}</SelectOptionText>
                                <SelectOptionIndicator color="$lime4" />
                              </SelectOption>
                            )}
                          </For>
                        </SelectListbox>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </VStack>

                <IconButton
                  type="submit"
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowRight />}
                  onClick={() => {
                    let form = document.getElementById('personalForm');

                    if (form instanceof HTMLFormElement) {
                      if (form.checkValidity()) {
                        setStage(stage() + 1);

                        setTimeout(() => {
                          setStage(stage() + 1);
                        }, 3000);
                      } else {
                        form.reportValidity();
                      }
                    }
                  }}
                />
              </HStack>
            </Box>
          </form>
        )}

        {stage() === 3 && (
          <form id="businessForm">
            <Box class="animate-fade-in">
              <HStack spacing="$5">
                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowLeft />}
                  onClick={() => {
                    setStage(stage() - 2);
                  }}
                />

                <VStack
                  bg="white"
                  shadow="$2xl"
                  borderRadius="$2xl"
                  borderWidth="1px"
                  borderColor="#e5e5e5"
                  p="$5"
                  rounded="$2xl"
                  spacing="$3"
                  w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                >
                  <FormControl required>
                    <FormLabel for="displayName" color="black">
                      Business Name
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Business Name"
                      size="sm"
                      color="black"
                      id="displayName"
                      type="text"
                      value={details.businessName || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          businessName: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="type" color="black">
                      Business Type
                    </FormLabel>
                    <Select
                      id="type"
                      variant="unstyled"
                      value={details.businessType || ''}
                      onChange={(type) => {
                        let typeSplit = type.toString().split(' ');
                        let typeJoin = typeSplit.join('');
                        let typeFormatted =
                          typeJoin.split('')[0].toLowerCase() +
                          typeJoin.substring(1, typeJoin.length);

                        setDetails({
                          ...details,
                          businessType: typeFormatted,
                        });
                      }}
                    >
                      <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                      >
                        <SelectPlaceholder>
                          Choose Business Type
                        </SelectPlaceholder>
                        <SelectValue />
                        <SelectIcon />
                      </SelectTrigger>
                      <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                          <For
                            each={[
                              'Early Childhood Development Center',
                              'Sewing',
                              'Bakery',
                              'Wood Work',
                              'Garden Service',
                              'Food And Beverage',
                              'Gardening',
                              'Nails',
                              'Salon',
                              'Consulting',
                              'Construction',
                              'Other',
                            ]}
                          >
                            {(item) => (
                              <SelectOption
                                value={item}
                                w="100%"
                                bg="white"
                                _active={{ bg: 'white' }}
                                color="black"
                              >
                                <SelectOptionText>{item}</SelectOptionText>
                                <SelectOptionIndicator color="$lime4" />
                              </SelectOption>
                            )}
                          </For>
                        </SelectListbox>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  {details.businessType ===
                    'earlyChildhoodDevelopmentCenter' && (
                      <FormControl required>
                        <FormLabel for="positionAtECD" color="black">
                          Position at ECD
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          bg="#e5e5e5"
                          p="$3"
                          placeholder="What position are you at the ECD?"
                          size="sm"
                          color="black"
                          id="positionAtECD"
                          type="text"
                          value={details.positionAtECD || ''}
                          onChange={(event) => {
                            setDetails({
                              ...details,
                              positionAtECD: event.target.value,
                            });
                          }}
                        />
                        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                      </FormControl>
                    )}

                  {details.businessType ===
                    'earlyChildhoodDevelopmentCenter' && (
                      <FormControl required>
                        <FormLabel for="typeDescription" color="black">
                          How many children
                        </FormLabel>
                        <Input
                          variant="unstyled"
                          bg="#e5e5e5"
                          p="$3"
                          placeholder="How many children are at the ECD?"
                          size="sm"
                          color="black"
                          id="numberOfChildren"
                          type="text"
                          value={details.numberOfChildren || ''}
                          onChange={(event) => {
                            setDetails({
                              ...details,
                              numberOfChildren: event.target.value,
                            });
                          }}
                        />
                        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                      </FormControl>
                    )}

                  {details.businessType === 'other' && (
                    <FormControl required>
                      <FormLabel for="businessTypeDescription" color="black">
                        Tell us more?
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Tell us more?"
                        size="sm"
                        color="black"
                        id="businessTypeDescription"
                        type="text"
                        value={details.businessTypeDescription || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            businessTypeDescription: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>
                  )}

                  <FormControl>
                    <div
                      onClick={() => {
                        if (!details.businessRegistered)
                          setDetails({ ...details, businessRegistered: true });
                        else
                          setDetails({ ...details, businessRegistered: false });
                      }}
                      class="flex items-center space-x-3 text-black cursor-pointer select-none"
                    >
                      <div
                        class={`flex flex-col justify-center items-center w-5 h-5 rounded-md ${details.businessRegistered
                          ? 'bg-lime-400 text-white'
                          : ' bg-gray-300'
                          }`}
                      >
                        {details.businessRegistered && <IconCheck />}
                      </div>
                      <div>Are you registered?</div>
                    </div>
                  </FormControl>

                  {details.businessRegistrationNumber && (
                    <FormControl>
                      <FormLabel for="registrationNumber" color="black">
                        Registration Number
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Registration Number"
                        size="sm"
                        color="black"
                        id="registrationNumber"
                        type="text"
                        value={details.businessRegistrationNumber || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            businessRegistrationNumber: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>
                  )}

                  <FormControl required>
                    <FormLabel for="employeesCount" color="black">
                      Number of Employees
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Number of Employees"
                      size="sm"
                      color="black"
                      id="employeesCount"
                      type="text"
                      value={details.businessNumberOfEmployees || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          businessNumberOfEmployees: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <FormLabel for="registrationNumber" color="black">
                      Company Documents
                    </FormLabel>
                    <label class="flex flex-col w-full h-auto border-2 rounded-lg border-lime-400 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                          Attach documents.
                        </p>
                      </div>
                      <input
                        id="documentsInput"
                        type="file"
                        class="hidden"
                        multiple
                        onChange={(event) => {
                          let files = [...event.target.files];

                          setFiles(
                            files.map((file) => {
                              file.uploaded = false;

                              return { name: file.name, uploaded: false, file };
                            })
                          );
                        }}
                      />
                    </label>
                    <div class="flex flex-col w-full h-auto p-2">
                      {files.map((file) => (
                        <div class="flex justify-between items-center text-black space-y-2">
                          <div>{file.name}</div>
                          {file.uploaded && (
                            <div class="text-lime-400">
                              <IconCheck />
                            </div>
                          )}
                          {!file.uploaded && (
                            <div
                              onClick={() => {
                                let form = new FormData();

                                form.append('file', file.file);

                                axios
                                  .post(apiUrl + '/documents', form, {
                                    headers: {
                                      Authorization:
                                        'Bearer ' +
                                        authState.authenticationToken,
                                      'Content-Type': 'multipart/form-data',
                                    },
                                  })
                                  .then((response) => {
                                    if (response.data.error)
                                      return notificationService.show({
                                        title: 'Error',
                                        description: response.data.message,
                                        status: 'danger',
                                        duration: 5000,
                                      });
                                    else {
                                      setFiles(
                                        [...files].map((f) => {
                                          if (f.name === response.data.name) {
                                            return {
                                              ...f,
                                              uploaded: true,
                                            };
                                          } else return f;
                                        })
                                      );

                                      return notificationService.show({
                                        title: 'Success',
                                        description: response.data.success,
                                        status: 'success',
                                        duration: 5000,
                                      });
                                    }
                                  });
                              }}
                              class="flex px-3 py-2 justify-center items-center rounded-lg bg-lime-400 text-white bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </VStack>

                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowRight />}
                  onClick={() => {
                    let form = document.getElementById('businessForm');

                    if (form instanceof HTMLFormElement) {
                      form.reportValidity();

                      if (form.checkValidity()) {
                        setStage(stage() + 1);

                        setTimeout(() => {
                          setStage(stage() + 1);
                        }, 3000);
                      }
                    }
                  }}
                />
              </HStack>
            </Box>
          </form>
        )}

        {stage() === 5 && (
          <form id="handlesForm">
            <Box class="animate-fade-in">
              <HStack spacing="$5">
                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowLeft />}
                  onClick={() => {
                    setStage(stage() - 2);
                  }}
                />

                <VStack
                  bg="white"
                  shadow="$2xl"
                  borderRadius="$2xl"
                  borderWidth="1px"
                  borderColor="#e5e5e5"
                  p="$5"
                  rounded="$2xl"
                  spacing="$3"
                  w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                >
                  <FormControl>
                    <FormLabel for="website" color="black">
                      Website
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Website"
                      size="sm"
                      color="black"
                      id="website"
                      type="text"
                      value={details.websiteUrl || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          websiteUrl: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <FormLabel for="facebook" color="black">
                      Facebook Page
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Facebook Page"
                      size="sm"
                      color="black"
                      id="facebook"
                      type="text"
                      value={details.facebookPageUrl || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          facebookPageUrl: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <FormLabel for="instagram" color="black">
                      Instagram
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Instagram"
                      size="sm"
                      color="black"
                      id="instagram"
                      type="text"
                      value={details.instagramPageUrl || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          instagramPageUrl: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl>
                    <FormLabel for="youtube" color="black">
                      YouTube Channel
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="YouTube Channel"
                      size="sm"
                      color="black"
                      id="youtube"
                      type="text"
                      value={details.youTubeChannelUrl || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          youTubeChannelUrl: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>
                </VStack>

                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowRight />}
                  onClick={() => {
                    setStage(stage() + 1);

                    setTimeout(() => {
                      setStage(stage() + 1);
                    }, 3000);
                  }}
                />
              </HStack>
            </Box>
          </form>
        )}

        {stage() === 7 && (
          <form id="businessForm">
            <Box class="animate-fade-in">
              <HStack spacing="$5">
                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowLeft />}
                  onClick={() => {
                    setStage(stage() - 2);
                  }}
                />

                <VStack
                  bg="white"
                  shadow="$2xl"
                  borderRadius="$2xl"
                  borderWidth="1px"
                  borderColor="#e5e5e5"
                  p="$5"
                  rounded="$2xl"
                  spacing="$3"
                  w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                >
                  <FormControl required>
                    <FormLabel for="accountNumber" color="black">
                      Account Number
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Account Number"
                      size="sm"
                      color="black"
                      id="accountNumber"
                      type="text"
                      value={details.accountNumber || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          accountNumber: event.target.value,
                        });
                      }}
                    />
                    <FormHelperText>This needs to be a "number".</FormHelperText>
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="bankName" color="black">
                      Bank Name
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Bank Name"
                      size="sm"
                      color="black"
                      id="bankName"
                      type="text"
                      value={details.bankName || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          bankName: event.target.value,
                        });
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="bankBranch" color="black">
                      Bank Branch Code
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Bank Branch Code"
                      size="sm"
                      color="black"
                      id="bankBranch"
                      type="text"
                      value={details.bankBranchCode || ''}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          bankBranchCode: event.target.value,
                        });
                      }}
                    />
                    <FormHelperText>This needs to be the "number" code.</FormHelperText>
                  </FormControl>
                </VStack>

                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowRight />}
                  onClick={() => {
                    let form = document.getElementById('businessForm');

                    if (form instanceof HTMLFormElement) {
                      form.reportValidity();

                      if (form.checkValidity()) {
                        setStage(stage() + 1);

                        setTimeout(() => {
                          setStage(stage() + 1);
                        }, 3000);
                      }
                    }
                  }}
                />
              </HStack>
            </Box>
          </form>
        )}

        {stage() === 9 && (
          <form id="businessForm">
            <Box class="animate-fade-in">
              <HStack spacing="$5">
                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={<IconArrowLeft />}
                  onClick={() => {
                    setStage(stage() - 2);
                  }}
                />

                {!details.streetAddress && (
                  <VStack
                    bg="white"
                    shadow="$2xl"
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    p="$5"
                    rounded="$2xl"
                    spacing="$3"
                    w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                  >
                    <FormControl required>
                      <FormLabel for="streetAddress" color="black">
                        Street Address
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Street Address"
                        size="sm"
                        color="black"
                        id="streetAddress"
                        type="text"
                        value={searchValue() || ''}
                        onChange={(event) => {
                          let value = event.target.value;

                          setSearchValue(value);
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                      <div class="flex flex-col py-2 space-y-2 text-black">
                        {searchResults.map((result) => (
                          <HStack w="100%" spacing="$2">
                            <Box w="100%" p="$3" rounded="$sm" fontSize="$sm">
                              {result.name +
                                ', ' +
                                result.region +
                                ', ' +
                                result.country}
                            </Box>
                            <Box
                              p="$3"
                              class={
                                'flex flex-col justify-center items-center w-10 h-10 hover:bg-gray-100 active:bg-gray-50 bg-opacity-50 rounded-full'
                              }
                              cursor={'pointer'}
                              onClick={() => {
                                setDetails({
                                  streetAddress: result.name,
                                  country: result.country,
                                  province: result.region,
                                  lat: result.latitude,
                                  lng: result.longitude,
                                });
                              }}
                            >
                              <IconCheck />
                            </Box>
                          </HStack>
                        ))}
                      </div>
                    </FormControl>
                  </VStack>
                )}

                {details.streetAddress && (
                  <VStack
                    bg="white"
                    shadow="$2xl"
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    p="$5"
                    rounded="$2xl"
                    spacing="$3"
                    w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
                  >
                    <FormControl required>
                      <FormLabel for="streetAddress" color="black">
                        Street Address
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Street Address"
                        size="sm"
                        color="black"
                        id="streetAddress"
                        type="text"
                        value={details.streetAddress || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            streetAddress: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl required>
                      <FormLabel for="suburb" color="black">
                        Suburb
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Suburb"
                        size="sm"
                        color="black"
                        id="suburb"
                        type="text"
                        value={details.suburb || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            suburb: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl>
                      <FormLabel for="ward" color="black">
                        Ward
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Ward"
                        size="sm"
                        color="black"
                        id="ward"
                        type="text"
                        value={details.ward || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            ward: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl required>
                      <FormLabel for="city" color="black">
                        City
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="City"
                        size="sm"
                        color="black"
                        id="city"
                        type="text"
                        value={details.city || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            city: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl required>
                      <FormLabel for="areaCode" color="black">
                        Area Code
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Area Code"
                        size="sm"
                        color="black"
                        id="areaCode"
                        type="text"
                        value={details.areaCode || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            areaCode: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl required>
                      <FormLabel for="province" color="black">
                        Province
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Province"
                        size="sm"
                        color="black"
                        id="province"
                        type="text"
                        value={details.province || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            province: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>

                    <FormControl required>
                      <FormLabel for="country" color="black">
                        Country
                      </FormLabel>
                      <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Country"
                        size="sm"
                        color="black"
                        id="country"
                        type="text"
                        value={details.country || ''}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            country: event.target.value,
                          });
                        }}
                      />
                      {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                    </FormControl>
                  </VStack>
                )}

                <IconButton
                  variant="ghost"
                  colorScheme="white"
                  rounded="$full"
                  size="lg"
                  class="self-end shadow-2xl shadow-neutral-900"
                  color="black"
                  bg="white"
                  _hover={{ bg: 'white' }}
                  aria-label="Search"
                  icon={details.streetAddress ? <IconCheck /> : <IconSearch />}
                  onClick={() => {
                    if (details.streetAddress) {
                      let form = document.getElementById('businessForm');

                      if (form instanceof HTMLFormElement) {
                        form.reportValidity();

                        if (form.checkValidity()) {
                          completeProfile();
                        }
                      }
                    } else {
                      axios
                        .get(apiUrl + '/findCoords/' + searchValue(), {
                          headers: {
                            Authorization:
                              'Bearer ' + authState.authenticationToken,
                          },
                        })
                        .then((response) => {
                          if (response.data.error)
                            return notificationService.show({
                              title: 'Error',
                              description: 'Failed to find location.',
                              status: 'danger',
                              duration: 5000,
                            });
                          else if (response.data.data) {
                            let results = response.data.data;

                            setSearchResults(results);
                          } else {
                            return notificationService.show({
                              title: 'Hmm..',
                              description: response.data.message,
                              status: 'info',
                              duration: 5000,
                            });
                          }
                        });
                    }
                  }}
                />
              </HStack>
            </Box>
          </form>
        )}
      </VStack>
    </Center>
  );
};

export default SetupProfilePage;
