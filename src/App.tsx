import { useState } from 'react';
import { Copy, RefreshCcw, Palette, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

function generateRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generatePalette(baseColor: string) {
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [
    `rgb(${r}, ${g}, ${b})`,
    `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`,
    `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`,
    `rgb(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)})`,
    `rgb(${Math.min(255, r + 80)}, ${Math.min(255, g + 80)}, ${Math.min(255, b + 80)})`
  ];
}

function App() {
  const [mainColor, setMainColor] = useState(generateRandomColor());
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [brightness, setBrightness] = useState([50]);
  const { toast } = useToast();
  
  const palette = generatePalette(mainColor);

  const handleNewColor = () => {
    setMainColor(generateRandomColor());
  };

  const handleSaveColor = () => {
    setSavedColors(prev => [...prev, mainColor]);
    toast({
      title: "Color saved!",
      description: `${mainColor} has been added to your collection.`
    });
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `${color} has been copied to your clipboard.`
    });
  };

  const adjustBrightness = (color: string, factor: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const adjustedR = Math.min(255, Math.max(0, Math.round(r * (factor / 50))));
    const adjustedG = Math.min(255, Math.max(0, Math.round(g * (factor / 50))));
    const adjustedB = Math.min(255, Math.max(0, Math.round(b * (factor / 50))));

    return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-1 flex items-center justify-center gap-2">
            <Palette className="w-8 h-8" />
            Color Generator
          </h1>
          <h2 className='text-center text-gray-600'>By David Ege-Obetta</h2>
          <p className="text-gray-400">Generate and save beautiful color palettes</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-800/50 backdrop-blur border-gray-700">
            <div className="space-y-6">
              <div 
                className="h-48 rounded-lg transition-all duration-300"
                style={{ backgroundColor: adjustBrightness(mainColor, brightness[0]) }}
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Brightness</span>
                  <span className="text-sm text-gray-400">{brightness}%</span>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleNewColor}
                  variant="secondary"
                  className="w-full"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Generate New
                </Button>
                <Button
                  onClick={handleSaveColor}
                  variant="secondary"
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Color
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800/50 backdrop-blur border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
            <div className="grid gap-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="w-12 h-12 rounded-md"
                    style={{ backgroundColor: color }}
                  />
                  <span className="flex-1 font-mono text-sm">{color}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyColor(color)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {savedColors.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Saved Colors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {savedColors.map((color, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative aspect-square rounded-lg cursor-pointer transition-all duration-300 hover:scale-105",
                    "hover:shadow-xl hover:shadow-black/20"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => handleCopyColor(color)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                    <Copy className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;