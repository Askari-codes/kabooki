import React from "react";
import { Box, Card, Inset, Strong,Text } from "@radix-ui/themes";
import { writer } from "@prisma/client";
import Image from "next/image";



interface WriterCardProps {
  writer:writer
}

const WriterCard: React.FC<WriterCardProps> = ({writer}) => {
  return (
    <Box width='20%'>
	<Card className="w-[300px]"  >
		<Inset clip="padding-box" side="top" pb="current">
			<Image
				src={'/default-image.jpg'}
				alt="Bold typography"
				style={{
					display: "block",
					objectFit: "cover",
					width: "100%",
					height: 140,
					backgroundColor: "var(--gray-5)",
				}}
			/>
		</Inset>
		<Text as="p" size="3">
			<Strong>{`${writer.name} ${writer.last_name}`}</Strong> is the art and technique of arranging type to
			make written language legible, readable and appealing when displayed.
		</Text>
	</Card>
</Box>
  );
};

export default WriterCard;
