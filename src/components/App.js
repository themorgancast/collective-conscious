import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import axios from 'axios';
import ReposList from './repos-list';
import RepoCommits from './repo-commits';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { org: '', repos: [], showRepos: false };
  }

  render() {
    return(
      <div>
        <h1>Collective Conscious</h1>
        <h3>Who&rsquo;s got issues? We got issues!</h3>
        <form>
          <label>
            Organization
            <input type="text" name="org"
              value={this.state.org}
              onChange={event => this.setState({ org: event.target.value })}
            />
          </label>
          <input type="submit" value="Submit" onClick={event => this.handleSubmit(event) } />
        </form>
        { (this.state.showRepos == true) ? <ReposList org={this.state.org} repos={this.state.repos} /> : null }
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getOrgRepos();
  }

  getOrgRepos() {
    return axios.get(`https://api.github.com/orgs/${this.state.org}/repos`)
      .then(response => this.setState({ repos: response.data, showRepos: true }))
      .catch(error => this.setState({ repos: [], showRepos: false }));
  }

};


export default App;
