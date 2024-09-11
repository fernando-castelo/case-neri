"use client"
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { type Task } from "../types/api";

type TaskItemProps = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
        return (
         <div>
            <Card key={task.id} className="border p-4 rounded shadow">
                <CardHeader>
                    <h3 className="text-2xl font-bold text-pink-600">{task.title}</h3>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-orange-600">{task.description ?? 'No description available'}</p>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        onClick={() => onEdit(task)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onDelete(task.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        </div>
            
        );
}