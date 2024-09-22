import Sidebar from "./Components/Sidebar";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Graph from "./Components/Graph";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 md:fixed md:h-full">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-20 p-4 max-sm:ml-14 -z-10 ">
        <Graph />
      </div>
    </div>
  );
};

export default AdminDashboard;
