import { NextPage } from "next";
import { ChangeEventHandler } from "react";

// input interfaces
export interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    id: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onLoad?: any;
    required?: boolean;
    autocomplete?: 'on' | 'off';
    value?: string;
}

const Input: NextPage<InputProps> = ({ onChange, onLoad, name, type, placeholder, id, required, autocomplete, value } ) => (
    <input
        onChange={ onChange }
        onLoad={ onLoad }
        name={ name }
        type={ type }
        placeholder={ placeholder }
        id={ id }
        className='py-2 px-4 outline-none text-sm text-bg-dark_bg rounded-md'
        required={ required }
        autoComplete={ autocomplete }
        value={ value }
    />
);

export default Input