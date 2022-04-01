import { Box, Button, Center, VStack } from '@hope-ui/solid';

import PurposeLogo from './PurposeLogo';
import { useNavigate } from 'solid-app-router';

let NoType = () => {
  let navigate = useNavigate();

  return (
    <Center w="100%" h="100%" bg="white">
      <VStack
        spacing="$10"
        bg="white"
        shadow="$2xl"
        borderRadius="$2xl"
        borderWidth="1px"
        borderColor="#e5e5e5"
        p="$5"
        rounded="$2xl"
        w={{ '@initial': '300px', '@sm': '300px', '@md': '400px' }}
      >
        <VStack spacing="$5">
          <PurposeLogo />

          <Center>
            <Box color="black">Welcome to Purpose, lets get your profile setup.</Box>
          </Center>
        </VStack>

        <Button
          color="black"
          rounded="$md"
          class="bg-lime-300 shadow-lg shadow-lime-200 select-none outline-none"
          w="100%"
          variant="solid"
          colorScheme="$lime4"
          onClick={() => navigate('/setupProfile')}
        >
          Setup Profile
        </Button>
      </VStack>
    </Center>
  );
};

export default NoType;
