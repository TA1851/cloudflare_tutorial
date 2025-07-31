import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
export interface Todo {
  id: string
  title: string
  completed: boolean
  status: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  isDeleted?: boolean
}

export interface CreateTodoInput {
  title: string
}

export interface UpdateTodoInput {
  id: string
  title?: string
  completed?: boolean
}

// API functions
const API_BASE_URL = 'http://localhost:8787' // Adjust this to your API URL

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`)
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  const result = await response.json()
  return result.data || result
}

const fetchDeletedTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos/deleted`)
  if (!response.ok) {
    throw new Error('Failed to fetch deleted todos')
  }
  const result = await response.json()
  return result.data || result
}

const createTodo = async (todo: CreateTodoInput): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  return response.json()
}

const updateTodo = async ({ id, ...updates }: UpdateTodoInput): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    throw new Error('Failed to update todo')
  }
  return response.json()
}

const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}

const restoreTodo = async (id: string): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/restore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to restore todo')
  }
  const result = await response.json()
  return result.data || result
}

// Custom hooks
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}

export const useDeletedTodos = () => {
  return useQuery({
    queryKey: ['deletedTodos'],
    queryFn: fetchDeletedTodos,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after creating a new one
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after updating
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after deleting
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['deletedTodos'] })
    },
  })
}

export const useRestoreTodo = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: restoreTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after restoring
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['deletedTodos'] })
    },
  })
} 