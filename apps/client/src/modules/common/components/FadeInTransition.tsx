import { Box, BoxProps } from "@mantine/core";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export function FadeInTransition({
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <Box {...props}>{children}</Box>
    </motion.div>
  );
}
