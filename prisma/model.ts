import { Book, Director, Movie, Writer } from "@prisma/client"
export interface SearchModel{
writers?:Writer[]
books?:Book[]
directors?:Director[]
movies?:Movie[]
}