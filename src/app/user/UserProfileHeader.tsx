import { Box, Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  name: string;
  username: string;
}

const UserProfileHeader = ({ name, username }: Props) => {
  return (
    <Box className="rounded-2xl border border-[#e8dfd0] bg-white p-6 shadow-sm">
      <Flex justify="between" align="center" wrap="wrap" gap="4">
        <Box>
          <Text as="div" size="7" weight="bold" className="font-serif">
            {name}
          </Text>
          <Text as="div" size="3" color="gray">
            {username}
          </Text>
        </Box>
        <Flex gap="3">
          <Button size="3" style={{ cursor: "pointer" }}>
            Follow
          </Button>
          <Button size="3" variant="outline" style={{ cursor: "pointer" }}>
            Message
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserProfileHeader;
