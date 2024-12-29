import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Loading/Loading";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./home.css";

interface User {
  id: number;
}

interface UserData {
  image: string;
  firstName: string;
  lastName: string;
  address: {
    address: string;
    city: string;
  };
  company: {
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
    };
  };
  role: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  bloodGroup: string;
}
interface TotalUsers {
  users: object[];
  total: number;
  skip: number;
  limit: number;
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<TotalUsers>({
    users: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [userData, setUserData] = useState<UserData>({
    image: "",
    firstName: "",
    lastName: "",
    address: {
      address: "",
      city: "",
    },
    company: {
      name: "",
      title: "",
      address: {
        address: "",
        city: "",
      },
    },
    role: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    bloodGroup: "",
  });
  const { user } = useContext(AuthContext) as unknown as { user: User };

  const data = [
    {
      name: "Jun",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Jul",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Aug",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Sep",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Oct",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Nov",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    if (user.id) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`https://dummyjson.com/users/${user.id}`);
          const data = res?.data;
          setUserData(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("Failed to view user data.");
          setLoading(false);
        } finally {
          setLoading(true);
          const res = await axios.get(`https://dummyjson.com/users`);
          const apiUsersData = res?.data;
          setUsersData(apiUsersData);
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="home px-1">
          <div className="home-head d-flex justify-content-start mx-4">
            <h3 className="home-title my-3">Dashboard</h3>
          </div>
          <hr className="mx-4 my-0" />
          <div className="box overflow-y-scroll">
            <div className="container d-flex my-5 justify-content-center">
              <div className="user-card container flex-grow-1 shadow rounded p-4">
                <div className="user-info-box d-flex">
                  <div className="image">
                    <img src={userData?.image} alt="user photo rounded" />
                  </div>
                  <div className="user-info">
                    <h4 className="mb-1">
                      {userData?.firstName} {userData?.lastName}
                    </h4>
                    <p className="job-title fw-semibold text-warning mb-2">
                      {userData?.company?.title}
                    </p>
                    <div className="role text-black-50 fw-bold">
                      {userData?.role}
                    </div>
                  </div>
                </div>
                <div className="about-user d-flex justify-content-between flex-wrap">
                  <div className="user-company">
                    <h3 className="text-black-50">Work</h3>
                    <h6 className="company-name text-black-50 fw-bold">
                      {userData?.company?.name}
                    </h6>
                    <p className="company-address">
                      {userData?.company?.address?.address},{" "}
                      {userData?.company?.address?.city}
                    </p>
                  </div>

                  <div className="contact">
                    <h3 className="text-black-50">contact info</h3>
                    <div className="contact-box p-0 text-black-50">
                      <div className="contact-item">
                        phone: <span>{userData?.phone}</span>
                      </div>
                      <div className="contact-item">
                        address:
                        <span>
                          {userData?.address?.address},{userData?.address?.city}
                        </span>
                      </div>
                      <div className="contact-item">
                        Email: <span>{userData?.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="gender-info">
                    <h3 className="text-black-50">personal info</h3>
                    <div className="per p-0 text-black-50">
                      <div className="per-item">
                        Birth Date: <span>{userData?.birthDate}</span>
                      </div>
                      <div className="per-item">
                        Gender: <span>{userData?.gender}</span>
                      </div>
                      <div className="per-item">
                        Blood Group: <span>{userData?.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cards d-flex flex-column">
                <div className="card text-center p-3 shadow border-0">
                  <div className="card-title">
                    <h4 className="fs-6 fw-bold text-black-50">
                      Total Customers
                    </h4>
                    <FaUsers className="card-icon text-warning" size={30} />
                  </div>
                  <span className="fs-4 fw-bold text-black-50">
                    {usersData?.total}
                  </span>
                </div>
                <div className="card text-center p-3 shadow border-0">
                  <div className="card-title">
                    <h4 className="fs-6 fw-bold text-black-50">
                      Current Users
                    </h4>
                    <HiUsers className="card-icon text-warning" size={30} />
                  </div>
                  <span className="fs-4 fw-bold text-black-50">
                    {usersData?.users?.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="charts d-flex container my-5">
              <ResponsiveContainer className="shadow py-3 px-2 rounded chart" width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <ResponsiveContainer className="shadow py-3 px-2 rounded chart" width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
