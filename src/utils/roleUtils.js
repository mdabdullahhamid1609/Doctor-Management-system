export const getRedirectPathByRole = (role) => {
  if (!role) return "/login";

  switch (role) {
    case "admin":
      return "/admin";
    case "doctor":
      return "/doctor";
    case "patient":
      return "/patient";
    default:
      return "/login";
  }
};

export const getNavLinksByRole = (role) => {
  switch (role) {
    case "admin":
      return [
        { label: "Dashboard", path: "/admin" },
        { label: "Doctors", path: "/admin" }
      ];

    case "doctor":
      return [
        { label: "Dashboard", path: "/doctor" },
        { label: "Appointments", path: "/doctor/appointments" }
      ];

    case "patient":
      return [
        { label: "Home", path: "/patient" },
        { label: "Book Appointment", path: "/patient/book" }
      ];

    default:
      return [];
  }
};
