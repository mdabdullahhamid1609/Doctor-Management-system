
//
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../store/AuthContext";
import { storageService } from "../services/storageService";
import SearchBar from "../components/search/SearchBar";
import useDebounce from "../hooks/useDebounce";
import { initiatePayment } from "../services/Payments";
import toast from "react-hot-toast";
import { fakePayment } from "../services/fakePayment";
const ITEMS_PER_PAGE = 5;

const PatientPage = () => {
  const { user } = useAuth();

  const [doctorList, setDoctorList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await storageService.getDoctors();
      setDoctorList(data);
    };
    fetchDoctors();
  }, []);

  const debouncedSearch = useDebounce(search, 300);

  const filteredDoctors = useMemo(() => {
    let list = doctorList.filter((doc) =>
      doc.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    list.sort((a, b) => {
      const aVal = a[sortKey]?.toLowerCase() || "";
      const bVal = b[sortKey]?.toLowerCase() || "";
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return list;
  }, [doctorList, debouncedSearch, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredDoctors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDoctors, page]);

const bookAppointment = async (doctor) => {
  if (!date || !time) {
    toast.error("Please select date & time");
    return;
  }

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    toast.error("Cannot book past date");
    return;
  }

  try {
    const allAppointments = await storageService.getAllAppointments();

    const conflict = allAppointments.find(
      (a) =>
        a.doctorId === doctor.id &&
        a.patientId === user.id &&
        a.date === date &&
        a.time === time
    );

    if (conflict) {
      toast.error("Already booked at this time");
      return;
    }

    // 💳 FAKE PAYMENT
    const payment = await fakePayment({
      amount: doctor.fee || 500,
    });

    // ✅ SAVE APPOINTMENT
    await storageService.addAppointment({
      doctorId: doctor.id,
      doctorUserId: doctor.doctorUserId,
      doctorName: doctor.name,
      patientId: user.id,
      patientName: user.name,
      patientEmail: user.email,
      date,
      time,
      status: "pending",
      paymentStatus: "paid",
      paymentId: payment.paymentId,
      amount: payment.amount,
    });

    toast.success("Payment successful 🎉 Appointment booked");

    setDate("");
    setTime("");
  } catch (err) {
    toast.error("Payment failed");
  }
};

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const changePage = (direction) => {
    setPage((prev) => Math.min(Math.max(prev + direction, 1), totalPages));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
        Patient Dashboard
      </h2>

      {/* Search + Sorting */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-3 md:space-y-0">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search doctor by name..."
          className="w-full md:w-1/3"
        />
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
            onClick={() => handleSort("name")}
          >
            Name {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            className="px-3 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            onClick={() => handleSort("specialization")}
          >
            Specialization{" "}
            {sortKey === "specialization" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>

      {/* Date & Time Picker */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 space-y-3 sm:space-y-0">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDoctors.length === 0 && (
          <p className="text-gray-500 col-span-full">No doctors found.</p>
        )}

        {paginatedDoctors.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div>
              <p className="text-xl font-bold text-gray-800">{d.name}</p>
              <p className="text-gray-600 mb-2">{d.specialization}</p>
              {d.email && <p className="text-gray-400 text-sm">{d.email}</p>}
            </div>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={() => bookAppointment(d)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => changePage(-1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => changePage(1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientPage;
