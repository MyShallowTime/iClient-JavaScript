import { Button } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';

const BackToTop = () => {
    const handleScroll = () => {
        
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    return (
        <Button className='back-to-top' onClick={handleScroll}>回到顶部</Button>
    )

}

export default BackToTop;
