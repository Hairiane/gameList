/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import apiClient from '../services/api-client.ts';
import { AxiosRequestConfig, CanceledError } from 'axios';
import { GameInfo } from './useGames.ts';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

export const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: unknown[]) => {
  const [data, setData] = useState<T[] | []>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function () {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient.get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then(response => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return function () {
      return controller.abort();
    };
  }, deps ? [...deps] : []);

  return {
    data, error, isLoading,
  };
};

export const useDataInfo = (endpoint: string, requestConfig?: AxiosRequestConfig, deps?: unknown[]) => {
  const [data, setData] = useState<Partial<GameInfo>>({});
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function () {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient.get<GameInfo>(endpoint, { signal: controller.signal, ...requestConfig })
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return function () {
      return controller.abort();
    };
  }, deps ? [...deps] : []);

  return {
    data, error, isLoading,
  };
};
