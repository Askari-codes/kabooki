import { Podcast } from "@prisma/client";

export interface WriterWithBooks {
  id: number;
  name: string;
  last_name: string;
  country: string;
  description: string | null;
  picture_url: string | null;
  slug: string;
  books: BookWithWriter[];
}

export interface BookWithWriter {
  id: number;
  title: string;
  cover_url: string | null;
  rating: number;
  genre: string;
  slug: string;
  min_price: number;
  writer: {
    id: number;
    name: string;
    last_name: string;
  } | null;
}

export interface PodcastWithHost{
  id:number,            
  title:string,             
  genre:string,             
  summary:string           
  cover_url:string                                      
  slug:string                         
  rating :number         
  min_price :number,
  host:{
    id:number
    name:string
    last_name:string
  } |null     
}
export interface HostWithPodcast{
  name:string
  last_name:string
  description:string
  picture_url:string
  country:string
  slug:string
  podcasts:Podcast[]
}
export interface FavoriteBook {
  id: number;
  rating: number;
  comment: string;
  book: {
    id: number;
    title: string;
    genre: string;
    cover_url: string;
    slug: string;
  };
}
export interface FavoriteMovie {
  id: number;
  rating: number;
  comment: string;
  movie: {
    id: number;
    title: string;
    poster: string;
    slug: string;
  };
}

export interface FavoritePodcast {
  id: number;
  rating: number;
  comment: string;
  podcast: {
    id: number;
    title: string;
    genre: string;
    cover_url: string;
    slug: string;
  };
}

export interface BookCarouselProps {
  books: BookWithWriter[];
  title: string;
}

export interface WriterCaouselProps {
  writers: WriterWithBooks[];
}

export interface SelectedBooksProps {
  writer: WriterWithBooks;
}
export interface CustomSwiperProps {
  books?: BookWithWriter[];
  writers?: WriterWithBooks[];
}
export interface CustomerSwiperSlideProps {
  book?: BookWithWriter;
  writer?: WriterWithBooks;
}
