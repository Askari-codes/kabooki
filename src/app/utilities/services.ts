import { Movie } from "@prisma/client";
import { Writer } from "@prisma/client";

interface chunkArray{
    writers:Writer[]

}

export const chunkArray = <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  