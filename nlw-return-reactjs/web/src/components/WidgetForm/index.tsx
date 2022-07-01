import { CloseButton } from "../CloseButton";

import bugImage from "../../assets/bug.svg"
import ideaImage from "../../assets/idea.svg"
import thoughtImage from "../../assets/thought.svg"
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

export const feedbackTypes = {
    BUG:{
        title: "Problema",
        image: {
            source: bugImage,
            alt: "Image de um inseto"
        },
    },
    IDEA:{
        title: "Ideia",
        image: {
            source: ideaImage,
            alt: "Image de uma lâmpada"
        },
    },
    OTHER:{
        title: "Outro",
        image: {
            source: thoughtImage,
            alt: "Image de um balão de pensamento"
        },
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    function handlerRestartFeedback(){
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
            ): (
                <FeedbackContentStep
                 feedbackType={feedbackType}
                 onFeedbackRestartRequested={handlerRestartFeedback}/>
            )}

            <footer className="text-sx text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}