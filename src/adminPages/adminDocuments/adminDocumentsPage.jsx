import {
  Box,
  HStack,
  notificationService,
  Skeleton,
  VStack,
} from '@hope-ui/solid';
import { useNavigate, useParams } from 'solid-app-router';
import useState from '../../hooks/state';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import IconTrash from '../../icons/IconTrash';

let AdminDocumentsPage = () => {
  let navigate = useNavigate();
  let params = useParams();
  let [userState, updateUserState] = useState('userState');
  let [authState, updateAuthState] = useState('authenticationGuard');

  let [loading, setLoading] = createSignal(true);

  let [documents, setDocuments] = createStore([], {
    name: 'documents-list',
  });

  onMount(() => {
    setTimeout(() => {
      loadUserDocuments(params.id);
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
          setDocuments([
            ...documents,
            ...response.data.files.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;

              return 0;
            }),
          ]);

          return setLoading(false);
        }
      });
  };

  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>User Documents</Box>
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
        {!loading() &&
          documents.filter((folder) => folder !== undefined).length !== 0 && (
            <div class="flex flex-wrap gap-3 w-full h-full overflow-y-auto">
              {documents.map((document) => (
                <div class="flex flex-col max-w-1/2 flex-1 space-y-3">
                  <div class="flex justify-between items-center">
                    <div>{document.name}</div>
                    <div>
                      <div
                        class="flex justify-center text-white items-center px-3 py-2 space-x-2 bg-red-500 rounded-lg shadow-2xl shadow-red-900 cursor-pointer"
                        onClick={() =>
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
                                    'Bearer ' + authState.authenticationToken,
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
                                setDocuments(
                                  documents.filter(
                                    (d) => (d.name = document.name)
                                  )
                                );

                                return notificationService.show({
                                  title: 'Success',
                                  description: 'Deleted document successfully.',
                                  status: 'success',
                                  duration: 3000,
                                });
                              }
                            })
                        }
                      >
                        <IconTrash />
                      </div>
                    </div>
                  </div>
                  <img
                    src={
                      apiUrl +
                      '/documents/' +
                      document.owner +
                      '/' +
                      document.name
                    }
                  />
                </div>
              ))}
            </div>
          )}

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
                User has no documents.
              </VStack>
            )}
          </>
        )}
      </Box>
    </VStack>
  );
};

export default AdminDocumentsPage;
