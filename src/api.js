import axios from "axios";

export const fetchCharactersByName = async (name) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  try {
    const response = await axios.get(`${apiUrl}?name=${name}`);
    return response.data.results;
  } catch (error) {
    throw new Error("There was an error fetching the characters.");
  }
};
