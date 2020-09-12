import React from 'react';
import Projects from './components/Projects/Projects';
import AboutMe from './components/AboutMe/AboutMe';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

interface Props {

}

export const App: React.FC<Props> = () => {
  return (
    <Layout>
      <Switch >
        <Route path="/" exact>
          <Redirect to="/projects" />
        </Route>
        <Route path="/projects" component={Projects} />
        <Route path="/about-me" exact component={AboutMe} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}


export default withRouter(App);
