import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendAppointmentEmail = async ({
  patientEmail,
  patientName,
  doctorName,
  date,
  time,
  status,
}) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: patientEmail,
        patient_name: patientName,
        doctor_name: doctorName,
        appointment_date: date,
        appointment_time: time,
        appointment_status: status,
      },
      PUBLIC_KEY
    );

    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};
