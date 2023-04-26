import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

type SyntaxHighlighterProps = {
    textContent: string;
    language: string; // 需要语言类型 如css, jsx , javascript 等
    showLineNumbers?: boolean; // 是否展示左侧行数
    lineProps?: any;
    wrapLines?: boolean;
    lineNumberStyle?: any;
}


const OmsSyntaxHighlight = (props: SyntaxHighlighterProps) => {
    const { textContent, language = 'txt', showLineNumbers, lineProps, wrapLines } = props;
    return (
        <SyntaxHighlighter
            showLineNumbers={showLineNumbers}
            style={vs}
            language={language}
            PreTag='div'
            lineProps={lineProps}
            wrapLines={wrapLines}
        >
            {String(textContent).replace(/\n$/, '')}
        </SyntaxHighlighter>
    );
};

export default OmsSyntaxHighlight;