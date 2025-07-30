import { Writer } from "@prisma/client";
import { Container } from "@radix-ui/themes";
import WriterSection from "./WriterSection";


const Writers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`);
    const writers:Writer[] = await response.json();
  
  return (
   <Container>
      <WriterSection writers={writers}>
      </WriterSection>
   </Container>
  );
};

export default Writers;
