import {MessageContext } from "../../components/Messages";
import { useContext } from "react";

function useNotifier() {
  const notificationContext = useContext(MessageContext);

  const notify = (options) => {
    const timeout = options.status === "error" ? null : options.autohide;
    notificationContext.show(options, timeout);
  };
  return notify;
}
export default useNotifier;
