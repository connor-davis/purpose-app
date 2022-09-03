import { createStore } from 'solid-js/store';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@hope-ui/solid';

let EditHandleDetails = ({ data, onChange = (data) => {} }) => {
  let [details, setDetails] = createStore(data, {
    name: 'handle-details-editor',
  });

  return (
    <VStack bg="white" spacing="$3">
      <FormControl>
        <FormLabel for="displayName" color="black">
          Website
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Website"
          size="sm"
          color="black"
          id="website"
          type="text"
          value={details.websiteUrl || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              websiteUrl: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel for="facebook" color="black">
          Facebook
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Facebook"
          size="sm"
          color="black"
          id="website"
          type="text"
          value={details.facebookPageUrl || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              facebookPageUrl: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel for="instagram" color="black">
          Instagram
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="Instagram"
          size="sm"
          color="black"
          id="instagram"
          type="text"
          value={details.instagramPageUrl || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              instagramPageUrl: event.target.value,
            });
          }}
        />
        {/* <FormHelperText>Atleast 8 characters.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel for="youtube" color="black">
          YouTube
        </FormLabel>
        <Input
          variant="unstyled"
          bg="#e5e5e5"
          p="$3"
          placeholder="YouTube"
          size="sm"
          color="black"
          id="youtube"
          type="text"
          value={details.youTubeChannelUrl || ''}
          onChange={(event) => {
            setDetails({
              ...details,
              youTubeChannelUrl: event.target.value,
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

export default EditHandleDetails;
