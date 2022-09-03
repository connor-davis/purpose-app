import { Box } from '@hope-ui/solid';
import { VStack } from '@hope-ui/solid';
import { HStack } from '@hope-ui/solid';

const AdminEmployeesPage = () => {
  return (
    <VStack w="100%" h="100%" color="black" p={'$5'} spacing={'$5'}>
      <HStack w="100%" class="justify-between">
        <Box>Your Employees</Box>
      </HStack>
    </VStack>
  );
};

export default AdminEmployeesPage;
