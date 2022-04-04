import useState from '../../hooks/state';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    HStack,
    Text,
    VStack
} from "@hope-ui/solid";
import {createSignal, onMount} from "solid-js";
import {createStore} from "solid-js/store";
import EditPersonalDetails from "./editPersonalDetails";
import axios from "axios";
import apiUrl from "../../apiUrl";

let ProfilePage = () => {
    let [userState, updateUserState] = useState('userState');
    let [authState, updateAuthState] = useState("authenticationGuard");
    let [pageIndex, setPageIndex] = createSignal(0);
    let [pageSettings, setPageSettings] = createStore({
        editingPersonalDetails: false,
        editingBusinessDetails: false,
        editingBankDetails: false,
        editingLocationDetails: false
    }, {name: "page-settings"});

    let [personalDetails, setPersonalDetails] = createStore({
        firstName: "", lastName: "", idNumber: "", age: "", gender: "", ethnicity: ""
    }, {name: "personal-details"});

    onMount(() => {
        loadDetails()
    });

    let loadDetails = () => {
        setTimeout(() => {
            setPersonalDetails({
                firstName: userState.firstName,
                lastName: userState.lastName,
                idNumber: userState.idNumber,
                age: userState.age,
                gender: userState.gender,
                ethnicity: userState.ethnicity
            });
        }, 100);
    }

    let updateData = (data) => {
        axios.put(apiUrl + "/users", data, {
            headers: {
                Authorization: "Bearer " + authState.authenticationToken
            }
        }).then((response) => {
            if (response.data.error) return console.log(response.data); else {
                updateUserState(response.data.data);

                return loadDetails();
            }
        })
    }

    return <VStack w="100%" h="100%" color="black" roundedTop={"$2xl"}>
        <HStack w="100%" p="$5" class="justify-between">
            <Box>Your Profile</Box>
        </HStack>
        <Box w="100%" h="100%" overflowY="auto" px="$5" pb="$16">
            <Accordion
                index={pageIndex()}
                onChange={value => setPageIndex(value)}
                as={VStack}
                spacing={"$2"}
                w={"100%"}
                h={"100%"}
            >
                <AccordionItem
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    rounded={"$lg"}
                    w={"100%"}
                    bg={"white"}
                >
                    <AccordionButton _hover={{bg: "white", color: "black"}}>
                        <Text flex={1} fontWeight="$medium" textAlign="start">
                            Personal Details
                        </Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel>
                        {pageSettings.editingPersonalDetails && (
                            <EditPersonalDetails data={{...personalDetails}} onChange={(data) => {
                                updateData(data);
                                setPageSettings("editingPersonalDetails", false)
                            }}/>)}

                        {!pageSettings.editingPersonalDetails && (<Box w="100%" h="100%">
                                <VStack spacing="$3">
                                    <Avatar size={"2xl"} bg={"$lime4"}
                                            name={personalDetails.firstName + " " + personalDetails.lastName}
                                            src="broken-link"/>
                                    <VStack w={"100%"} spacing={"$2"}>
                                        <HStack w={"100%"} spacing={"$2"}>
                                            <VStack w={"100%"} spacing={"$1"}>
                                                <Box w={"100%"}>First Name</Box>
                                                <Box w="100%" p="$3" bg="#e5e5e5"
                                                     rounded="$sm">{personalDetails.firstName}</Box>
                                            </VStack>
                                            <VStack w={"100%"} spacing={"$1"}>
                                                <Box w={"100%"}>Last Name</Box>
                                                <Box w="100%" p="$3" bg="#e5e5e5"
                                                     rounded="$sm">{personalDetails.lastName}</Box>
                                            </VStack>
                                        </HStack>
                                        <VStack
                                            w={"100%"} spacing={"$1"}>
                                            <Box w={"100%"}>ID Number</Box>
                                            <Box w="100%" p="$3" bg="#e5e5e5"
                                                 rounded="$sm">{personalDetails.idNumber}</Box>
                                        </VStack>
                                        <VStack
                                            w={"100%"} spacing={"$1"}>
                                            <Box w={"100%"}>Age</Box>
                                            <Box w="100%" p="$3" bg="#e5e5e5"
                                                 rounded="$sm">{personalDetails.age}</Box>
                                        </VStack>
                                        <VStack w={"100%"}
                                                spacing={"$1"}>
                                            <Box w={"100%"}>Gender</Box>
                                            <Box w="100%" p="$3" bg="#e5e5e5"
                                                 rounded="$sm">{personalDetails.gender}</Box>
                                        </VStack>
                                        <VStack w={"100%"}
                                                spacing={"$1"}>
                                            <Box w={"100%"}>Ethnicity</Box>
                                            <Box w="100%" p="$3" bg="#e5e5e5"
                                                 rounded="$sm">{personalDetails.ethnicity}</Box>
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
                                            onClick={() => setPageSettings("editingPersonalDetails", true)}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                </VStack>
                            </Box>)}
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    rounded={"$lg"}
                    w={"100%"}
                    bg={"white"}>
                    <AccordionButton _hover={{bg: "white", color: "black"}} _active={{outline: "none"}}
                                     _focus={{outline: "none", outlineColor: "transparent"}} outline={"none"}>
                        <Text flex={1} fontWeight="$medium" textAlign="start">
                            Business Details
                        </Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel h={"500px"}>
                        Hope UI follows WAI-ARIA standards,
                        helping you to reach the largest audience possible with less effort.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    rounded={"$lg"}
                    w={"100%"}
                    bg={"white"}>
                    <AccordionButton _hover={{bg: "white", color: "black"}} roundedTop={"$2xl"}>
                        <Text flex={1} fontWeight="$medium" textAlign="start">
                            Bank Details
                        </Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel h={"500px"}>
                        Hope UI follows WAI-ARIA standards,
                        helping you to reach the largest audience possible with less effort.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                    borderRadius="$2xl"
                    borderWidth="1px"
                    borderColor="#e5e5e5"
                    rounded={"$lg"}
                    w={"100%"}
                    bg={"white"}>
                    <AccordionButton _hover={{bg: "white", color: "black"}} roundedTop={"$2xl"}>
                        <Text flex={1} fontWeight="$medium" textAlign="start">
                            Location Details
                        </Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel h={"500px"}>
                        Hope UI follows WAI-ARIA standards,
                        helping you to reach the largest audience possible with less effort.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    </VStack>;
};

export default ProfilePage;
