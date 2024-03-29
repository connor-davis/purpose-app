import {
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
import IconImport from '../../icons/IconImport';

let EcdDocumentsPage = () => {
  let navigate = useNavigate();
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [documents, setDocuments] = createStore([], {
    name: 'documents-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadUserDocuments(userState._id);
    }, 300);
  });

  let loadUserDocuments = (id) => {
    axios
      .get(apiUrl + '/documents/' + id, {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then(async (response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setDocuments(
            response.data.files.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;

              return 0;
            })
          );

          return setLoading(false);
        }
      });
  };

  let uploadDocument = () => {
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'file');
    inputElement.click();
    inputElement.addEventListener('change', (event) => {
      let file = event.target.files[0];

      let form = new FormData();

      form.append('file', file);

      axios
        .post(apiUrl + '/documents', form, {
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            notificationService.show({
              id: 'upload-progress',
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
                      Uploading file
                    </Text>
                  </VStack>
                </HStack>
              ),
            });
          },
          headers: {
            Authorization: 'Bearer ' + authState.authenticationToken,
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
            notificationService.hide('upload-progress');

            notificationService.show({
              title: 'Success',
              description: 'The file was uploaded.',
              status: 'success',
              duration: 3000,
            });

            return loadUserDocuments(userState.id);
          }
        });
    });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Documents</Box>
        <div
          class="flex justify-center items-center px-3 py-2 space-x-2 bg-lime-400 rounded-lg shadow-2xl shadow-lime-400 cursor-pointer"
          onClick={() => uploadDocument()}
        >
          <IconImport />
          <div>Document</div>
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
              <th class={'text-left px-3'}>Name</th>
              <th class={'text-left px-3'}>Type</th>
            </tr>
          </thead>
          <tbody>
            {!loading() &&
              documents.filter((document) => document !== undefined).length >
              0 &&
              documents.map((document) => {
                return (
                  <tr>
                    <td class={'text-left px-3 flex items-center'}>
                      {(
                        document.name.split('.')[1] === "png" ||
                        document.name.split('.')[1] === ".jpeg" ||
                        document.name.split('.')[1] === ".jpg" ||
                        document.name.split('.')[1] === ".webp") ?
                        <img class="w-10 mr-3" src={apiUrl +
                          '/documents/' +
                          document.owner +
                          '/' +
                          document.name} /> :
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>}
                      {document.name.split('.')[0]}
                    </td>
                    <td class={'text-left px-3'}>
                      {document.name.split('.')[1]}
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
                            onSelect={() =>
                              window.open(
                                apiUrl +
                                '/documents/' +
                                document.owner +
                                '/' +
                                document.name,
                                '_blank'
                              )
                            }
                          >
                            Download
                          </MenuItem>
                          <MenuItem
                            colorScheme={'none'}
                            class={'hover:bg-gray-100'}
                            rounded={'$lg'}
                            cursor={'pointer'}
                            onSelect={() =>
                              axios
                                .delete(
                                  apiUrl +
                                  '/documents/' +
                                  document.owner +
                                  '/' +
                                  document.name,
                                  {
                                    headers: {
                                      Authorization:
                                        'Bearer ' +
                                        authState.authenticationToken,
                                    },
                                  }
                                )
                                .then((response) => {
                                  if (response.data.error)
                                    return notificationService.show({
                                      title: 'Error',
                                      description: 'Failed to delete document',
                                      status: 'danger',
                                      duration: 3000,
                                    });
                                  else {
                                    setDocuments([
                                      ...documents.map((d) => {
                                        if (d.name !== document.name) return d;
                                      }),
                                    ]);

                                    return notificationService.show({
                                      title: 'Success',
                                      description:
                                        'Deleted document successfully.',
                                      status: 'success',
                                      duration: 3000,
                                    });
                                  }
                                })
                            }
                          >
                            Delete
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
          <HStack w={'100%'} alignItems="stretch" spacing="$2" p={'$3'}>
            <Skeleton
              width="$full"
              height="80px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
            <Skeleton
              width="$full"
              height="80px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
            <Skeleton
              width="$full"
              height="80px"
              startColor={'#d4d4d4'}
              endColor={'#f5f5f5'}
            />
          </HStack>
        )}

        {!loading() && (
          <>
            {documents.filter((folder) => folder !== undefined).length ===
              0 && (
                <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                  You have no documents.
                </VStack>
              )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default EcdDocumentsPage;
