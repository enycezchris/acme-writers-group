import axios from "axios";

const deleteStory = (story) => {
  return axios.delete(`/api/stories/${story.id}`);
};

export default deleteStory;
