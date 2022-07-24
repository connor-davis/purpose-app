import {
    Box,
    Button,
    createDisclosure,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    notificationService,
    VStack
} from '@hope-ui/solid';
import axios from 'axios';
import moment from 'moment';
import { onMount } from 'solid-js';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import apiUrl from '../../../apiUrl';
import Beans from "../../../assets/beans.png";
import BeetRoot from "../../../assets/beetroot.png";
import Butternut from "../../../assets/butternut.png";
import Cabbage from "../../../assets/cabbage.png";
import Cauliflower from "../../../assets/cauliflower.png";
import Cucumber from "../../../assets/cucumber.png";
import Kale from "../../../assets/kale.png";
import Lettuce from "../../../assets/lettuce.png";
import Onion from "../../../assets/onion.png";
import Peppers from "../../../assets/peppers.png";
import Pumpkin from "../../../assets/pumpkin.png";
import Rocket from "../../../assets/rocket.png";
import Rosemary from "../../../assets/rosemary.png";
import SpringOnion from "../../../assets/springonion.png";
import Thyme from "../../../assets/thyme.png";
import Tomatoe from "../../../assets/tomatoe.png";
import useState from '../../../hooks/state';
import IconPlus from '../../../icons/IconPlus';

let AddHarvestModal = ({ onAdd = () => { } }) => {
    let [authState, updateAuthState] = useState('authenticationGuard');

    let { isOpen, onOpen, onClose } = createDisclosure();
    let [details, setDetails] = createStore(
        {
            date: undefined,
            produce: undefined,
            yield: undefined,
            weight: undefined
        },
        { name: 'harvest-details' }
    );

    let [stage, setStage] = createSignal(0);

    let [items, setItems] = createStore([], { name: "produce-list" });

    let [selected, setSelected] = createSignal({});

    onMount(() => {
        setTimeout(() => {
            loadProduce();
        }, 300);
    });

    const loadProduce = () => {
        axios.get(apiUrl + "/produce", {
            headers: {
                Authorization: "Bearer " + authState.authenticationToken
            }
        }).then((response) => {
            setItems(response.data.data);
        });
    };

    const addHarvest = () => {
        if (!details.date) details.date = moment();

        axios
            .post(apiUrl + '/harvests', {
                date: details.date,
                yield: details.yield,
                weight: details.weight,
                produceName: details.produce.name,
                produceImage: details.produce.image,
                producePrice: details.produce.price,
            }, {
                headers: {
                    Authorization: 'Bearer ' + authState.authenticationToken,
                },
            })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data);

                    return notificationService.show({
                        status: 'danger' /* or success, warning, danger */,
                        title: 'Error',
                        description: 'Unable to add new harvest.',
                    });
                } else {
                    onAdd(response.data.data);

                    setDetails({ date: undefined, produce: undefined, yield: undefined });
                    setSelected({});

                    return notificationService.show({
                        status: 'success' /* or success, warning, danger */,
                        title: 'Success',
                        description: 'Added a new harvest.',
                    });
                }
            });
    };

    const setupDatePicker = () => {
        let element = document.getElementById('datepicker');

        if (element) {
            let datepicker = new Datepicker(element, { minDate: '01/01/2022' });

            element.addEventListener('changeDate', (event) => {
                setDetails({
                    ...details,
                    date: event.target.datepicker.dates[0],
                });
            });

            return datepicker;
        }

        return element;
    };

    return (
        <Box>
            <Modal opened={isOpen()} onClose={() => {
                onClose();
                setSelected({});
                setDetails({ date: undefined, produce: undefined, yield: undefined, weight: undefined, });
            }}>
                <ModalOverlay />
                <ModalContent mx={'$2'} bg={'white'} color={'black'} rounded={'$xl'}>
                    <ModalCloseButton />
                    <ModalHeader>Add Harvest</ModalHeader>
                    <ModalBody>
                        {!details.produce && <form>
                            <VStack spacing={"$2"}>
                                <div class="w-full text-gray-600">First lets choose the produce of the harvest.</div>

                                <VStack w={"$full"} h={"$full"} spacing={'$2'} overflowY={"auto"} maxH={"$64"}>
                                    {items.map((item) => (
                                        <div class="flex w-full items-center space-x-2">
                                            <div class={`flex w-full items-center space-x-3 ${selected().name === item.name && "bg-lime-400 text-white rounded-lg"}`}>
                                                <img src={item.image} class="w-10 h-10" />
                                                <div>{item.name}</div>
                                            </div>
                                            <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" onClick={() => {
                                                if (selected().name === item.name) setSelected({});
                                                else setSelected(item);
                                            }}>Select</div>
                                        </div>
                                    ))}
                                </VStack>
                            </VStack>
                        </form>}

                        {details.produce && <form>
                            <VStack spacing={'$2'}>
                                <FormControl>
                                    <FormLabel for="profit" color="black">
                                        Produce
                                    </FormLabel>
                                    <Input
                                        variant="unstyled"
                                        bg="#e5e5e5"
                                        p="$3"
                                        placeholder="Product"
                                        size="sm"
                                        color="black"
                                        id="profit"
                                        type="text"
                                        value={details.produce.name || ''}
                                        disabled={true}
                                    />
                                </FormControl>

                                <FormControl required>
                                    <FormLabel for="numberSold" color="black">
                                        Date Harvested
                                    </FormLabel>
                                    <Input
                                        id="datepicker"
                                        variant="unstyled"
                                        bg="#e5e5e5"
                                        p="$3"
                                        placeholder={
                                            setupDatePicker() && moment().format('MM/DD/YYYY')
                                        }
                                        size="sm"
                                        color="black"
                                        data-date={moment()}
                                    />
                                    <FormHelperText>When was the harvest performed?</FormHelperText>
                                </FormControl>

                                <FormControl required>
                                    <FormLabel for="yield" color="black">
                                        Harvest Yield
                                    </FormLabel>
                                    <Input
                                        variant="unstyled"
                                        bg="#e5e5e5"
                                        p="$3"
                                        placeholder="Harvest Yield"
                                        size="sm"
                                        color="black"
                                        id="yield"
                                        type="number"
                                        value={details.yield || ''}
                                        onChange={(event) =>
                                            setDetails({
                                                ...details,
                                                yield: parseInt(event.target.value),
                                            })
                                        }
                                    />
                                    <FormHelperText>
                                        How much produce of the harvest did you yield?
                                    </FormHelperText>
                                </FormControl>

                                <FormControl>
                                    <FormLabel for="weight" color="black">
                                        Harvest Weight
                                    </FormLabel>
                                    <Input
                                        variant="unstyled"
                                        bg="#e5e5e5"
                                        p="$3"
                                        placeholder="Harvest Weight"
                                        size="sm"
                                        color="black"
                                        id="weight"
                                        type="number"
                                        value={details.weight || ''}
                                        onChange={(event) =>
                                            setDetails({
                                                ...details,
                                                weight: parseInt(event.target.value),
                                            })
                                        }
                                    />
                                    <FormHelperText>
                                        The weight of the harvest, this is optional?
                                    </FormHelperText>
                                </FormControl>
                            </VStack>
                        </form>}
                    </ModalBody>
                    <ModalFooter>
                        <HStack w={'100%'} spacing={'$2'}>
                            <Box w="100%">
                                <Button
                                    color="white"
                                    rounded="$md"
                                    class="bg-red-500 shadow-lg shadow-red-200 select-none outline-none"
                                    w="100%"
                                    variant="solid"
                                    colorScheme="$lime4"
                                    onClick={() => {
                                        onClose();
                                        setSelected({});
                                        setDetails({ date: undefined, produce: undefined, yield: undefined, weight: undefined, });
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                            <Box w="100%">
                                {!details.produce && <Button
                                    color="black"
                                    rounded="$md"
                                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                                    w="100%"
                                    variant="solid"
                                    colorScheme="$lime4"
                                    onClick={() => {
                                        setDetails({ ...details, produce: selected() });
                                        setStage(stage() + 1);
                                    }}
                                >
                                    Continue
                                </Button>}

                                {details.produce && <Button
                                    color="black"
                                    rounded="$md"
                                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                                    w="100%"
                                    variant="solid"
                                    colorScheme="$lime4"
                                    onClick={() => {
                                        addHarvest();
                                    }}
                                >
                                    Add
                                </Button>}
                            </Box>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <HStack
                spacing={'$2'}
                bg={'#e5e5e5'}
                p={'$2'}
                rounded={'$md'}
                cursor={'pointer'}
                onClick={onOpen}
            >
                <IconPlus />
                <Box>Add</Box>
            </HStack>
        </Box>
    );
};

export default AddHarvestModal;
