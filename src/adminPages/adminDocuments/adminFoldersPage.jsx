import {
  Box,
  HStack,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Skeleton,
  VStack
} from '@hope-ui/solid';
import axios from 'axios';
import { useNavigate } from 'solid-app-router';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../apiUrl';
import useState from '../../hooks/state';

let AdminFoldersPage = () => {
  let navigate = useNavigate();
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [folders, setFolders] = createStore([], {
    name: 'folders-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadUserFolders();
    }, 300);
  });

  let loadUserFolders = () => {
    axios
      .get(apiUrl + '/documents', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then(async (response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setFolders([
            ...folders,
            ...response.data.folders.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            }),
          ]);

          setLoading(false);
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>User Folders</Box>
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
              <th class={'text-left px-3'}>Name</th>
              <th class={'text-left px-3'}>Email</th>
              <th class={'text-right px-3'}>Files</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              folders.filter((folder) => folder !== undefined).length > 0 &&
              folders.map((folder) => {
                return (
                  <tr>
                    <td class={'text-left px-3'}>
                      {(folder.owner && folder.owner.businessName) ||
                        folder.owner.firstName + ' ' + folder.owner.lastName ||
                        ''}
                    </td>
                    <td class={'text-left px-3'}>
                      {(folder.owner && folder.owner.email) || ''}
                    </td>
                    <td class={'text-right px-3'}>{folder.fileCount || 0}</td>
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
                            onSelect={() =>
                              navigate('/documents/' + folder.name)
                            }
                          >
                            View Documents
                          </MenuItem>
                        </MenuContent>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
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
            {folders.filter((folder) => folder !== undefined).length === 0 && (
              <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                You have no user folders.
              </VStack>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default AdminFoldersPage;
