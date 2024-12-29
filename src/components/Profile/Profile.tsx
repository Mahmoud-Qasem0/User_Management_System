import { useContext, useEffect, useState } from "react";
import "./profile.css";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
  image: string;
}

interface User {
  id: number;
}

function Profile() {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(AuthContext) as unknown as { user: User };
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    age: 15,
    phone: "",
    birthDate: "",
    image: "",
  });

  const inputs = [
    {
      label: "First Name",
      inputType: "text",
      name: "firstName",
      val: userProfile.firstName,
    },
    {
      label: "Last Name",
      inputType: "text",
      name: "lastName",
      val: userProfile.lastName,
    },
    {
      label: "Email",
      inputType: "email",
      name: "email",
      val: userProfile.email,
    },
    {
      label: "Age",
      inputType: "text",
      name: "age",
      val: userProfile.age,
    },
    {
      label: "Phone Number",
      inputType: "text",
      name: "phoneNumber",
      val: userProfile.phone,
    },
    {
      label: "Birth Date",
      inputType: "text",
      name: "birthDate",
      val: userProfile.birthDate,
    },
  ];

  useEffect(() => {
    if (user.id) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`https://dummyjson.com/users/${user.id}`);
          setUserProfile(res?.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          toast.error("Failed to view user data.");
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
        <div className="profile bg-body-tertiary">
          <div className="users-head d-flex justify-content-start mx-4">
            <h3 className="profile-title my-3">Profile</h3>
          </div>
          <hr className="mx-4 mt-0" />
          <div className="container d-flex justify-content-center align-items-center flex-column my-5">
            <div className="image-box">
              <img src={userProfile?.image} alt="profile pic" />
            </div>
            <form className="shadow text-center pb-5  rounded">
              <div className="row">
                {inputs.map((input, i) => (
                  <div className="col-md-6 text-start mb-4" key={i}>
                    <label
                      className="d-block text-black-50  mb-1 fw-semibold"
                      htmlFor={input.name}>
                      {input.label}
                    </label>
                    <input
                      id={input.name}
                      className="py-2 px-2 rounded border w-100"
                      type={input.inputType}
                      value={input.val}
                      style={{ outline: "none" }}
                      disabled
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
