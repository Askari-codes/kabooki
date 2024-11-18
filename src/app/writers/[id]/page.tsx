import axios from "axios";

interface Props {
  params: { id: string };
}

const WriterProfile = async ({ params }: Props) => {
  const response = await axios.get(
    `${process.env.Base_URL}/api/writers/${params.id}`
  );
  const writer = response.data;

  if (!writer) {
    return <p>Writer not found</p>;
  }

  return <p>The writer is {writer.name}.</p>;
};

export default WriterProfile;
