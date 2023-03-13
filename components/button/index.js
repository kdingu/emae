import React, {useMemo} from 'react';

const Button = ({size = 'sm', animated = false, children}) => {
    const sizeClasses = useMemo(() => {
        switch (size) {
            case '4xl':
                return 'px-10 py-5 text-3xl lg:px-14 lg:py-7 lg:text-5xl'
            case '2xl':
                return 'px-12 py-5 text-4xl'
            case 'xl':
                return 'px-8 py-4 text-2xl'
            case 'md':
                return 'px-6 py-3 text-xl'
            case 'sm':
                return 'px-4 py-3 text-sm'
            default:
                return 'px-6 py-3 text-xl'
        }
    }, [size]);

    return (
        <button className={`${sizeClasses} bg-green text-black scale-100 ${animated ? 'transform hover:scale-105 transition' : ''}`.trim()}>{children}</button>
    );
};

export default Button;
