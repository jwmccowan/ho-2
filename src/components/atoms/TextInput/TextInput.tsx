import { forwardRef, useId } from "react";
import classNames from "classnames";

export interface TextInputProps {
  label: string;
  name: string;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const id = useId();
  const { error, label, ...rest } = props;
  return (
    <div className="flex flex-col">
      <label className="leading-loose" id={id}>
        {label}
      </label>
      <input
        className="border rounded border-gray-300 py-2 px-3"
        type="text"
        aria-labelledby={id}
        aria-invalid={error ? "true" : "false"}
        {...rest}
        ref={ref}
      />
      <p
        role="alert"
        className={classNames(error ? "h-5" : "h-0", "transition-all")}
      >
        {error}
      </p>
    </div>
  );
});
TextInput.displayName = "TextInput";

export default TextInput;
