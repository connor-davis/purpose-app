import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import DropDown from '../../components/dropdown/DropDown';
import DropDownItem from '../../components/dropdown/DropDownItem';
import useState from '../../hooks/state';

let SetupProfilePage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');
  let [stage, setStage] = createSignal(0);
  let navigate = useNavigate();

  let [details, setDetails] = createStore({}, { name: 'details' });

  let [userGender, setUserGender] = createSignal('Select');
  let [userEthnicity, setUserEthnicity] = createSignal('Select');
  let [userType, setUserType] = createSignal('Select');

  onMount(() => {});

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
      .put(apiUrl + '/users', details, {
        headers: {
          authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
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
      .catch(() => {});
  };

  return (
    <div class="flex flex-col items-center w-full h-full bg-gray-800 p-2">
      {stage() === 0 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Let's begin with your basic details.
          </div>
        </div>
      )}

      {stage() === 2 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Let's get your business details.
          </div>
        </div>
      )}

      {stage() === 4 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Let's get your bank details.
          </div>
        </div>
      )}

      {stage() === 6 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Let's get your location details.
          </div>
        </div>
      )}

      {stage() === 8 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Thank you for setting up your profile, we look forward to working
            with you.
          </div>
        </div>
      )}

      {stage() === 1 && (
        <div class="flex flex-col w-full h-full md:justify-center md:items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2 w-full">
              {/* <div class="self-end">Back</div> */}
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow w-full h-auto md:w-80">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    First Name <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={details.firstName}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        firstName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Last Name <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={details.lastName}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        lastName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    ID Number <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="ID Number"
                    value={details.idNumber}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        idNumber: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Age <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Age"
                    value={details.age}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        age: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Gender <span class="text-lime-500">*</span>
                  </div>
                  <div class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded">
                    <DropDown
                      text={userGender}
                      extraClasses="bg-gray-200 dark:bg-gray-800 dark:text-white rounded p-3 shadow-md"
                    >
                      <DropDownItem
                        text={'Male'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserGender('Male');
                          setDetails({ ...details, gender: 'male' });
                        }}
                      />

                      <DropDownItem
                        text={'Female'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserGender('Female');
                          setDetails({ ...details, gender: 'female' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Ethnicity <span class="text-lime-500">*</span>
                  </div>
                  <div class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded">
                    <DropDown
                      text={userEthnicity}
                      extraClasses="bg-gray-200 dark:bg-gray-800 dark:text-white rounded p-3 shadow-md"
                    >
                      <DropDownItem
                        text={'White'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserEthnicity('White');
                          setDetails({ ...details, ethnicity: 'white' });
                        }}
                      />

                      <DropDownItem
                        text={'Coloured'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserEthnicity('Coloured');
                          setDetails({ ...details, ethnicity: 'coloured' });
                        }}
                      />

                      <DropDownItem
                        text={'Indian'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserEthnicity('Indian');
                          setDetails({ ...details, ethnicity: 'indian' });
                        }}
                      />

                      <DropDownItem
                        text={'Black'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserEthnicity('Black');
                          setDetails({ ...details, ethnicity: 'black' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => {
                  setStage(stage() + 1);

                  setTimeout(() => {
                    setStage(stage() + 1);
                  }, 3000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage() === 3 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => setStage(stage() - 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Business Name <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    value={details.displayName}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        displayName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Business Type <span class="text-lime-500">*</span>
                  </div>
                  <div class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded outline-none w-64">
                    <DropDown
                      text={userType}
                      extraClasses="bg-gray-200 dark:bg-gray-800 dark:text-white rounded p-3 shadow-md"
                    >
                      <DropDownItem
                        text={'Sewing'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Sewing');
                          setDetails({ ...details, type: 'sewing' });
                        }}
                      />

                      <DropDownItem
                        text={'Bakery'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Bakery');
                          setDetails({ ...details, type: 'bakery' });
                        }}
                      />

                      <DropDownItem
                        text={'Wood Work'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Wood Work');
                          setDetails({ ...details, type: 'woodWork' });
                        }}
                      />

                      <DropDownItem
                        text={'Garden Service'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Garden Service');
                          setDetails({ ...details, type: 'gardenService' });
                        }}
                      />

                      <DropDownItem
                        text={'Food and Beverage'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Food and Beverage');
                          setDetails({
                            ...details,
                            type: 'foodAndBeverage',
                          });
                        }}
                      />

                      <DropDownItem
                        text={'Gardening'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Gardening');
                          setDetails({ ...details, type: 'gardening' });
                        }}
                      />

                      <DropDownItem
                        text={'Nails'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Nails');
                          setDetails({ ...details, type: 'nails' });
                        }}
                      />

                      <DropDownItem
                        text={'Salon'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Salon');
                          setDetails({ ...details, type: 'salon' });
                        }}
                      />

                      <DropDownItem
                        text={'Consulting'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Consulting');
                          setDetails({ ...details, type: 'consulting' });
                        }}
                      />

                      <DropDownItem
                        text={'Construction'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Construction');
                          setDetails({ ...details, type: 'construction' });
                        }}
                      />

                      <DropDownItem
                        text={'Other'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Other');
                          setDetails({ ...details, type: 'other' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>

                {details.type === 'other' && (
                  <div class="flex flex-col space-y-2">
                    <div class="text-sm text-lime-500">
                      Tell us more? <span class="text-lime-500">*</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Tell us more?"
                      value={details.typeDescription}
                      class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          typeDescription: event.target.value,
                        });
                      }}
                    />
                  </div>
                )}

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Registration Number</div>
                  <div
                    type="text"
                    placeholder="Registration Number"
                    value={details.registrationNumber}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64"
                    contentEditable={true}
                    onBlur={(event) => {
                      setDetails({
                        ...details,
                        registrationNumber: event.target.innerText,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                disabled={
                  !details.displayName ||
                  !details.type ||
                  (details.type === 'other' && !details.typeDescription)
                }
                onClick={() => {
                  setStage(stage() + 1);

                  setTimeout(() => {
                    setStage(stage() + 1);
                  }, 3000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage() === 5 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => setStage(stage() - 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Account Number <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={details.bankAccountNumber}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        bankAccountNumber: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Bank Name <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={details.bankName}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        bankName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Bank Branch <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Bank Branch"
                    value={details.bankBranch}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        bankBranch: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                disabled={
                  !details.bankAccountNumber ||
                  !details.bankName ||
                  !details.bankBranch
                }
                onClick={() => {
                  setStage(stage() + 1);

                  setTimeout(() => {
                    setStage(stage() + 1);
                  }, 3000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage() === 7 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                onClick={() => setStage(stage() - 2)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Street Address <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={details.streetAddress}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        streetAddress: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Suburb <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Suburb"
                    value={details.suburb}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        suburb: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Ward</div>
                  <input
                    type="text"
                    placeholder="Ward"
                    value={details.ward}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        ward: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    City <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="City"
                    value={details.city}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        city: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Area Code <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Area Code"
                    value={details.areaCode}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        areaCode: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Province <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Province"
                    value={details.province}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        province: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">
                    Country <span class="text-lime-500">*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    value={details.country}
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        country: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
                disabled={
                  !details.streetAddress ||
                  !details.suburb ||
                  !details.city ||
                  !details.areaCode ||
                  !details.province ||
                  !details.country
                }
                onClick={() => {
                  completeProfile();
                }}
              >
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupProfilePage;
