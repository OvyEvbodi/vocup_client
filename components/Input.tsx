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
    className?: string;
}

const Input: NextPage<InputProps> = ({ onChange, onLoad, name, type, placeholder, id, required, autocomplete, value , className} ) => (
    <input
        onChange={ onChange }
        onLoad={ onLoad }
        name={ name }
        type={ type }
        placeholder={ placeholder }
        id={ id }
        className={ className }
        required={ required }
        autoComplete={ autocomplete }
        value={ value }
    />
);

export default Input