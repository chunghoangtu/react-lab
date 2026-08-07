import type { Meta, StoryObj } from "@storybook/tanstack-react";

import { fn } from "storybook/test";
import "../../../i18n";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/Composite/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    label: "Button",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
