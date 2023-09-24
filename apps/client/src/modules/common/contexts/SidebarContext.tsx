import { PropsWithChildren, createContext, useContext, useState } from "react";

const SidebarContext = createContext<
  | {
      collapsed: boolean;
      toggleCollapse: () => void;
    }
  | undefined
>(undefined);

export function SidebarProvider({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
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
