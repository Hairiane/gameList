import axios from 'axios';

// https://api.rawg.io/docs

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: process.env.APIKEY_RAWG,
  },
});

