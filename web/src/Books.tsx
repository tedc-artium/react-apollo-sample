import React from "react";
import {
    gql,
    useQuery,
} from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`

type Book = {
  author: String;
  title: String;
}

type GetBooksResponse = {
  books: Book[];
}

export function GetBooks() {
  const {loading, error, data} = useQuery<GetBooksResponse>(GET_BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return <>
      {data.books.map(({title, author}) => {
        return <p><i>{title}</i> by {author}</p>
      })}
    </>
  } else {
    return <p>No Data.</p>
  }
}