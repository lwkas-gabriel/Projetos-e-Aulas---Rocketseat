import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, type BoxProps } from "@ignite-ui/react";

export default {
  title: "Surfaces/Box",
  component: Box,
  args: {   
    children: (
        <>
            <span>Testando o elemento box</span>
        </>
    )
   }
} as Meta<BoxProps>;

export const Primary: StoryObj<BoxProps> = {}