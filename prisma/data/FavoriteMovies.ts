import prisma from "../client";


export async function getFavoriteMovies() {
     
    try {
        const movie = await prisma.movie.findUnique({
          where: { slug:'pulp-fiction' },
        });
        return movie;
      } catch (error) {
        console.error("Failed to retrieve movie:", error);
        throw error; // Re-throw the error to handle it in the calling function
      }

}



