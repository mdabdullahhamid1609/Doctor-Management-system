const DoctorCard = ({ doctor, onDelete }) => {
  return (
    <div className="w-300px m-3 p-3 flex bg-white justify-evenly border-2 ">
      <label>Name</label>
      <strong className="text-xl">{doctor.name}</strong> <br /> <br />
      <label> category</label>
       – {doctor.specialization}
      <button className=" bg-red-400 text-white text-xl rounded-xl" onClick={() => onDelete(doctor.id)}>Delete</button>
    </div>
  );
};

export default DoctorCard;
