import { Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Information sent:", formData);
    if (!formData.password.trim()) {
      toast.warn("Please enter the password!");
    }

    if (!formData.email.trim()) {
      toast.warn("Please enter the email!");
    }
  };

  const data = useActionData();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="h-screen grid place-items-center w-full">
      <form onSubmit={handleSubmit} className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Login</h1>

        <FormInput
          type="email"
          placeholder="Enter your email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="my-5">
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </div>

        <div className="text-center">
          <p>
            If you don't have account yet,{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
