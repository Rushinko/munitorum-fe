import React from 'react'

type TextInputProps = {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  type?: string
  id?: string
  name?: string
  disabled?: boolean
  required?: boolean
  label?: string
  icon?: React.ReactNode
  labelClassName?: string
}

export default function TextInput({
  placeholder,
  value,
  onChange,
  className = "",
  labelClassName = "",
  type,
  id,
  name,
  disabled = false,
  required = false,
  label,
  icon = null,
}: TextInputProps): JSX.Element {
  return (
    <div>
      {
        label &&
        <label htmlFor={id} className={` ${labelClassName} text-sm font-medium text-text-secondary dark:text-text-secondary-dark block mb-2`}>
          {label}
        </label>
      }
      <div className="relative">
        {
          icon
        }
        <input
          type={type || "text"}
          id={id}
          className={` ${className} bg-background dark:bg-background-dark border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark text-sm rounded-lg focus:border-text-secondary dark:focus:focus:border-text-secondary-dark block w-full pl-10 p-2.5 transition duration-300`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  )
}
