import React from "react";
import { Timeline, Follow } from "react-twitter-widgets";
import { Header } from "../../components/Header";

const RedeSocial = () => {
  return (
    <div>
      <Header />
      <h2>Tweets da Câmara dos Deputados</h2>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "camaradeputados"
        }}
        options={{
          height: "1000",
          width: "500",
          theme: "dark"
        }}
      />
    </div>
  );
};

export { RedeSocial };
