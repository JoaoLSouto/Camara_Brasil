import React from "react";
import { Timeline, Follow } from "react-twitter-widgets";
import { Header } from "../../components/Header";
import { Subheader } from '../../components/Subheader';
const RedeSocial = () => {
  return (
    <div>
      <Subheader />
      <Header />
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "camaradeputados"
        }}
        options={{
          height: "1000",
          width: "1500",
        }}
      />
    </div>
  );
};

export { RedeSocial };
