import { Flex, Text, Title, useMantineTheme } from "@mantine/core";
import React, { useState, useEffect } from "react";

export const Countdown = () => {
  const theme = useMantineTheme();

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const daysUntilFriday = (5 - now.getDay() + 7) % 7; // Calculate days until next Friday
      const nextFriday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilFriday,
        23,
        59,
        0
      );
      const timeUntilFriday = nextFriday.getTime() - now.getTime();

      const days = Math.floor(timeUntilFriday / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeUntilFriday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeUntilFriday % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeUntilFriday % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex align="end" direction="column">
      <Title order={5}>Week Ends in</Title>
      <Text size="xl" style={{ color: theme.colors[theme.primaryColor][1] }}>
        {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
        {countdown.seconds}s
      </Text>
    </Flex>
  );
};
