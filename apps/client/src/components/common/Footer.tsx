import { Flex, Text, Anchor, Image } from "@mantine/core";
import { IconHeart, IconPointFilled } from "@tabler/icons-react";

export function Footer() {
  return (
    <Flex
      align="center"
      justify="center"
      sx={{ height: 56, textAlign: "center" }}
    >
      <Text mr="8px">Made with</Text>
      <IconHeart color="red" fill="red" />
      <IconPointFilled size={10} style={{ marginLeft: 8 }} />
      <Anchor
        ml="8px"
        target="_blank"
        href="https://github.com/naimulcsx/proghours"
      >
        <Image src="https://camo.githubusercontent.com/c79f79297c20e6b9b0a7bb4192c4bf0a9c4f415eb2411a082334549d31c77967/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f6e61696d756c6373782f70726f67686f7572733f7374796c653d736f6369616c" />
      </Anchor>
    </Flex>
  );
}
