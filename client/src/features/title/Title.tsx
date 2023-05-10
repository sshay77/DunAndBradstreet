import { useEffect, useState } from "react";

interface TitleProps {
    highlight: string;
    text: string;
    setCount: (count: number) => void;
}

const Title = ({ highlight, text, setCount }: TitleProps) => {
    const [highlightedText, setHighlightedText] = useState<string | JSX.Element[]>();

    useEffect(() => {
        setHighlightedText(getHighlightedText(text, highlight, setCount));
    }, [text, highlight]);

    return <p>{highlightedText}</p>;
};

function getHighlightedText(text: string, highlight: string, setCount: (count: number) => void) {
    if (!highlight) {
        setCount(0);
        return text;
    }
    
    // Split text on higlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    const isPartSimilarToHighlight = (part: string) => part.toLowerCase() === highlight.toLowerCase();

    setCount(
        parts.filter((part) => isPartSimilarToHighlight(part))
            .length
    );

    return parts.map((part, index) => (
        <span key={index}>
            {
                isPartSimilarToHighlight(part) ? <mark>{part}</mark> : part
            }
        </span>
    ));
}

export default Title;