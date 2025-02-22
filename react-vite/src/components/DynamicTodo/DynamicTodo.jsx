import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, CheckCircle } from "lucide-react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask("");
        }
    };

    const toggleComplete = (index) => {
        setTasks(
            tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">To-Do List</h2>
            <div className="flex gap-2 mb-4">
            </div>
        </div>
    )
}
