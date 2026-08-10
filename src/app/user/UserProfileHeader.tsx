import Image from "next/image";
import { Box, Button, Flex, Text, Separator } from "@radix-ui/themes";
import { CalendarIcon, SewingPinIcon } from "@radix-ui/react-icons";

interface Props {
  name: string;
  username: string;
  avatarSrc?: string;
  location?: string | null;
  joinedAt: Date | string;
  followersCount: number;
  followingCount: number;
}

const formatJoinedDate = (joinedAt: Date | string) => {
  const date = typeof joinedAt === "string" ? new Date(joinedAt) : joinedAt;
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
};

const UserProfileHeader = ({
  name,
  username,
  avatarSrc,
  location,
  joinedAt,
  followersCount,
  followingCount,
}: Props) => {
  return (
    <Box className="rounded-2xl border border-[#e8dfd0] bg-white p-6 shadow-sm">
      <Flex justify="between" align="start" wrap="wrap" gap="4">
        <Flex align="center" gap="4">
          {avatarSrc && (
            <Box className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image src={avatarSrc} alt={name} fill style={{ objectFit: "cover" }} />
            </Box>
          )}
          <Box>
            <Text as="div" size="6" weight="bold" className="font-serif text-[#2f2418]">
              {name}
            </Text>
            <Text as="div" size="2" color="gray">
              {username}
            </Text>
          </Box>
        </Flex>
        <Flex gap="3">
          <Button size="2" color="brown" style={{ cursor: "pointer" }}>
            Follow
          </Button>
          <Button size="2" color="brown" variant="outline" style={{ cursor: "pointer" }}>
            Message
          </Button>
        </Flex>
      </Flex>

      <Flex align="center" gap="2" wrap="wrap" mt="4">
        {location && (
          <Flex align="center" gap="1">
            <SewingPinIcon className="text-[#a08d6e]" />
            <Text as="span" size="2" color="gray">
              {location}
            </Text>
          </Flex>
        )}
        {location && <Text size="2" color="gray">·</Text>}
        <Flex align="center" gap="1">
          <CalendarIcon className="text-[#a08d6e]" />
          <Text as="span" size="2" color="gray">
            Joined {formatJoinedDate(joinedAt)}
          </Text>
        </Flex>
      </Flex>

      <Separator size="4" my="3" />

      <Flex gap="5" align="center">
        <Text as="span" size="2">
          <Text weight="bold">{followingCount}</Text>{" "}
          <Text color="gray">Following</Text>
        </Text>
        <Text as="span" size="2">
          <Text weight="bold">{followersCount}</Text>{" "}
          <Text color="gray">Followers</Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default UserProfileHeader;
