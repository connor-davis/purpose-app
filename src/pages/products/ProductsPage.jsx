import { Box, HStack, VStack } from '@hope-ui/solid';

let ProductsPage = () => {
  return (
    <VStack w="100%" h="100%" color="black">
      <HStack w="100%" p="$5" class="justify-between">
        <Box>Your Products</Box>
      </HStack>
      <Box w="100%" h="100%" overflowY="auto" px="$5" pb="$16"></Box>
    </VStack>
  );
};

export default ProductsPage;
