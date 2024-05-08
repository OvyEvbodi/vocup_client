import { NextPage } from "next";

// Button props interface

import { MouseEventHandler } from "react";

export interface ButtonProps {
    type?: "reset" | "submit" | "button";
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

// button component 
const Button: NextPage<ButtonProps> = ({ type, text, onClick, disabled }) => {
    return(
    <button onClick={ onClick }
    type={ type }
    disabled={ disabled }
    className='py-1 capitalize px-4 text-sm text-slate-900 rounded border border-slate-900 hover:bg-grey hover:text-light_text transition-all-duration-600'>{ text }</button>
    )
};

export default Button