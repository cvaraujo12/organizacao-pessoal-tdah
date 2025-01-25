import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Task, TaskInput, TaskUpdate } from '@/types/Task';
import { useAuth } from '@/hooks/useAuth';
import { cacheConfigs } from '@/config/cache';
import { retryOperation } from '@/utils/retry';
import { offlineQueue } from '@/utils/offlineQueue';
import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { useAppState } from '@/hooks/useAppState';
import { useLoading } from '@/hooks/useLoading';

interface CacheItem<T> {
  data: T[];
  timestamp: number;
}

interface SyncOptions<T> {
  cacheTime?: number;
  sortBy?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

const cache: Record<string, CacheItem<any>> = {};

const executeWithRetry = async <T>(operation: () => Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>>) => {
  return retryOperation(operation);
};

export function useOptimizedSync<T extends Task>(
  table: string,
  options = { enableCache: true }
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useAppState();
  const { setLoading } = useLoading();
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;

    const cacheKey = `${table}_${user.id}`;
    const cacheConfig = cacheConfigs[table];

    if (options.enableCache && cache[cacheKey]) {
      const { data: cachedData, timestamp } = cache[cacheKey];
      const age = Date.now() - timestamp;

      if (age < (cacheConfig?.duration || 5000)) {
        setData(cachedData);
        return;
      }
    }

    setIsLoading(true);
    setLoading(true);

    try {
      const result = await executeWithRetry<T[]>(() => 
        supabase
          .from(table)
          .select('*')
          .eq('user_id', user.id)
          .then()
      );

      if (result.error) throw result.error;

      setData(result.data || []);

      if (options.enableCache) {
        cache[cacheKey] = {
          data: result.data,
          timestamp: Date.now(),
        };
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const addItem = async (item: Partial<T>) => {
    if (!user) return null;

    setLoading(true);
    try {
      const result = await executeWithRetry<T>(() =>
        supabase
          .from(table)
          .insert([{ ...item, user_id: user.id }])
          .select()
          .single()
          .then()
      );

      if (result.error) throw result.error;

      setData(prev => [...prev, result.data]);
      return result.data;
    } catch (err) {
      console.error('Error adding item:', err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: number, updates: Partial<T>) => {
    if (!user) return false;

    setLoading(true);
    try {
      const result = await executeWithRetry<T>(() =>
        supabase
          .from(table)
          .update(updates)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single()
          .then()
      );

      if (result.error) throw result.error;

      setData(prev => prev.map(item => item.id === id ? { ...item, ...result.data } : item));
      return true;
    } catch (err) {
      console.error('Error updating item:', err);
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (!user) return false;

    setLoading(true);
    try {
      const result = await executeWithRetry<T>(() =>
        supabase
          .from(table)
          .delete()
          .eq('id', id)
          .eq('user_id', user.id)
          .then()
      );

      if (result.error) throw result.error;

      setData(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting item:', err);
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return {
    data,
    error,
    isLoading,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  };
} 