import { Card } from '@/components/ui/card';
import { generateShades, getColorInfo } from '@/lib/colorUtils';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ColorShadesProps {
  baseColor: string;
  className?: string;
}

export function ColorShades({ baseColor, className }: ColorShadesProps) {
  const { toast } = useToast();
  const shades = generateShades(baseColor);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: 'Color copied!',
      description: `${color} has been copied to your clipboard.`,
    });
  };

  return (
    <Card className={className}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Shades</h3>
        <div className="grid grid-cols-1 gap-2">
          {shades.map((color, index) => {
            const info = getColorInfo(color);
            return (
              <button
                key={index}
                className="w-full h-12 rounded-md relative group transition-all hover:scale-[1.02]"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              >
                <span
                  className={cn(
                    'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm',
                    info.isLight ? 'text-black' : 'text-white'
                  )}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {color}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}