// hooks/useProjectListCommand.ts
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { DeleteProjectCommand, FilterProjectCommand, SortProjectCommand, PaginateProjectCommand } from '@/app/command/projectCommand';

const API_BASE_URL = 'http://localhost:3000/projects';

export const useProjectListCommand = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'projectName' | 'projectStart'>('projectName');
  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: projects, error, isLoading, mutate } = useSWR(API_BASE_URL, fetcher);

  // Execute filtering command
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return new FilterProjectCommand(projects, filterText).execute();
  }, [projects, filterText]);

  // Execute sorting command
  const sortedProjects = useMemo(() => {
    return new SortProjectCommand(filteredProjects, sortBy).execute();
  }, [filteredProjects, sortBy]);

  // Execute pagination command
  const paginatedProjects = useMemo(() => {
    return new PaginateProjectCommand(sortedProjects, page, pageSize).execute();
  }, [sortedProjects, page, pageSize]);

  // Execute delete command
  const handleDelete = (id: string) => {
    new DeleteProjectCommand(id, () => mutate()).execute();
  };

  return {
    isLoading,
    error,
    paginatedProjects,
    totalPages: Math.ceil(filteredProjects.length / pageSize),
    page,
    setPage,
    filterText,
    setFilterText,
    sortBy,
    setSortBy,
    handleDelete,
    showCreateProjectDialog,
    setShowCreateProjectDialog,
  };
};
