import { SubmitHandler, useForm } from "react-hook-form";
import "./edit-user.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


interface InputField {
  label: string;
  inputType: string;
  inputPlaceholder: string;
  name: keyof FormData;
  validation: Record<string, unknown>;
}

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

const inputs: InputField[] = [
  {
    label: "First Name",
    inputType: "text",
    inputPlaceholder: "Enter your first name",
    name: "firstName",
    validation: { required: "first Name is Required" },
  },
  {
    label: "last Name",
    inputType: "text",
    inputPlaceholder: "Enter your last name",
    name: "lastName",
    validation: { required: "Last Name is Required" },
  },
  {
    label: "Email",
    inputType: "email",
    inputPlaceholder: "Enter your Email",
    name: "email",
    validation: {
      required: "Email is Required",
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "invalid email",
      },
    },
  },
  {
    label: "Age",
    inputType: "text",
    inputPlaceholder: "Enter your Age: Must be [15 - 90]",
    name: "age",
    validation: {
      required: "Age is Required",
      min: {
        value: 15,
        message: "Age Must be Older than 15",
      },
      max: {
        value: 90,
        message: "Age Must be Younger than 90",
      },
    },
  },
  {
    label: "Phone Number",
    inputType: "text",
    inputPlaceholder: "Enter your Phone (Ex. +12 1234-123-1234)",
    name: "phone",
    validation: {
      required: "Phone Number is required",
      pattern: {
        value: /^(\+\d{1,2}\s)?\(?\d{3,4}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        message: "Invalid phone Number",
      },
    },
  },
  {
    label: "Birth Date",
    inputType: "text",
    inputPlaceholder: "Enter your Birth Date (Ex. 1111-01-01)",
    name: "birthDate",
    validation: {
      required: "Birth Date is required",
      pattern: {
        value:
          /[1-9][0-9][0-9]{2}-([0]?[1-9]|[1][0-2])-([1-2][0-9]|[0]?[1-9]|[3][0-1])/,
        message: "Invalid date",
      },
    },
  },
];

function EditUser() {

    // fetch user from users list for updating
  const navigate = useNavigate();
  const location = useLocation();
  const { user }: { user?: User } = location.state || {};

  // declare useForm hook for Form Validation
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user !== undefined) {
      const updateUser = () => {
        try {
          setValue("firstName", user.firstName);
          setValue("lastName", user.lastName);
          setValue("email", user.email);
          setValue("age", user.age);
          setValue("phone", user.phone);
          setValue("birthDate", user.birthDate);
        } catch (error) {
          console.error(error);
          toast.error("Failed to load user details");
        }
      };
      updateUser();
    } else {
      reset();
    }
  }, [setValue, reset, user]);

  const onSubmit: SubmitHandler<FormData> = async (data: object) => {
    try {
      if (user !== undefined) {
        // Update user
        await axios.put(`https://dummyjson.com/users/${user.id}`, data);
        toast.success("User Updated Successfully");
      } else {
        // Add new user
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User Added successfully");
      }
      navigate("/dashboard/users-list");
    } catch (error) {
      /* if any error occured catch it and display error msg to user */
      console.log(error);
      toast.error("Sorry, Something wrong. Please try again.");
    }
  };

  return (
    <div className="add-user bg-body-tertiary">
      <div className="users-head d-flex justify-content-start mx-4">
        <h3 className="users-title my-3">{user ? "Update User" : "Add New User"}</h3>
      </div>
      <hr className="mx-4 mt-0" />
      <div className="container d-flex justify-content-center align-items-center my-5">
        <form
          className="shadow text-center py-5 rounded"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {inputs.map((input, i) => (
              <div className="col-md-6 text-start mb-4" key={i}>
                <label className="d-block text-black-50  mb-1 fw-semibold" htmlFor={input.name}>
                  {input.label}
                </label>
                <input
                id={input.name}
                  className="py-2 px-2 rounded border w-100"
                  type={input.inputType}
                  placeholder={input.inputPlaceholder}
                  style={{ outline: "none" }}
                  {...register(input.name, input.validation)}
                />
                {errors[input.name] && (
                  <div className="text-danger small">
                    {errors[input.name]?.message as string}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="border-0 rounded py-2 text-white my-1">
          {user ? "Save Changes" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
