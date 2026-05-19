export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0.05,
) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const motionViewport = { once: true, amount: 0.25 } as const;
