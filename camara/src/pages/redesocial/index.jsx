import React from "react";
import { Timeline} from "react-twitter-widgets";
import { Header } from "../../components/Header";
import { Subheader } from '../../components/Subheader';
import { Bottom } from '../../components/Bottom';
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
      <Bottom />
    </div>
  );
};

export { RedeSocial };
