import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, id, error, helperText, className = "", ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-xl text-sm text-white
          bg-white/5 border transition-all duration-200
          placeholder:text-white/25 outline-none
          focus:bg-white/8 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20
          ${error ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-white/40">{helperText}</p>}
    </div>
  );
});

export default Input;
