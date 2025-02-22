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
                <Input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-1"
                />
                <Button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add
                </Button>
            </div>
            <div className="space-y-2">
                {tasks.map((t, index) => (
                    <Card key={index} className="flex justify-between items-center p-3 border border-gray-300 rounded">
                        <CardContent className="flex items-center gap-2 flex-1">
                            <CheckCircle
                                className={`cursor-pointer ${t.completed ? "text-green-500" : "text-gray-400"}`}
                                onClick={() => toggleComplete(index)}
                            />
                            <span className={`${t.completed ? "line-through text-gray-500" : ""}`}>{t.text}</span>
                        </CardContent>
                        <Button variant="ghost" onClick={() => deleteTask(index)}>
                            <Trash className="text-red-500" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}
