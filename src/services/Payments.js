export const initiatePayment = ({ amount, patientName }) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject("Razorpay not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Doctor App",
      description: "Consultation Fee",
      handler: function (response) {
        resolve(response);
      },
      prefill: {
        name: patientName,
      },
      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};
