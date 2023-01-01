import store from "@/store";


class NotificationService {

  error(message, submessage = null, dismissAfter = 2000) {
    this.notify(message, submessage, "error", dismissAfter);
  }

  success(message, submessage = null, dismissAfter = 2000) {
    this.notify(message, submessage, "success", dismissAfter);
  }

  notify(message, submessage = null, status = "success", dismissAfter = 2000) {
    store.dispatch(
      "pushNotification",
      {
        "message": message,
        "submessage": submessage,
        "status": status,
        "dismissAfter": dismissAfter,
      },
    );
  }
}

export default NotificationService;