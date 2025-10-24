"use client";

type Option = {
  label: string;
  value: string;
};

export const SelectMenu = ({
  before,
  options,
  selectedOption,
  onChange,
  disabled,
}: {
  before?: React.ReactNode;
  options: Option[];
  selectedOption: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <label className="text-foreground border border-foreground/10 rounded-full px-2 flex items-center gap-2">
      {before ? (
        <span className="text-foreground/50 font-mono">{before}</span>
      ) : null}
      <select
        onChange={(event) => {
          const newOption = event.target.value;
          onChange(newOption);
        }}
        value={selectedOption}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectMenu;
