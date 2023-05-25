import React from 'react';
import './style';
import { Modal } from '@ispeco/iptl-components-react';
import OmsSyntaxHighlight from '../../components/highlight';


interface SymbolModalProps {
    modalRef: React.MutableRefObject<any>;
    type: string;
    title: string;
    id: string;
}

const SymbolModal = (props: SymbolModalProps) => {
    const { modalRef, type, title, id } = props;
    // eslint-disable-next-line import/no-dynamic-require
    const symbolInfo = require(`../../../libs/resources/symbols/${type}-${id}/${type}-${id}.json`);
    const symbol = JSON.stringify(symbolInfo);

    return (
        <Modal ref={modalRef} header={`${title}`} hideFooter className='symbol-icon-modal'>
            <div className='symbol-thumbnail-content'>
                <div className='symbol-thumbnail'>
                    <img src={`../../../libs/resources/symbols/${type}-${id}/${type}-${id}.png`} />
                </div>
            </div>
            <div className='symbol-block-content'>
                <div className='symbol-info-content'>
                    <div className='symbol-title'>
                        {`Name: ${title}`}
                    </div>
                    <div className='symbol-id'>
                        {`ID: ${type}-${id}`}
                    </div>
                </div>
                <OmsSyntaxHighlight textContent={symbol} language={'json'} showLineNumbers={false} lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }} wrapLines />
            </div>
        </Modal>
    )
}

export default SymbolModal;