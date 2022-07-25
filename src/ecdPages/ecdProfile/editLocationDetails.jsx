import { createStore } from 'solid-js/store';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@hope-ui/solid';

let EditLocationDetails = ({ data, onChange = (data) => {} }) => {
  let [details, setDetails] = createStore(data, {
    name: 'location-details-editor',
  });

  return (
    <VStack bg="white" spacing="$3">
      <FormControl required>
        <FormLabel for="streetAddress" color="black">
          Street Address
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Street Address"
          size="sm"
          color="black"
          id="streetAddress"
          type="text"
          value={details.streetAddress || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              streetAddress: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="suburb" color="black">
          Suburb
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Suburb"
          size="sm"
          color="black"
          id="suburb"
          type="text"
          value={details.suburb || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              suburb: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel for="ward" color="black">
          Ward
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Ward"
          size="sm"
          color="black"
          id="suburb"
          type="text"
          value={details.ward || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              ward: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="city" color="black">
          City
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="City"
          size="sm"
          color="black"
          id="suburb"
          type="text"
          value={details.city || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              city: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="areaCode" color="black">
          Area Code
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Area Code"
          size="sm"
          color="black"
          id="areaCode"
          type="text"
          value={details.areaCode || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              areaCode: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="province" color="black">
          Province
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Province"
          size="sm"
          color="black"
          id="province"
          type="text"
          value={details.province || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              province: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="country" color="black">
          Country
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Country"
          size="sm"
          color="black"
          id="country"
          type="text"
          value={details.country || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              country: event.target.value,
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
  );
};

export default EditLocationDetails;
