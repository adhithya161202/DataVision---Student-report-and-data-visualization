import axios from 'axios';

const API_URL = 'http://localhost:8080/api/memberships'; // Ensure this matches your backend endpoint

const SocietyService = {
  getAllSocieties: () => {
    return axios.get(API_URL);
  },
};

export default SocietyService;
