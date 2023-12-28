import React from "react"

interface Props {
    flag: boolean;
    component : (...args: any) => React.JSX.Element;
    placeholder : (...args: any) => React.JSX.Element;
}

export function toggleComponent({flag, component, placeholder}: Props) {

    if(flag)
    {
        return component;
    }

    return placeholder;
}
