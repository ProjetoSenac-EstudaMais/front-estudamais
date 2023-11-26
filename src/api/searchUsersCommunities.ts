import axios from 'axios';

const searchUsersCommunities = async (query: string) => {
  try {
    const response = await axios.get(`/api/search/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default searchUsersCommunities;
