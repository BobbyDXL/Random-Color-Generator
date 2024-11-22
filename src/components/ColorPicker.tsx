import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  return (
    <Card className={cn('p-4', className)}>
      <div className="space-y-4">
        <HexColorPicker
          color={color}
          onChange={onChange}
          className="w-full !h-48"
        />
        <div className="space-y-2">
          <Label htmlFor="hex-input">Hex Color</Label>
          <Input
            id="hex-input"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono"
            placeholder="#000000"
          />
        </div>
      </div>
    </Card>
  );
}