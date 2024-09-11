"use client"
import { useState } from "react";
import { api } from "~/trpc/react"; 
import TaskItem from "./task";
import { TaskListProps, type Task } from "../types/api";

export default function TaskList() {
    const { data: tasks, refetch: refetchTasks } = api.task.get.useQuery();
    
    const addTask = api.task.create.useMutation({
        onSuccess: async () => {
            await refetchTasks();
            setTitle("");
            setDescription("");
            setIsCreating(false);
        }
    });
    const updateTask = api.task.update.useMutation({
        onSuccess: async () => {
            await refetchTasks();
            setEditTaskId(null);
            setEditTitle("");
            setEditDescription("");
            setIsEditing(false);
        }
    });
    const deleteTask = api.task.delete.useMutation({
        onSuccess: async () => {
            await refetchTasks();
        }
    });

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string | null>("");

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleAddTask = () => {
        addTask.mutate({
            title,
            description,
        });
    };

    const handleOnClickUpdateTask = (task: Task) => {
        setEditTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setIsEditing(true);
    };

    const handleUpdateTask = () => {
        if (editTaskId !== null) {
            updateTask.mutate({
                id: editTaskId,
                title: editTitle,
                description: String(editDescription),
            });
        }
    };

    const handleDeleteTask = (id: number) => {
        deleteTask.mutate({ id });
    };


    return (
        <div>
            <h1 className="text-4xl font-bold mb-4 text-blue-600">Task Manager</h1>

            <div className="grid grid-cols-1 gap-5 mb-4 m-5}">
                {tasks?.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={handleOnClickUpdateTask}
                    onDelete={handleDeleteTask} 
                 />
                ))}
            </div>

            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsCreating(!isCreating)}
                >
                    {isCreating ? "Cancel" : "Create New Task"}
                </button>
                {isCreating && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600">Create your task</h2>
                        <div>
                            <label className="text-pink-600">
                                Title:
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="text-orange-600">
                                Description:
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </label>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleAddTask}
                                className="bg-green-500 text-white px-4 py-2  mr-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isEditing && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Task</h2>
                    <div>
                        <label className="text-pink-600">
                            Title:
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </label>
                    </div>
                    <div className="mt-2">
                        <label className="text-orange-600">
                            Description:
                            <input
                                type="text"
                                value={String(editDescription)}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </label>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleUpdateTask}
                            className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
