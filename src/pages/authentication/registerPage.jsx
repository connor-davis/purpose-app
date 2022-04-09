import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from '@hope-ui/solid';

import PurposeLogo from '../../components/PurposeLogo';
import TermsAndConditionsModal from '../../components/modals/tsandcsModal';
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let RegisterPage = ({ toggleLogin = () => {} }) => {
  let [user, updateUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({}, { name: 'message' });

  let [email, setEmail] = createSignal('');
  let [password, setPassword] = createSignal('');
  let [confirmPassword, setConfirmPassword] = createSignal('');

  let [agreedToTermsAndConditions, setAgreedToTermsAndConditions] =
    createSignal(false);
  let [showTermsAndConditionsModal, setShowTermsAndConditionsModal] =
    createSignal(false);

  let authenticate = () => {
    if (email() === '' || password() === '' || confirmPassword() === '')
      return setMessage({
        type: 'error',
        value: 'Please fill out all fields.',
      });
    if (!agreedToTermsAndConditions())
      return setMessage({
        type: 'error',
        value: 'You need to agree to the terms and conditions to register.',
      });
    if (password() !== confirmPassword())
      return setMessage({ type: 'error', value: 'Passwords do not match.' });
    else
      axios
        .post(
          apiUrl + '/auth/register',
          {
            email: email(),
            password: password(),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          updateUser({
            ...response.data.data,
            authenticationToken: undefined,
          });

          updateAuthenticationGuard({
            authenticationToken: response.data.data.authenticationToken,
          });
        })
        .catch(() => {
          setMessage({ type: 'error', value: 'Authentication error.' });
        });
  };

  return (
    <Box class="relative w-full h-full">
      <div class="absolute top-5 right-5 bg-blue-100">
        {message.type && (
          <Alert status={message.type} variant="left-accent">
            <AlertIcon />
            {message.value}
          </Alert>
        )}
      </div>

      {showTermsAndConditionsModal() && (
        <TermsAndConditionsModal
          onAgree={() => {
            setShowTermsAndConditionsModal(false);
            setAgreedToTermsAndConditions(true);
            console.log('User agreed');
          }}
          onDisagree={() => {
            setShowTermsAndConditionsModal(false);
            setAgreedToTermsAndConditions(false);
            console.log('User disagreed');
          }}
          onClose={() => setShowTermsAndConditionsModal(false)}
        />
      )}

      <Center bg="white" class="w-full h-full">
        <VStack spacing="$10">
          <VStack spacing="$5">
            <Box class="flex justify-center items-center w-full h-full">
              <PurposeLogo />
            </Box>

            <Box color="#a3a3a3">
              Already have an account?{' '}
              <span
                class="text-lime-400 cursor-pointer"
                onClick={() => toggleLogin()}
              >
                Authenticate
              </span>
            </Box>
          </VStack>

          <form>
            <VStack
              bg="white"
              shadow="$2xl"
              borderRadius="$2xl"
              borderWidth="1px"
              borderColor="#e5e5e5"
              p="$5"
              rounded="$2xl"
              spacing="$8"
              w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
            >
              <VStack spacing="$3">
                <FormControl required>
                  <FormLabel for="email" color="black">
                    Email
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Your email"
                    size="md"
                    color="black"
                    id="email"
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>

                <VStack w="100%" spacing="$2">
                  <FormControl required>
                    <FormLabel for="password" color="black">
                      Password
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Your password"
                      size="md"
                      color="black"
                      id="password"
                      type="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>

                  <FormControl required>
                    <FormLabel for="password" color="black">
                      Confirm Password
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Confirm password"
                      size="md"
                      color="black"
                      id="password"
                      type="password"
                      _valid={password() !== confirmPassword()}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                  </FormControl>
                </VStack>
              </VStack>

              <VStack w="100%" spacing="$2">
                <Center w="100%" class="space-x-2">
                  <Box
                    class={`flex flex-col justify-center items-center w-5 h-5 rounded-full cursor-pointer ${
                      agreedToTermsAndConditions()
                        ? 'bg-lime-400'
                        : 'bg-gray-400'
                    }`}
                    onClick={() =>
                      setAgreedToTermsAndConditions(
                        !agreedToTermsAndConditions()
                      )
                    }
                  ></Box>
                  <Box
                    class="text-sm cursor-pointer text-gray-400 hover:text-lime-400"
                    onClick={() => setShowTermsAndConditionsModal(true)}
                  >
                    Terms and Conditions
                  </Box>
                </Center>

                <Box w="100%">
                  <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => authenticate()}
                  >
                    Register
                  </Button>
                </Box>
              </VStack>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default RegisterPage;
