import { join } from "@std/path";
import { flavorEntries } from "@catppuccin/palette";

const THEMES_DIR = join(import.meta.dirname as string, "themes/");

await Deno.remove(THEMES_DIR, { recursive: true })
  .catch(() => {})
  .finally(() => Deno.mkdir(THEMES_DIR, { recursive: true }));

function rgb(
  color: { r: number; g: number; b: number },
  opacity?: number
): string {
  return `rgb${opacity ? "a" : ""}(${color.r}, ${color.g}, ${color.b}${
    opacity ? ", " + opacity : ""
  })`;
}

function hsl(
  color: { h: number; s: number; l: number },
  opacity?: number
): string {
  return `hsl${opacity ? "a" : ""}(${color.h}, ${color.s}%, ${color.l}%${
    opacity ? ", " + opacity : ""
  })`;
}

for (const [flavor, { colors }] of flavorEntries) {
  const theme = {
    colors: {
      red: colors.red.hex,
      blue: rgb(colors.blue.rgb),
      green: hsl(colors.green.hsl),
      faint_green: rgb(colors.green.rgb, 0.8),
    },
  };

  await Deno.writeTextFile(
    join(THEMES_DIR, `catppuccin-${flavor}.json`),
    JSON.stringify(theme, null, 2)
  );
}
