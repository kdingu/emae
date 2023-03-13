import React from 'react';
import Header from "../header";
import Footer from "../footer";

const Layout = ({children}) => {
    return (
        <>
            <Header fixed />
            <div id="Layout" className={`max-w-5xl m-auto px-10 pb-20 pt-32 xl:px-0 lg:pt-40`}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
