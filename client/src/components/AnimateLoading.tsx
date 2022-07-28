import { Skeleton, Stack } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"

export const AnimateLoading = ({
  isLoaded,
  children,
  SkeletonComponent,
}: any) => {
  return (
    <>
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.5, duration: 0.25 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {SkeletonComponent ? (
              <SkeletonComponent />
            ) : (
              <Stack>
                <Skeleton h="20px" />
                <Skeleton h="20px" />
                <Skeleton h="20px" />
                <Skeleton h="20px" />
              </Stack>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
