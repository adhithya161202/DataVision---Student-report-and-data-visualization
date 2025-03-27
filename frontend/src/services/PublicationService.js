import axios from 'axios';

const API_URL = 'http://localhost:8080/api/publications';

const PublicationService = {
  getAllPublications: () => axios.get(API_URL),
  getFilteredPublications: (year, department) =>
    axios.get(`${API_URL}?year=${year}&department=${department}`),
};

export default PublicationService;
