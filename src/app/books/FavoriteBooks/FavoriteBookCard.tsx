import StarRating from "@/app/components/StarRating";
import { AspectRatio, Box, Dialog, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FavoriteBook } from "../../../../models/models";

interface Props {
  favoriteBook: FavoriteBook;
}

const FavoriteBookCard = ({ favoriteBook }: Props) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex direction={"column"} width={"100%"}>
        <AspectRatio ratio={8 / 12}>
          <Image
            width={300}
            height={200}
            src={
              `/books/${favoriteBook.book.cover_url}.jpg` ||
              `/books/${favoriteBook.book.cover_url}.jpeg`
            }
            alt={favoriteBook.book.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text size={"6"} className="mt-2" weight="medium">
          <Link href={`books/${favoriteBook.book.slug}`}>
            {favoriteBook.book.title}
          </Link>
        </Text>
        <Box>
          <StarRating rating={favoriteBook.rating} />
        </Box>
        <Dialog.Root>
          <Dialog.Trigger>
            <Text className="cursor-pointer">Comment</Text>
          </Dialog.Trigger>
          <Dialog.Content>
            {favoriteBook.comment}
          </Dialog.Content>
          
        </Dialog.Root>
      </Flex>
    </Box>
  );
};

export default FavoriteBookCard;
