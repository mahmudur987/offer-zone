import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'next-i18next';

export interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  children: React.ReactNode;
}
const classes = {
  root: 'py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px  lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-brand-dark focus:ring-0 disabled:bg-gray-200 disabled:cursor-not-allowed text-brand-dark border-border-two focus:border-2 focus:outline-none focus:border-brand h-11 md:h-12',
};
const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    {
      className = 'block',
      name,
      error,
      labelClassName,
      inputClassName,
      label,
      children,
      ...rest
    },
    ref,
  ) => {
    const rootClassName = cn(classes.root, inputClassName);
    const { t } = useTranslation();
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={`block font-normal text-sm leading-none mb-3 cursor-pointer ${
              labelClassName || 'text-brand-dark text-opacity-70'
            }`}
          >
            {t(label)}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          className={rootClassName}
          autoComplete='off'
          spellCheck='false'
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        >
          {children}
        </select>
        {error && (
          <p className='my-2 text-13px text-brand-danger text-opacity-70'>
            {t(error)}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
