import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AppProviders } from "./app/AppProviders.jsx";
import ErrorBoundary from "./app/ErrorBoundary.jsx";
import "./styles/global.css";

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;


//App.jsx
// └── BrowserRouter
//       └── AppRouter
//             ├── /login → LoginPage
//             ├── /unauthorized → Unauthorized
//             ├── /admin/* → AdminRoutes
//             │       └── ProtectedRoute(role="admin") → AdminLayout → <Outlet /> → AdminPage
//             ├── /doctor/* → DoctorRoutes
//             │       └── ProtectedRoute(role="doctor") → DoctorLayout → <Outlet /> → DoctorPage
//             └── /patient/* → PatientRoutes
//                     └── ProtectedRoute(role="patient") → PatientLayout → <Outlet /> → PatientPage


// main.jsx
//    │
//    ▼
// App.jsx
//    │
//    ▼
// <AppProviders>   <-- provides Contexts (Auth, Doctor, Appointment)
//    │
//    ▼
// <AppRouter />    <-- handles all routing




// AppProviders.jsx
//    ├─ AuthContext  (user login state, role)
//    ├─ DoctorContext  (doctor list, CRUD)
//    └─ AppointmentContext (appointments, slots)


// AppRouter.jsx
//    ├─ /login          → LoginPage (AuthLayout)
//    ├─ /admin/*        → AdminRoutes → AdminLayout
//    ├─ /doctor/*       → DoctorRoutes → DoctorLayout
//    ├─ /patient/*      → PatientRoutes → PatientLayout
//    └─ *               → NotFound


// AdminLayout.jsx
//    ├─ Navbar
//    ├─ Sidebar (admin links)
//    └─ <Outlet /> → admin pages like Dashboard, DoctorList, Appointments

// DoctorLayout.jsx
//    ├─ Navbar
//    ├─ Sidebar (doctor links)
//    └─ <Outlet /> → doctor pages like Appointments, SlotPicker

// PatientLayout.jsx
//    ├─ Navbar
//    └─ <Outlet /> → patient pages like BookAppointment, MyAppointments

// AuthLayout.jsx
//    └─ <Outlet /> → login/register pages


// Patient clicks Book Appointment
//    │
//    ▼
// BookAppointment.jsx
//    └─ SlotPicker.jsx (shows available slots using AppointmentContext)
//            │
//            ▼
// appointmentService.js → updates AppointmentContext
//            │
//            ▼
// Toast.jsx → shows success/failure
//            │
//            ▼
// AppointmentsContext updates → Table.jsx reflects new appointments


//
// main.jsx
//    │
//    ▼
// App.jsx
//    │
//    ▼
// <AppProviders> (Auth, Doctor, Appointment)
//    │
//    ▼
// <AppRouter>
//    ├─ /login → LoginPage (AuthLayout)
//    ├─ /admin/* → AdminLayout → AdminPage / DoctorPage / AppointmentsPage
//    ├─ /doctor/* → DoctorLayout → DoctorPage
//    └─ /patient/* → PatientLayout → BookAppointmentPage
//    └─ * → NotFound

// Pages & Layouts use:
//    ├─ Components (Button, Input, Modal, Loader, NavBar)
//    ├─ Tables & Search (Table, TableRow, SearchBar, FilterDropdown)
//    └─ Services (authService, doctorService, appointmentService)
