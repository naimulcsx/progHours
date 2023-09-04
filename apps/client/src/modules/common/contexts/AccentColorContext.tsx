import { useLocalStorage } from "@mantine/hooks";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext
} from "react";

export type AccentColor = "blue" | "violet" | "yellow";

const AccentColorContext = createContext<
  | {
      accentColor: AccentColor;
      setAccentColor: Dispatch<SetStateAction<AccentColor>>;
    }
  | undefined
>(undefined);

export function AccentColorProvider({ children }: PropsWithChildren) {
  const [accentColor, setAccentColor] = useLocalStorage<AccentColor>({
    key: "color-accent",
    defaultValue: "blue",
    getInitialValueInEffect: false
  });
  return (
    <AccentColorContext.Provider
      value={{ accentColor: accentColor as AccentColor, setAccentColor }}
    >
      {children}
    </AccentColorContext.Provider>
  );
}

export function useAccentColor() {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error(
      "useAccentColor() must be used inside a ContextAcceptProvider"
    );
  }
  return context;
}
