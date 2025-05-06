import gentes from '../mock/gentes.ts';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => ({
  data: gentes,
  isLoading: false,
  error: null,
});

export default useGenres;