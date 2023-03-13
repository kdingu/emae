import React from 'react';
import HeadingText from "../heading-text";
import Headline from '../headline';
import ServicesGrid from "./services-grid";

const Services = () => {
    return (
        <div>
            {/* <HeadingText text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} /> */}
            <Headline headline='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' description='' button={false} />
            <div className="mt-10"></div>
            <ServicesGrid />
        </div>
    );
};

export default Services;
