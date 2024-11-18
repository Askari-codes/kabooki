
import prisma from "../../../../prisma/client";

interface Props {
  params: { id: string };

}

export const revalidate = 0; // Disables caching if the data changes frequently

const WriterProfile = async ({ params }: Props) => {
  const writer = await prisma.writer.findUnique({
    where:{id:parseInt(params.id)}
  })
  console.log(writer);
  

  if (!writer) {
    return <div>Writer not found</div>;
  }

  return (
    <div>
      'The writer is' {writer.name}
    </div>
  );
};

export default WriterProfile;
