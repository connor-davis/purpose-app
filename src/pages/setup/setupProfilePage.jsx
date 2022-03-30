import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
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

  let [details, setDetails] = createStore(
    { userType: 'individual' },
    { name: 'details' }
  );

  let [userGender, setUserGender] = createSignal('Select');
  let [userEthnicity, setUserEthnicity] = createSignal('Select');
  let [userType, setUserType] = createSignal('Select');

  setTimeout(() => {
    setStage(stage() + 1);
  }, 3000);

  let completeProfile = () => {
    axios
      .post(apiUrl + '/user/edit', details, {
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
    <div class="flex flex-col items-center w-full h-full bg-gray-800 p-5">
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
            Let's get your location details.
          </div>
        </div>
      )}

      {stage() === 4 && (
        <div class="flex flex-col w-full h-full justify-center items-center text-white">
          <div class="animate-fade-in text-center">
            Thank you for setting up your profile, we look forward to working
            with you.
          </div>
        </div>
      )}

      {stage() === 1 && (
        <div class="flex flex-col w-full h-full justify-center items-center dark:text-white">
          <div class="animate-fade-in">
            <div class="flex space-x-2">
              {/* <div class="self-end">Back</div> */}
              <div class="flex flex-col space-y-5 p-5 bg-white dark:bg-gray-900 rounded shadow">
                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Name</div>
                  <input
                    type="text"
                    placeholder="Name"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userDisplayName: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Description</div>
                  <div
                    type="text"
                    placeholder="Describe yourself"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none w-64"
                    contentEditable={true}
                    onBlur={(event) => {
                      setDetails({
                        ...details,
                        userDescription: event.target.innerText,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Type</div>
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
                          setDetails({ ...details, userType: 'sewing' });
                        }}
                      />

                      <DropDownItem
                        text={'Bakery'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Bakery');
                          setDetails({ ...details, userType: 'bakery' });
                        }}
                      />

                      <DropDownItem
                        text={'Wood Work'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Wood Work');
                          setDetails({ ...details, userType: 'woodWork' });
                        }}
                      />

                      <DropDownItem
                        text={'Garden Service'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Garden Service');
                          setDetails({ ...details, userType: 'gardenService' });
                        }}
                      />

                      <DropDownItem
                        text={'Food and Beverage'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Food and Beverage');
                          setDetails({
                            ...details,
                            userType: 'foodAndBeverage',
                          });
                        }}
                      />

                      <DropDownItem
                        text={'Gardening'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Gardening');
                          setDetails({ ...details, userType: 'gardening' });
                        }}
                      />

                      <DropDownItem
                        text={'Nails'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Nails');
                          setDetails({ ...details, userType: 'nails' });
                        }}
                      />

                      <DropDownItem
                        text={'Salon'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Salon');
                          setDetails({ ...details, userType: 'salon' });
                        }}
                      />

                      <DropDownItem
                        text={'Consulting'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Consulting');
                          setDetails({ ...details, userType: 'consulting' });
                        }}
                      />

                      <DropDownItem
                        text={'Construction'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Construction');
                          setDetails({ ...details, userType: 'construction' });
                        }}
                      />

                      <DropDownItem
                        text={'Other'}
                        extraClasses="p-3 bg-white dark:bg-gray-900 dark:text-white rounded cursor-pointer"
                        onClick={() => {
                          setUserType('Other');
                          setDetails({ ...details, userType: 'other' });
                        }}
                      />
                    </DropDown>
                  </div>
                </div>

                {details.userType === 'other' && (
                  <div class="flex flex-col space-y-2">
                    <div class="text-sm text-lime-500">Tell us more?</div>
                    <input
                      type="text"
                      placeholder="Tell us more?"
                      class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          userTypeDescription: event.target.value,
                        });
                      }}
                    />
                  </div>
                )}

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Phone Number</div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userPhoneNumber: event.target.value,
                      });
                    }}
                  />
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
                  <div class="text-sm text-lime-500">Street Address</div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userStreetAddress: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Suburb</div>
                  <input
                    type="text"
                    placeholder="Suburb"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userSuburb: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Ward</div>
                  <input
                    type="text"
                    placeholder="Ward"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userWard: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">City</div>
                  <input
                    type="text"
                    placeholder="City"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userCity: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Area Code</div>
                  <input
                    type="text"
                    placeholder="Area Code"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userAreaCode: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Province</div>
                  <input
                    type="text"
                    placeholder="Province"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userProvince: event.target.value,
                      });
                    }}
                  />
                </div>

                <div class="flex flex-col space-y-2">
                  <div class="text-sm text-lime-500">Country</div>
                  <input
                    type="text"
                    placeholder="Country"
                    class="bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 outline-none"
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        userCountry: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                class="self-end rounded-full p-2 bg-white dark:bg-gray-900 w-10 h-10 shadow"
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
    </div>
  );
};

export default SetupProfilePage;