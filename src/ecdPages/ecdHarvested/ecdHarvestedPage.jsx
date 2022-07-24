import { HStack } from "@hope-ui/solid";
import { Box } from "@hope-ui/solid";
import { Skeleton } from "@hope-ui/solid";
import { notificationService } from "@hope-ui/solid";
import { MenuTrigger } from "@hope-ui/solid";
import { MenuItem } from "@hope-ui/solid";
import { MenuContent } from "@hope-ui/solid";
import { Menu } from "@hope-ui/solid";
import { VStack } from "@hope-ui/solid";
import axios from "axios";
import moment from "moment";
import { onMount } from "solid-js";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import apiUrl from "../../apiUrl";
import AddHarvestModal from "../../components/modals/ecd/addHarvestModal";
import AddProduceModal from "../../components/modals/ecd/addProduceModal";
import useState from "../../hooks/state";

const EcdHarvestedPage = () => {
    let [userState, updateUserState] = useState("userState");
    let [authState, updateAuthState] = useState("authenticationGuard");

    let [harvests, setHarvests] = createStore([], { name: "harvests-list" });
    let [loading, setLoading] = createSignal(true);

    onMount(() => {
        setTimeout(() => {
            loadProduce();
        }, 300);
    });

    let loadProduce = () => {
        axios
            .get(apiUrl + '/harvests', {
                headers: {
                    Authorization: 'Bearer ' + authState.authenticationToken,
                },
            })
            .then((response) => {
                if (response.data.error) return console.log(response.data);
                else {
                    setHarvests([
                        ...harvests,
                        ...response.data.data.sort((a, b) => {
                            if (a.date > b.date) return 1;
                            if (a.date < b.date) return -1;

                            return 0;
                        }),
                    ]);

                    return setLoading(false);
                }
            });
    };

    const deleteHarvest = (id) => {
        axios
            .delete(apiUrl + '/harvests/' + id, {
                headers: {
                    Authorization: 'Bearer ' + authState.authenticationToken,
                },
            })
            .then((response) => {
                if (response.data.error) {
                    return notificationService.show({
                        status: 'danger' /* or success, warning, danger */,
                        title: 'Error',
                        description: 'Unable to delete harvest.',
                    });
                } else {
                    setHarvests(
                        [
                            ...harvests.map((harvest) => {
                                if (harvest.id !== id) return harvest;
                            }),
                        ].sort((a, b) => {
                            if (a.date > b.date) return 1;
                            if (a.date < b.date) return -1;

                            return 0;
                        })
                    );

                    return notificationService.show({
                        status: 'success' /* or success, warning, danger */,
                        title: 'Success',
                        description: 'Successfully deleted harvest.',
                    });
                }
            });
    };

    return (
        <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
            <HStack w="100%" class="justify-between">
                <Box>Your Harvests</Box>
                <AddHarvestModal
                    onAdd={(data) =>
                        setHarvests(
                            [...harvests, data].sort((a, b) => {
                                if (a.name > b.name) return 1;
                                if (a.name < b.name) return -1;
                                return 0;
                            })
                        )
                    }
                />
            </HStack>

            <Box
                w={'$full'}
                h={'$full'}
                borderRadius={'$2xl'}
                borderWidth={'1px'}
                borderColor={'$gray200'}
                mb={'$16'}
                p={'$2'}
                overflow={'auto'}
            >
                <table class="table-auto w-full overflow-x-auto">
                    <thead class={'h-10'}>
                        <tr>
                            <th class={'text-left px-3'}>Date</th>
                            <th class={'text-left px-3'}>Produce</th>
                            <th class={'text-left px-3'}>Yield</th>
                            <th class={'text-left px-3'}>Weight (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading() &&
                            harvests.filter((harvest) => harvest !== undefined).length > 0 &&
                            harvests.map((harvest) => (
                                <tr>
                                    <td class={'text-left px-3'}>
                                        {moment(harvest.date).format("DD/MM/YYYY")}
                                    </td>
                                    <td class={'text-left px-3'}>{harvest.produceName}</td>
                                    <td class={'text-left px-3'}>{harvest.yield}</td>
                                    <td class={'text-left px-3'}>{harvest.weight}</td>
                                    <td class={'w-10 p-0 m-0'}>
                                        <Menu color={'black'}>
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
                                                {/* <MenuItem
                          colorScheme={'none'}
                          _hover={{ bg: '#e5e5e5' }}
                          rounded={'$lg'}
                          cursor={'pointer'}
                        >
                          <EditProduceModal
                            data={produce}
                            onEdit={(data) =>
                              setProduce(
                                [
                                  ...produce.map((produce) => {
                                    if (produce.id === data.id) return data;
                                    else return produce;
                                  }),
                                ].sort((a, b) => {
                                  if (a.name > b.name) return 1;
                                  if (a.name < b.name) return -1;
                                  return 0;
                                })
                              )
                            }
                          />
                          Coming Soon.
                        </MenuItem> */}

                                                <MenuItem
                                                    colorScheme={'none'}
                                                    class={'hover:bg-red-500 hover:text-white'}
                                                    rounded={'$lg'}
                                                    cursor={'pointer'}
                                                    onSelect={() => deleteHarvest(harvest.id)}
                                                >
                                                    Delete Harvest
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
                        {harvests.filter((harvest) => harvest !== undefined).length ===
                            0 && (
                                <VStack w={'100%'} justifyContent={'center'} py={'$5'}>
                                    You have no harvests.
                                </VStack>
                            )}
                    </>
                )}
            </Box>
        </VStack>
    )
};

export default EcdHarvestedPage;