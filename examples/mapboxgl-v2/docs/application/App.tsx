import React from 'react';
import './ComponentsStyle';
import './style';
import Header from '../modules/header';
import SymbolContainer from '../modules/container';
import BackToTop from '../components/back-to-top';

const App = () => {
    return (
        <div className='pre-symbol-content'>
            <Header />
            <SymbolContainer />
            <BackToTop />
        </div>
    )
}

export default App;
