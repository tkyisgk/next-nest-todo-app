import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import "reset-css";
import "@/styles/globals.css";

import { client } from "@/graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
