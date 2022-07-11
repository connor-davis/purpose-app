import {
  Avatar,
  Box,
  CircularProgress,
  CircularProgressIndicator,
  HStack,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  notificationService,
  Skeleton,
  Text,
  VStack
} from '@hope-ui/solid';
import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';
import IconExport from '../../icons/IconExport';

let AdminUsersPage = () => {
  let navigate = useNavigate();
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [users, setUsers] = createStore([], {
    name: 'users-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadUsers();
    }, 300);
  });

  let loadUsers = () => {
    axios
      .get(apiUrl + '/admin/users', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          if (response.data.data.length === 0) return setLoading(false);
          else
            response.data.data.map(async (user) => {
              if (user.type === 'admin') return;

              let salesResponse = await axios.get(
                apiUrl + '/admin/users/sales/' + user.id,
                {
                  headers: {
                    Authorization: 'Bearer ' + authState.authenticationToken,
                  },
                }
              );

              if (salesResponse.data.error)
                return console.log(salesResponse.data.error);
              else {
                let sales = salesResponse.data.data;

                setUsers(
                  [...(users || []), { ...user, sales }].sort((a, b) => {
                    if (a.displayName > b.displayName) return 1;
                    if (a.displayName < b.displayName) return -1;
                    return 0;
                  })
                );

                return setLoading(false);
              }
            });
        }
      });
  };

  let generateResetPassword = (id) => {
    axios
      .get(apiUrl + '/admin/passwordReset/' + id, {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error)
          return notificationService.show({
            title: 'Error',
            description: 'Failed to generate reset password link.',
            status: 'danger',
            duration: 3000,
          });
        else {
          let { link } = response.data.data;

          navigator.clipboard.writeText(link);

          return notificationService.show({
            title: 'Success',
            description:
              'The password reset link has been copied to your clipboard, send it to the user.',
            status: 'info',
            duration: 3000,
          });
        }
      });
  };

  let deleteUser = (email) => {
    axios
      .delete(apiUrl + '/users/' + email, {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        console.log(response.data, response.status);

        if (response.data.error)
          return notificationService.show({
            title: 'Error',
            description: 'Failed to delete the user.',
            status: 'danger',
            duration: 3000,
          });
        else {
          setUsers([
            ...users
              .map((user) => {
                if (user.email !== email) return user;
              })
              .sort((a, b) => {
                if (a.displayName > b.displayName) return 1;
                if (a.displayName < b.displayName) return -1;
                return 0;
              }),
          ]);

          notificationService.show({
            title: 'Success',
            description: 'Deleted user successfully.',
            status: 'success',
            duration: 3000,
          });
        }
      });
  };

  let exportUsers = () => {
    axios
      .get(apiUrl + '/admin/exportUsers', {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          notificationService.show({
            id: 'download-progress',
            render: (props) => (
              <HStack
                bg="$loContrast"
                rounded="$md"
                border="1px solid $neutral7"
                shadow="$lg"
                p="$4"
                w="$full"
              >
                <CircularProgress value={percentCompleted}>
                  <CircularProgressIndicator />
                </CircularProgress>
                <VStack alignItems="flex-start">
                  <Text size="sm" fontWeight="$medium">
                    Downloading file
                  </Text>
                </VStack>
              </HStack>
            ),
          });
        },
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          if (response.status === 200) {
            saveAs(response.data, `purpose-users-data.xlsx`);

            notificationService.hide('download-progress');

            return notificationService.show({
              title: 'Success',
              description: 'The file will be downloaded now.',
              status: 'success',
              duration: 3000,
            });
          }
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Users</Box>
        <div
          class="flex justify-center items-center px-3 py-2 space-x-2 bg-lime-400 rounded-lg shadow-2xl shadow-lime-400 cursor-pointer"
          onClick={() => exportUsers()}
        >
          <IconExport />
          <div>Users</div>
        </div>
      </HStack>

      <Box
        w={'$full'}
        h={'$full'}
        borderRadius={'$2xl'}
        borderWidth={'1px'}
        borderColor={'$gray200'}
        mb={'$16'}
        p={'$2'}
        overflowY={'auto'}
      >
        <table class="table-auto w-full">
          <thead class={'h-10'}>
            <tr>
              <th class={'text-left px-3'}>Image</th>
              <th class={'text-left px-3'}>Name</th>
              <th class={'text-left px-3'}>Email</th>
              <th class={'text-left px-3'}>Address</th>
              <th class={'text-left px-3'}>Employees</th>
              <th class={'text-left px-3'}>Sales</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              users.filter((user) => user !== undefined).length > 0 &&
              users.map((user) => (
                <tr>
                  <td class={'text-left px-3'}>
                    <Avatar
                      size={'sm'}
                      bg={'$lime4'}
                      name={user.firstName + ' ' + user.lastName || ''}
                      src={user.image ? user.image : 'broken-link'}
                    />
                  </td>
                  <td class={'text-left px-3'}>{user.displayName}</td>
                  <td class={'text-left px-3'}>{user.email}</td>
                  <td class={'text-left px-3'}>
                    {user.streetAddress + ', ' + user.city}
                  </td>
                  <td class={'text-left px-3'}>{user.employeesCount}</td>
                  <td class={'text-left px-3'}>
                    {(user.sales && user.sales.length) || 0}
                  </td>
                  <td class={'w-10 p-0 m-0'}>
                    <Menu color={'black'} as>
                      <MenuTrigger
                        class={
                          'flex flex-col justify-center items-center w-10 h-10 hover:bg-gray-100 active:bg-gray-50 bg-opacity-50 rounded-full'
                        }
                        cursor={'pointer'}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="!h-6 !w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </MenuTrigger>
                      <MenuContent
                        minW="$60"
                        bg="white"
                        shadow="$md"
                        borderRadius="$2xl"
                        borderWidth="1px"
                        borderColor="#e5e5e5"
                        rounded={'$lg'}
                        color={'black'}
                      >
                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-gray-100'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => navigate('/users/' + user.id)}
                        >
                          View Profile
                        </MenuItem>

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-gray-100'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => navigate('/users/edit/' + user.id)}
                        >
                          Edit Profile
                        </MenuItem>

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-gray-100'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => generateResetPassword(user.id)}
                        >
                          Reset Password
                        </MenuItem>

                        <MenuItem
                          colorScheme={'none'}
                          class={'hover:bg-red-500 hover:text-white'}
                          rounded={'$lg'}
                          cursor={'pointer'}
                          onSelect={() => deleteUser(user.email)}
                        >
                          Delete User
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {loading() && (
          <VStack w={'100%'} alignItems="stretch" spacing="$2" p={'$3'}>
            <Skeleton
              height="40px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
            <Skeleton
              height="40px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
            <Skeleton
              height="40px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
          </VStack>
        )}

        {!loading() && (
          <>
            {users.filter((user) => user !== undefined).length === 0 && (
              <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                You have no users.
              </VStack>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default AdminUsersPage;
