import { createStore } from 'solid-js/store';
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
  VStack,
} from '@hope-ui/solid';
import { For } from 'solid-js';

let EditBankDetails = ({ data, onChange = (data) => {} }) => {
  let [details, setDetails] = createStore(data, {
    name: 'bank-details-editor',
  });

  return (
    <VStack bg="white" spacing="$3">
      <FormControl required>
        <FormLabel for="accountNumber" color="black">
          Account Number
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Account Number"
          size="sm"
          color="black"
          id="accountNumber"
          type="text"
          value={details.accountNumber || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              accountNumber: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl required>
        <FormLabel for="bankName" color="black">
          Bank Name
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Bank Name"
          size="sm"
          color="black"
          id="bankName"
          type="text"
          value={details.bankName || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              bankName: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel for="bankBranch" color="black">
          Branch Code
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Branch Code"
          size="sm"
          color="black"
          id="bankBranch"
          type="text"
          value={details.bankBranchCode || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              bankBranchCode: event.target.value,
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

export default EditBankDetails;
