import * as React from "react";
import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./approuter"; // make sure filename case matches
import { IKeywordSearchProps } from "./IKeywordSearchProps"; // fixed extra slash

const Home: React.FC<IKeywordSearchProps> = (props) => {
  return (
    <Router>
      <AppRouter context={props.context} description={""} isDarkTheme={false} environmentMessage={""} hasTeamsContext={false} userDisplayName={""} />
    </Router>
  );
};

export default Home;
