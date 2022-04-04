import useState from '../../hooks/state';
import {Box, HStack, VStack} from "@hope-ui/solid";

let DashboardPage = () => {
    let [userState, updateUserState] = useState('userState');

    return <VStack w="100%" h="100%" color="black">
        <HStack w="100%" p="$5" class="justify-between">
            <Box>Dashboard</Box>
            <Box>Options</Box>
        </HStack>
        <Box w="100%" h="100%" overflowY="auto" px="$5" pb="$16">

        </Box>
    </VStack>;
};

export default DashboardPage;
