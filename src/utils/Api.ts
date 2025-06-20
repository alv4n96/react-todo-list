import type { Task } from "../types/Task";

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL + '?_limit=10');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch tasks');
        }

        return await response.json();

    } catch (error: any) {
        console.error('Error fetching tasks:', error);
        throw new Error(error.message || 'Failed to fetch tasks');
    }
}

export const addTask = (title: string, duration: number = 2000): Promise<Task> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Date.now(),
                title: title,
                completed: false
            });
        }
        , duration);
    });
}

