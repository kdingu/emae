import React from 'react';

const HeadingText = ({text = 'Lorem ipsum dolor'}) => {
    return (
        <div className={`font-black leading-tight text-7xl text-white`}>
            {text}
        </div>
    );
};

export default HeadingText;
