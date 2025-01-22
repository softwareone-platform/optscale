import { addons } from "@storybook/addons";
import { create } from "@storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Hystax OptScale",
    brandUrl: "https://optscale.hystax.com/",
    barSelectedColor: "#184286"
  })
});
