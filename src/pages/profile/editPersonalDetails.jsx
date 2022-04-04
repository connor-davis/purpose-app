import {createStore} from "solid-js/store";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Select,
    SelectContent,
    SelectIcon,
    SelectListbox,
    SelectOption,
    SelectOptionIndicator,
    SelectOptionText,
    SelectPlaceholder,
    SelectTrigger,
    SelectValue,
    VStack
} from "@hope-ui/solid";
import {For} from "solid-js";

let EditPersonalDetails = ({
                               data, onChange = (data) => {
    }
                           }) => {
    let [details, setDetails] = createStore(data, {name: "personal-details-editor"});
    return (
        <VStack
            bg="white"
            spacing="$3"
        >
            <Avatar size={"2xl"} bg={"$lime4"}
                    name={details.firstName + " " + details.lastName}
                    src="broken-link"/>
            <HStack w={"100%"} spacing={"$2"}>
                <FormControl required>
                    <FormLabel for="firstName" color="black">
                        First Name
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="First Name"
                        size="sm"
                        color="black"
                        id="firstName"
                        type="text"
                        value={details.firstName || ''}
                        onChange={(event) => {
                            setDetails({
                                ...details,
                                firstName: event.target.value,
                            });
                        }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                </FormControl>

                <FormControl required>
                    <FormLabel for="lastName" color="black">
                        Last Name
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Last Name"
                        size="sm"
                        color="black"
                        id="lastName"
                        type="text"
                        value={details.lastName || ''}
                        onChange={(event) => {
                            setDetails({
                                ...details,
                                lastName: event.target.value,
                            });
                        }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                </FormControl>
            </HStack>

            <FormControl required>
                <FormLabel for="idNumber" color="black">
                    ID Number
                </FormLabel>
                <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="ID Number"
                    size="sm"
                    color="black"
                    id="idNumber"
                    type="text"
                    value={details.idNumber || ''}
                    onChange={(event) => {
                        setDetails({
                            ...details,
                            idNumber: event.target.value,
                        });
                    }}
                />
                {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
            </FormControl>

            <FormControl required>
                <FormLabel for="age" color="black">
                    Age
                </FormLabel>
                <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Age"
                    size="sm"
                    color="black"
                    id="age"
                    type="text"
                    value={details.age || ''}
                    onChange={(event) => {
                        setDetails({
                            ...details,
                            age: event.target.value,
                        });
                    }}
                />
                {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
            </FormControl>

            <FormControl required>
                <FormLabel for="gender" color="black">
                    Gender
                </FormLabel>
                <Select
                    id="gender"
                    variant="unstyled"
                    value={
                        details.gender && details.gender.split('')[0].toUpperCase() +
                        details.gender.substring(
                            1,
                            details.gender.length
                        ) || ''
                    }
                    onChange={(gender) => setDetails({...details, gender})}
                >
                    <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                    >
                        <SelectPlaceholder>Choose Gender</SelectPlaceholder>
                        <SelectValue/>
                        <SelectIcon/>
                    </SelectTrigger>
                    <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                            <For each={['Male', 'Female']}>
                                {(item) => (
                                    <SelectOption
                                        value={item}
                                        w="100%"
                                        bg="white"
                                        _active={{bg: 'white'}}
                                        color="black"
                                    >
                                        <SelectOptionText>{item}</SelectOptionText>
                                        <SelectOptionIndicator color="$lime4"/>
                                    </SelectOption>
                                )}
                            </For>
                        </SelectListbox>
                    </SelectContent>
                </Select>
            </FormControl>

            <FormControl required>
                <FormLabel for="ethnicity" color="black">
                    Ethnicity
                </FormLabel>
                <Select
                    id="ethnicity"
                    variant="unstyled"
                    value={
                        details.ethnicity && details.ethnicity.split('')[0].toUpperCase() +
                        details.ethnicity.substring(
                            1,
                            details.ethnicity.length
                        ) || ''
                    }
                    onChange={(ethnicity) =>
                        setDetails({...details, ethnicity})
                    }
                >
                    <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                    >
                        <SelectPlaceholder>Choose Ethnicity</SelectPlaceholder>
                        <SelectValue/>
                        <SelectIcon/>
                    </SelectTrigger>
                    <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                            <For each={['White', 'Coloured', 'Indian', 'Black']}>
                                {(item) => (
                                    <SelectOption
                                        value={item}
                                        w="100%"
                                        bg="white"
                                        _active={{bg: 'white'}}
                                        color="black"
                                    >
                                        <SelectOptionText>{item}</SelectOptionText>
                                        <SelectOptionIndicator color="$lime4"/>
                                    </SelectOption>
                                )}
                            </For>
                        </SelectListbox>
                    </SelectContent>
                </Select>
            </FormControl>

            <Box w="100%">
                <Button
                    color="black"
                    rounded="$md"
                    class="bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none"
                    w="100%"
                    variant="solid"
                    colorScheme="$lime4"
                    onClick={() => onChange(details)}
                >
                    Update Details
                </Button>
            </Box>
        </VStack>
    )
}

export default EditPersonalDetails;