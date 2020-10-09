import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
    value: string
    language?: string
}

const CodeBlock: React.FC<Props> = props => {
    const { language, value } = props;
    return (
        <SyntaxHighlighter
            language={language}
            style={atomDark}
        >
            {value}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;