import React from "react";
import { Header } from "../../components/Header";

const RedeSocial = () => {
  return (
    <div>
      <Header />
      <h2>Tweets da Câmara dos Deputados</h2>
      <iframe
        src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fcamaradeputados"
        width="100%"
        height="600px"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default RedeSocial;
