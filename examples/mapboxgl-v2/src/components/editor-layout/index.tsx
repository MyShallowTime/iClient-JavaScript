import React from 'react';
import './style';

interface EditorLayoutProps {
    title?: string;
    children?: React.ReactNode;
}

const EditorLayout = (props: EditorLayoutProps) => {
    const { title, children } = props;

    return (
        <div className='editor-layout'>
            <div className='editor-layout-title'>{title}</div>
            <div className='editor-layout-content'>{children}</div>
        </div>
    )
}

export default EditorLayout;
