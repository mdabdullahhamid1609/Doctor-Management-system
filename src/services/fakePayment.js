import toast from "react-hot-toast";

export const fakePayment = ({ amount }) => {
  return new Promise((resolve, reject) => {
    toast.loading("Processing payment...");

    setTimeout(() => {
      const success = true; // always success for demo

      toast.dismiss();

      if (success) {
        resolve({
          paymentId: "FAKE_PAY_" + Date.now(),
          amount,
        });
      } else {
        reject("Payment failed");
      }
    }, 2000);
  });
};
