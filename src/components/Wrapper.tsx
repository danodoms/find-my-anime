import { Children } from "react";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-wrap p-4 gap-4">{children}</div>;
}

export default Wrapper;
