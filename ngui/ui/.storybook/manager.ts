import { create } from "@storybook/theming/create";
import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Hystax OptScale",
    brandUrl: "https://optscale.hystax.com/",
    barSelectedColor: "#184286"
  })
});
