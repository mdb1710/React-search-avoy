import React from "react";

/**
 * Avoy React Recruiting Quiz
 *
 * Let's build a simple component that allows us to type in a user id to
 * A) view an individual user's information
 *
 * On that screen we should see:
 *
 * 1. Id, last login and their saves/skips
 * 2. Have an option to go back
 *
 *  On the 'home' view we should also be able to see all the users listed in desc
 *  order based on their last login date. onClick we should navigate to the
 *  user detail screen.
 */

const users = [
  { id: 12, last_login: "2017-12-31", saves: [1, 2, 3, 89], skips: [7, 31] },
  { id: 11, last_login: "2019-6-3", saves: [43, 22, 89], skips: [2, 39] },
  { id: 19, last_login: "2019-3-12", saves: [], skips: [7] },
  { id: 20, last_login: "2019-2-27", saves: [22], skips: [9] },
  { id: 24, last_login: "2019-1-31", saves: [2, 43, 22], skips: [1, 89] }
];

class NewUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      neededId: null
    };
  }

  getId = e => {
    let neededId = e.target.dataset.id;

    this.props.onSubmitId(neededId);
  };

  render() {
    const hidden = this.state.hidden;
    const newUsers = users.sort(function(a, b) {
      return new Date(a.last_login) - new Date(b.last_login);
    });
    let userList;

    if (hidden) {
      userList = newUsers.map((user, index) => {
        return (
          <ul key={index}>
            <li key={user.id} onClick={this.getId} data-id={user.id}>
              {user.id}
            </li>
            <button onClick={this.getId}>See Info</button>
          </ul>
        );
      });
    } else {
      userList = newUsers.map((user, index) => {
        return (
          <ul key={index}>
            <li key={index}>
              <p>{user.id}</p>
              <p>{user.last_login}</p>
              <button onClick={this.getId}>See Info</button>
            </li>
          </ul>
        );
      });
    }

    return <div>{userList}</div>;
  }
}

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }

  handleIdSubmit = e => {
    e.preventDefault();

    let newId = this.state.userId;

    this.props.onSubmitId(newId);
  };

  handleIdChange = e => {
    this.setState({
      userId: e.target.value
    });
  };

  render() {
    return (
      <div className="form">
        <h2>Find User Details</h2>
        <form onSubmit={this.handleIdSubmit}>
          <label htmlFor="userId">Id</label>
          <input
            type="text"
            name="userId"
            value={this.state.userId}
            onChange={this.handleIdChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clear: false
    };
  }

  clearResults = e => {
    e.preventDefault();

    this.props.onClear();
  };

  render() {
    const results = this.props.details;
    const saves = this.props.saves;
    const skips = this.props.skips;

    return (
      <div>
        <h2>Search Results Go Here</h2>
        <ul>
          <li>ID: {results.id}</li>
          <li>Last Login: {results.last_login}</li>
          <li>Saves: {saves}</li>
          <li>Skips: {skips}</li>
        </ul>
        <button type="reset" onClick={this.clearResults}>
          Clear
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: users,
      userId: "",
      details: "",
      saves: "",
      skips: ""
    };
  }

  seeUserInfo = id => {
    this.findUserDetails(id);
  };

  resetSearchResults = () => {
    this.setState({
      userId: "",
      details: "",
      saves: "",
      skips: ""
    });
  };

  findUserDetails = id => {
    let findId = parseFloat(id, 10);
    const results = users.filter(u => {
      return u.id === findId;
    });

    let saveSearches = results[0].saves.join(",");
    let skipSearches = results[0].skips.join(",");

    this.setState({
      userId: findId,
      details: results[0],
      saves: saveSearches,
      skips: skipSearches
    });
  };

  render() {
    return (
      <div className="main">
        <div className="users">
          <h2>Users</h2>
          <NewUsers onSubmitId={this.seeUserInfo} />
        </div>
        <UserForm onSubmitId={this.findUserDetails} />
        <SearchResults
          details={this.state.details}
          saves={this.state.saves}
          skips={this.state.skips}
          onClear={this.resetSearchResults}
        />
      </div>
    );
  }
}

export default App;
