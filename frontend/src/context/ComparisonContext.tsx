import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { School } from '../types/school';
import { getSchoolsByIds, convertToSimpleSchool } from '../services/schoolsApi';

interface ComparisonContextType {
  selectedSchools: School[];
  addSchool: (schoolId: string) => boolean;
  removeSchool: (schoolId: string) => void;
  clearComparison: () => void;
  isSchoolSelected: (schoolId: string) => boolean;
  count: number;
  maxCount: number;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [selectedSchoolIds, setSelectedSchoolIds] = useState<string[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxCount = 4;

  // Initialize from URL params on mount
  useEffect(() => {
    const schoolsParam = searchParams.get('schools');
    if (schoolsParam) {
      const ids = schoolsParam.split(',').filter(Boolean).slice(0, maxCount);
      setSelectedSchoolIds(ids);
    }
  }, []);

  // Update URL when selection changes
  useEffect(() => {
    if (selectedSchoolIds.length > 0) {
      setSearchParams({ schools: selectedSchoolIds.join(',') }, { replace: true });
    } else {
      // Remove schools param if no schools selected
      const params = new URLSearchParams(searchParams);
      params.delete('schools');
      setSearchParams(params, { replace: true });
    }
  }, [selectedSchoolIds]);

  // Fetch schools when IDs change
  useEffect(() => {
    if (selectedSchoolIds.length > 0) {
      getSchoolsByIds(selectedSchoolIds)
        .then(detailedSchools => {
          const simpleSchools = detailedSchools.map(convertToSimpleSchool);
          setSelectedSchools(simpleSchools);
        })
        .catch(error => {
          console.error('Error fetching comparison schools:', error);
          setSelectedSchools([]);
        });
    } else {
      setSelectedSchools([]);
    }
  }, [selectedSchoolIds]);

  const addSchool = useCallback((schoolId: string): boolean => {
    if (selectedSchoolIds.length >= maxCount) {
      return false;
    }
    if (selectedSchoolIds.includes(schoolId)) {
      return false;
    }
    setSelectedSchoolIds(prev => [...prev, schoolId]);
    return true;
  }, [selectedSchoolIds, maxCount]);

  const removeSchool = useCallback((schoolId: string): void => {
    setSelectedSchoolIds(prev => prev.filter(id => id !== schoolId));
  }, []);

  const clearComparison = useCallback((): void => {
    setSelectedSchoolIds([]);
  }, []);

  const isSchoolSelected = useCallback((schoolId: string): boolean => {
    return selectedSchoolIds.includes(schoolId);
  }, [selectedSchoolIds]);

  const value: ComparisonContextType = {
    selectedSchools,
    addSchool,
    removeSchool,
    clearComparison,
    isSchoolSelected,
    count: selectedSchoolIds.length,
    maxCount
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};
