import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ColorHarmony as ColorHarmonyType, getColorInfo } from '@/lib/colorUtils';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorHarmonyProps {
  colors: string[];
  type: ColorHarmonyType;
  className?: string;
}

export function ColorHarmony({ colors, type, className }: ColorHarmonyProps) {
  const { toast } = useToast();

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
        <h3 className="text-lg font-semibold capitalize mb-4">{type}</h3>
        <div className="grid grid-cols-1 gap-2">
          {colors.map((color, index) => {
            const info = getColorInfo(color);
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-16 relative group"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    >
                      <span
                        className={cn(
                          'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity',
                          info.isLight ? 'text-black' : 'text-white'
                        )}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {color}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p>RGB: {info.rgb}</p>
                      <p>HSL: {info.hsl}</p>
                      <p>Name: {info.name}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </Card>
  );
}