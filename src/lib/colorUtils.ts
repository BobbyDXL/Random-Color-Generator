import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import mixPlugin from 'colord/plugins/mix';
import namesPlugin from 'colord/plugins/names';

extend([a11yPlugin, mixPlugin, namesPlugin]);

export type ColorHarmony = 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary';

export function generateHarmony(baseColor: string, type: ColorHarmony): string[] {
  const color = colord(baseColor);
  
  switch (type) {
    case 'analogous':
      return [
        color.rotate(-30).toHex(),
        baseColor,
        color.rotate(30).toHex(),
      ];
    case 'complementary':
      return [
        baseColor,
        color.rotate(180).toHex(),
      ];
    case 'triadic':
      return [
        baseColor,
        color.rotate(120).toHex(),
        color.rotate(240).toHex(),
      ];
    case 'tetradic':
      return [
        baseColor,
        color.rotate(90).toHex(),
        color.rotate(180).toHex(),
        color.rotate(270).toHex(),
      ];
    case 'split-complementary':
      return [
        baseColor,
        color.rotate(150).toHex(),
        color.rotate(210).toHex(),
      ];
    default:
      return [baseColor];
  }
}

export function getContrastRatio(color1: string, color2: string): number {
  return colord(color1).contrast(color2);
}

export function getColorInfo(color: string) {
  const c = colord(color);
  return {
    hex: c.toHex(),
    rgb: c.toRgbString(),
    hsl: c.toHslString(),
    name: c.toName({ closest: true }),
    isLight: c.isLight(),
    contrast: {
      white: c.contrast('#ffffff'),
      black: c.contrast('#000000'),
    },
  };
}

export function generateShades(color: string, steps: number = 9): string[] {
  const base = colord(color);
  const shades: string[] = [];
  
  for (let i = 0; i <= steps; i++) {
    const mix = i / steps;
    shades.push(
      i === steps / 2
        ? base.toHex()
        : i < steps / 2
        ? base.mix('#000000', mix * 2).toHex()
        : base.mix('#ffffff', (i - steps / 2) / (steps / 2)).toHex()
    );
  }
  
  return shades;
}