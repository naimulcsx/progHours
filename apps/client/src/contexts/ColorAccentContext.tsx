import { DefaultMantineColor } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext
} from "react";

const ColorAccentContext = createContext<
  | {
      accentColor: DefaultMantineColor;
      setAccentColor: Dispatch<SetStateAction<DefaultMantineColor>>;
    }
  | undefined
>(undefined);

export function ColorAccentProvider({ children }: PropsWithChildren) {
  const [accentColor, setAccentColor] = useLocalStorage<DefaultMantineColor>({
    key: "color-accent",
    defaultValue: "blue",
    getInitialValueInEffect: false
  });
  return (
    <ColorAccentContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </ColorAccentContext.Provider>
  );
}

export function useColorAccent() {
  const context = useContext(ColorAccentContext);
  if (!context) {
    throw new Error(
      "useColorAccent() must be used inside a ContextAcceptProvider"
    );
  }
  return context;
}
