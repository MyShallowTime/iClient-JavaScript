import React from 'react';
import './style';
import classNames from 'classnames';

interface EditorLayoutProps {
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const EditorLayout = (props: EditorLayoutProps) => {
    const { title, className, children } = props;

    return (
        <div className={classNames(className, 'editor-layout')}>
            <div className='editor-layout-title'>{title}</div>
            <div className='editor-layout-content'>{children}</div>
        </div>
    )
}

export default EditorLayout;
