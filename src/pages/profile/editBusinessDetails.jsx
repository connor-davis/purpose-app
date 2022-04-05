import {createStore} from "solid-js/store";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
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

let EditBusinessDetails = ({
                               data, onChange = (data) => {
    }
                           }) => {
    let [details, setDetails] = createStore(data, {name: "personal-details-editor"});
    return (
        <VStack
            bg="white"
            spacing="$3"
        >
            <FormControl required>
                <FormLabel for="displayName" color="black">
                    Business Name
                </FormLabel>
                <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Business Name"
                    size="sm"
                    color="black"
                    id="displayName"
                    type="text"
                    value={details.displayName || ''}
                    onChange={(event) => {
                        setDetails({
                            ...details,
                            displayName: event.target.value,
                        });
                    }}
                />
                {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
            </FormControl>

            <FormControl required>
                <FormLabel for="type" color="black">
                    Business Type
                </FormLabel>
                <Select
                    id="type"
                    variant="unstyled"
                    value={
                        details.type ?
                            details.type.split('')[0].toUpperCase() + details.type.substring(1, details.type.length)
                            : ""
                    }
                    onChange={(type) => {
                        let typeSplit = type.toString().split(' ');
                        let typeJoin = typeSplit.join('');
                        let typeFormatted =
                            typeJoin.split('')[0].toLowerCase() +
                            typeJoin.substring(1, typeJoin.length);

                        setDetails({
                            ...details,
                            type: typeFormatted,
                        });
                    }}
                >
                    <SelectTrigger
                        border="none"
                        outline="none"
                        bg="#e5e5e5"
                        p="$3"
                        class="outline-none"
                        color="black"
                    >
                        <SelectPlaceholder>
                            Choose Business Type
                        </SelectPlaceholder>
                        <SelectValue/>
                        <SelectIcon/>
                    </SelectTrigger>
                    <SelectContent bg="#e5e5e5" border="none" color="black">
                        <SelectListbox as={VStack} spacing="$1">
                            <For
                                each={[
                                    'Sewing',
                                    'Bakery',
                                    'Wood Work',
                                    'Garden Service',
                                    'Food And Beverage',
                                    'Gardening',
                                    'Nails',
                                    'Salon',
                                    'Consulting',
                                    'Construction',
                                    'Other',
                                ]}
                            >
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

            {details.type === 'other' && (
                <FormControl required>
                    <FormLabel for="typeDescription" color="black">
                        Tell us more?
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        bg="#e5e5e5"
                        p="$3"
                        placeholder="Tell us more?"
                        size="sm"
                        color="black"
                        id="typeDescription"
                        type="text"
                        value={details.typeDescription || ''}
                        onChange={(event) => {
                            setDetails({
                                ...details,
                                typeDescription: event.target.value,
                            });
                        }}
                    />
                    {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
                </FormControl>
            )}

            <FormControl>
                <FormLabel for="registrationNumber" color="black">
                    Registration Number
                </FormLabel>
                <Input
                    variant="unstyled"
                    bg="#e5e5e5"
                    p="$3"
                    placeholder="Registration Number"
                    size="sm"
                    color="black"
                    id="registrationNumber"
                    type="text"
                    value={details.registrationNumber || ''}
                    onChange={(event) => {
                        setDetails({
                            ...details,
                            registrationNumber: event.target.value,
                        });
                    }}
                />
                {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
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

export default EditBusinessDetails;