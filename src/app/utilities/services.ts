import { Movie } from "@prisma/client";
import { Writer } from "@prisma/client";



export const chunkArray = <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

// Next's dev server can transiently 404 an API route during heavy concurrent
// first-time compiles, returning an HTML error page instead of JSON. Blindly
// calling res.json() on that crashes with "Unexpected token '<'". This
// degrades to an empty array instead of throwing.
export const safeFetchJson = async <T>(url: string): Promise<T[]> => {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      console.error(`Request to ${url} failed with status ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error(`Request to ${url} failed`, err);
    return [];
  }
};
