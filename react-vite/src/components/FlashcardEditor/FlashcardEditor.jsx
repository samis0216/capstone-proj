import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FlashcardApp() {
    const [flashcards, setFlashcards] = useState([]);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);

    return

}
