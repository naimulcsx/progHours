import { PropsWithChildren, createContext, useContext } from "react";

import { useLocalStorage } from "@mantine/hooks";

const SidebarContext = createContext<
  | {
      collapsed: boolean;
      toggleCollapse: () => void;
    }
  | undefined
>(undefined);

export function SidebarProvider({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useLocalStorage({
    key: "ph__sidebar-collapsed",
    defaultValue: false,
    getInitialValueInEffect: false
  });

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed: !!collapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebar() must be used inside a SidebarProvider Context"
    );
  }
  return context;
}
