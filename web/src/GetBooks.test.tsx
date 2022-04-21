import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { GetBooks, GET_BOOKS } from './Books';

test('renders mocked response', async () => {
  const mocks = [
    {
      request: {
        query: GET_BOOKS,
      },
      result: {
        data: {
          books: [
            {
              title: "book 1",
              author: "author 1"
            },
            {
              title: "book 2",
              author: "author 2"
            }
          ]
        }
      }
    }
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GetBooks />
    </MockedProvider>
  );
  await new Promise(resolve => setTimeout(resolve, 100));
  const linkElement = screen.getByText(/book 1/i);
  expect(linkElement).toBeInTheDocument();
});
