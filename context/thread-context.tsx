import * as React from "react";
import { Thread } from "@/types/threads";
import { generateThreads } from "@/utils/generate-dummy-data";

export const ThreadsContext = React.createContext<Thread[]>([]);

// provide state to the children
// it doesn't matter the depth of the children
export const ThreadProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  React.useEffect(() => {
    setThreads(generateThreads());
  }, []);

  // value it needs is an empty array of type thread
  return <ThreadsContext.Provider value={threads}>
    {children}
  </ThreadsContext.Provider>;
};
