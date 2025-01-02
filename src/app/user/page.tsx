import { Avatar, Container, Flex, Box, Text } from "@radix-ui/themes";
import * as Separator from "@radix-ui/react-separator";
import React from "react";

const UsersPage = () => {
  return (
    <Container>
      <Flex justify="between">
        <Box>
          <Flex direction="column" align="center">
            <Avatar
              src={"/users/Mohammad_Askari.jpg"}
              fallback="Mohammad Askari"
              size="9"
              radius="full"
            />
            <Box className="m-4 p-2 border-2 border-gray border-dashed font-serif font-medium">
              Mohammad Askari
            </Box>
          </Flex>
        </Box>
        <Text className="text-justify w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, fuga
          voluptas ipsam, facilis dolorum, autem voluptate explicabo consectetur
          ut libero dolores! Deserunt eius at earum aliquid accusantium, numquam
          beatae vel minus impedit assumenda, necessitatibus, neque perferendis
          quis magni nisi corrupti adipisci. Explicabo facilis nisi quia
          consequuntur iusto placeat dicta ea aut illo eligendi minima quam,
          autem optio vitae praesentium iste repellendus! Ipsam, laborum
          consequatur in rem atque voluptates nesciunt incidunt est sint
          officia, magni quam architecto veritatis voluptatem, commodi id.
          Dolorum atque fuga expedita ad quam quisquam illum consequatur, minus,
          harum quis corrupti nisi dignissimos dolor facere dolore quo
          blanditiis sapiente nam voluptatum non, sed vel? Ea, blanditiis
          perferendis mollitia ipsa dolore quos sunt molestiae culpa nam, et
          quisquam fuga asperiores quibusdam. Modi, nam quo qui fuga magni eius,
          aliquam eaque nemo fugit a quibusdam, sequi repellat molestiae quis!
          Magnam dolores illum tenetur eaque beatae expedita iure veritatis
          autem consequuntur ut. Deleniti amet repellat quibusdam adipisci
          nesciunt tempora reprehenderit voluptates earum aperiam dignissimos
          nemo, vitae ipsa eius modi sint fugit error repudiandae! Non sequi
          odit nulla molestiae. Fugit ipsa deleniti neque odit at veritatis
          asperiores distinctio unde quos commodi beatae ad necessitatibus
          minima pariatur quia quidem, architecto eaque natus blanditiis
          dignissimos soluta? Accusantium, qui? Inventore quibusdam adipisci et
          reprehenderit quos eius, commodi repudiandae, iure exercitationem
          autem minus saepe dignissimos sunt facere? Consequuntur corporis est
          commodi vitae ad sint unde id velit. Doloremque ipsa perferendis hic,
          neque sapiente laboriosam quidem possimus, debitis est reprehenderit
          ipsum velit dolore fugiat, expedita nam labore?
        </Text>
      </Flex>
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      
    </Container>
  );
};

export default UsersPage;
