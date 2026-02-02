import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, onDelete }) => {
  return (
    <div>
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} doctor={doc} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default DoctorList;
