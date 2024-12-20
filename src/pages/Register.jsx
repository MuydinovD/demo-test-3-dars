import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { Link, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  return { displayName, email, password };
};

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
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

    const { name, email, password, rePassword } = formData;

    if (!name.trim()) {
      toast.warn("Please fill all fields!");
      return;
    }
    if (!email.trim()) {
      toast.warn("Please enter your Email!");
      return;
    }
    if (!password.trim()) {
      toast.warn("Please enter your Password!");
      return;
    }
    if (password.length < 6) {
      toast.warn("Please enter more than 6 words");
    }

    if (password !== rePassword) {
      toast.warn("The password and the re-entered password are not the same!");
      return;
    }
    console.log("Information sent:", formData);
  };

  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);

  return (
    <div className="h-screen grid place-items-center w-full">
      <form onSubmit={handleSubmit} className="max-w-96 mx-auto w-full">
        <h1 className="text-4xl mb-5 text-center font-bold">Register</h1>

        <FormInput
          type="text"
          placeholder="Enter your name"
          label="Display Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <FormInput
          type="password"
          placeholder="Re-enter your password"
          label="Re-enter Password"
          name="rePassword"
          value={formData.rePassword}
          onChange={handleChange}
        />

        <div className="my-5">
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>

        <div className="text-center">
          <p>
            If you have an account,{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
