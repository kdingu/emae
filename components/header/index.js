import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

const Header = ({fixed = false}) => {
    const [opacity, setOpacity] = useState(1);

    const handleScroll = () => {
        const scroll = window.scrollY
        const max = 80

        if ((max - scroll) / max >= 0) {
            setOpacity((max - scroll) / max)
        } else {
            setOpacity((0))
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <nav className={`z-50 bg-black bg-opacity-70 px-6 py-3 flex justify-between items-center ${fixed ? 'fixed w-full' : ''}`}>
            <div className={`flex items-center gap-3`}>
                <Image width={50} height={50} src={`/logo/apieda_logo.svg`} />
                <span style={{ opacity }} className={`transition text-xl font-bold uppercase`}>apieda</span>
            </div>

            <ul className={`flex gap-3`}>
                <li>
                    <Link href={`/contact`}>
                        <Button>Contact Us</Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
