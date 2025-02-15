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

    const addFlashcard = () => {
        if (front.trim() && back.trim()) {
            setFlashcards([...flashcards, { front, back }]);
            setFront("");
            setBack("");
        }
    };

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setShowBack(false);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setShowBack(false);
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-4">
            <h1 className="text-2xl font-bold">Flashcard Creator</h1>
            <div className="w-full max-w-md space-y-2">
                <Input placeholder="Front text" value={front} onChange={(e) => setFront(e.target.value)} />
                <Textarea placeholder="Back text" value={back} onChange={(e) => setBack(e.target.value)} />
                <Button onClick={addFlashcard} className="w-full">Add Flashcard</Button>
            </div>
            {flashcards.length > 0 && (
                <div className="flex flex-col items-center w-full max-w-md">
                    <Card className="w-full p-4 text-center cursor-pointer" onClick={() => setShowBack(!showBack)}>
                        <CardContent className="text-lg font-semibold">
                            {showBack ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                        </CardContent>
                    </Card>
                    <div className="flex justify-between w-full mt-2">
                        <Button onClick={prevCard}>Previous</Button>
                        <Button onClick={nextCard}>Next</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
