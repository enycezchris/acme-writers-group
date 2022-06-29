import React, { Component } from "react";
import axios from "axios";
import { createRandomStory } from "../seed-data";
import deleteStory from "./DeleteStory";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      stories: [],
      favorites: [],
    };
    this.createStory = this.createStory.bind(this);
    this.deleteAStory = this.deleteAStory.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
  }
  async componentDidMount() {
    let response = await axios.get(`/api/users/${this.props.userId}`);
    // console.log("thisProps", this.props);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });
  }
  async createStory() {
    const story = await createRandomStory();
    // console.log("story", story);
    const stories = [...this.state.stories, story];
    // console.log("stories", stories);
    this.setState({ stories });
  }

  async deleteAStory(story) {
    await deleteStory(story);
    const stories = this.state.stories.filter(
      (_story) => _story.id !== story.id
    );
    // console.log("deleteStory", story);
    this.setState({ stories });
  }

  async addToFavorite(story) {
    console.log(`Favorited Story: ${story}`);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
    }
  }
  render() {
    const { user, stories, favorites } = this.state;
    const { createStory, deleteAStory, addToFavorite } = this;
    console.log(stories);
    return (
      <div>
        Details for {user.name} <br />
        Stories ({stories.length}) <br />
        <button onClick={createStory}>Create a Story </button>
        <p>{user.bio}</p>
        <ul>
          {stories.map((story) => {
            return (
              <li key={story.id}>
                {story.title}
                <p>{story.body}</p>
                <button onClick={() => deleteAStory(story)}>
                  Delete Story
                </button>
                <button onClick={addToFavorite}> Favorite </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default User;
