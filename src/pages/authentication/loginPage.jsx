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
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import useState from '../../hooks/state';

let LoginPage = ({ toggleLogin = () => {} }) => {
  let [user, updateUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({});

  let [email, setEmail] = createSignal('');
  let [password, setPassword] = createSignal('');

  let authenticate = () => {
    axios
      .post(
        apiUrl + '/auth/login',
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
        setMessage({ type: 'danger', value: 'Authentication error.' });
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

      <Center bg="white" class="w-full h-full">
        <VStack spacing="$10">
          <VStack spacing="$5">
            <Box class="flex justify-center items-center w-full h-full">
              <PurposeLogo />
            </Box>

            <Box color="#a3a3a3">
              Do not have an account yet?{' '}
              <span
                class="text-lime-400 cursor-pointer"
                onClick={() => toggleLogin()}
              >
                Create account
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
              <VStack spacing="$5" w="100%">
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

                <VStack w="100%">
                  <FormControl required>
                    <FormLabel for="email" color="black">
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
                  onClick={() => authenticate()}
                >
                  Login
                </Button>
              </Box>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default LoginPage;
