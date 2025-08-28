import type { InputHTMLAttributes } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputPairProps {
  label: string;
}

export function InputPair({
  label,
  ...rest
}: InputPairProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col items-start space-y-2">
      <Label htmlFor={rest.id} className="flex flex-col items-start">
        {label}
      </Label>
      <Input {...rest} />
    </div>
  );
}
