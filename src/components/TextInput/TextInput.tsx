import { forwardRef } from "react";

export interface TextInputProps {
  label: string;
  name: string;
  onBlur: React.ChangeEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col">
      <span className="leading-loose">{label}</span>
      <input
        className="border rounded border-gray-300 py-2 px-3"
        type="text"
        {...rest}
        ref={ref}
      />
    </label>
  );
});
TextInput.displayName = "TextInput";

export default TextInput;
