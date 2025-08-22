interface inputBoxProps {
    label: string,
    placeholder: string,
    value?: React.InputHTMLAttributes<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    type?:React.InputHTMLAttributes<HTMLInputElement>,
    ref?: React.Ref<HTMLInputElement>
}

export const InputBox = ({label, placeholder, value, onChange,onKeyDown, type, ref}: inputBoxProps) =>{
        return <div className="w-full">
            <div className="text-[white]/90 mt-4">
                {label}
            </div>
            <input className="text-neutral-600 focus:bg-neutral-900 w-[400px] rounded-md mt-3 px-3 py-2 focus:outline-none border-[1px] border-neutral-800 focus:border-[1px] focus:border-neutral-300" placeholder={placeholder} />
        </div>
}


InputBox.displayName = "InputBox";