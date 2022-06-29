import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Users from "./Users";
import User from "./User";
const { createRandomUser } = require("../seed-data");
import deleteUser from "./DeleteUser";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: "",
    };
    this.createAUser = this.createAUser.bind(this);
    this.deleteAUser = this.deleteAUser.bind(this);
  }
  async componentDidMount() {
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get("/api/users");
      this.setState({ users: response.data });
      window.addEventListener("hashchange", () => {
        const userId = window.location.hash.slice(1);
        this.setState({ userId });
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async createAUser() {
    const user = await createRandomUser();
    // console.log("createUser", user);
    const users = [...this.state.users, user];
    this.setState({ users });
  }

  async deleteAUser(user) {
    await deleteUser(user);
    const users = this.state.users.filter((_user) => _user.id !== user.id);
    // console.log("deleteUser", user);
    this.setState({ users });
  }

  render() {
    const { users, userId } = this.state;
    const { createAUser, deleteAUser } = this;
    return (
      <div>
        <h1>Acme Writers Group ({users.length})</h1>
        <button onClick={createAUser}>Create a User </button>
        <main>
          <Users
            users={users}
            userId={userId}
            createAUser={createAUser}
            deleteAUser={deleteAUser}
          />
          {userId ? <User userId={userId} /> : null}
        </main>
      </div>
    );
  }
}

const root = document.querySelector("#root");
render(<App />, root);
