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
  notificationService,
  VStack,
} from '@hope-ui/solid';
import PurposeLogo from '../../components/PurposeLogo';
import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import useState from '../../hooks/state';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import axios from 'axios';

let ResetPasswordPage = () => {
  let navigate = useNavigate();
  let href = document.location.href;
  let hrefSize = href.split('/').length;
  let token = href.split('/')[hrefSize - 1];

  let [user, updateUser, clearUser] = useState('userState');
  let [authenticationGuard, updateAuthenticationGuard, clearAuth] = useState(
    'authenticationGuard'
  );

  let [message, setMessage] = createStore({});

  let [newPassword, setNewPassword] = createSignal('');
  let [confirmNewPassword, setConfirmNewPassword] = createSignal('');

  let resetPassword = () => {
    if (newPassword() !== confirmNewPassword())
      return notificationService.show({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'danger',
        duration: 3000,
      });

    axios
      .post(apiUrl + '/admin/passwordReset', {
        newPassword: newPassword(),
        token,
      })
      .then((response) => {
        if (response.data.error)
          return notificationService.show({
            title: 'Error',
            description: 'Failed to reset your password.',
            status: 'danger',
            duration: 3000,
          });
        else {
          clearUser();
          clearAuth();

          setTimeout(() => {
            navigate('/');
          }, 1000);

          return notificationService.show({
            title: 'Success',
            description: 'Your password has been reset.',
            status: 'success',
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        notificationService.show({
          title: 'Error',
          description: 'Failed to reset password.',
          status: 'danger',
          duration: 3000,
        });
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
                    New Password
                  </FormLabel>
                  <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="New password"
                    size="md"
                    color="black"
                    id="newPassword"
                    type="password"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <FormHelperText>Your new password.</FormHelperText>
                </FormControl>

                <VStack w="100%">
                  <FormControl required>
                    <FormLabel for="email" color="black">
                      Confirm New Password
                    </FormLabel>
                    <Input
                      variant="unstyled"
                      bg="#e5e5e5"
                      p="$3"
                      placeholder="Confirm new password"
                      size="md"
                      color="black"
                      id="confirmPassword"
                      type="password"
                      onChange={(event) => {
                        setConfirmNewPassword(event.target.value);
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
                  onClick={() => resetPassword()}
                >
                  Reset Password
                </Button>
              </Box>
            </VStack>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default ResetPasswordPage;
