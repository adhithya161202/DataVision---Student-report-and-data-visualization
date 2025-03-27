import axios from 'axios';

const API_URL = 'http://localhost:8080/api/placements/all';

const PlacementService = {
  getAllPlacements: () => axios.get(API_URL),
  getPlacementsByYear: (year) => axios.get(`${API_URL}/year/${year}`),
};

export default PlacementService;
