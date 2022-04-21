import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  gql,
  useQuery
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const GET_BOOKS = gql`
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

function GetBooks() {
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <GetBooks />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
