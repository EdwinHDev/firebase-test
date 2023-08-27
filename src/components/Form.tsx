"use client";

import { useState, ChangeEvent, FormEvent, SetStateAction, Dispatch } from "react";

import { db } from "@/firebase/firebaseConfig";

import { addDoc, collection } from "firebase/firestore";
import { IUser } from "@/interfaces/user";
import { ISubmitState } from "@/interfaces/submitState";
import { Message } from "./Message";

interface Props {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[] | null>>;
}

const INITAL_VALUE: IUser = {
  name: "",
  email: "",
  password: ""
}

const INITIAL_SUBMIT: ISubmitState = {
  state: "",
  message: ""
}

export const Form = ({ users, setUsers }: Props) => {

  const [formData, setFormDate] = useState<IUser>(INITAL_VALUE);
  const [submitState, setSubmitState] = useState<ISubmitState>(INITIAL_SUBMIT);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDate({
      ...formData!,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // validations
    const { name, email, password } = formData;

    if ([name, email, password].includes("")) {
      setLoading(false);
      setSubmitState({
        state: "error",
        message: "Todos los campos son obligatorios"
      });

      setTimeout(() => {
        setSubmitState(INITIAL_SUBMIT);
      }, 3000);

      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
      role: "client"
    }

    try {
      await addDoc(collection(db, "users"), newUser);

      setUsers([...users, { name: newUser.name, email: newUser.email, role: newUser.role }]);

      setLoading(false);
      setFormDate(INITAL_VALUE);

      setSubmitState({
        state: "sucess",
        message: `El usuario ${name} se creo`
      });

      setTimeout(() => {
        setSubmitState(INITIAL_SUBMIT);
      }, 3000);
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='md:max-w-md w-full h-max p-10 border border-zinc-800 rounded-lg'
    >
      <h2 className="mb-6 text-xl text-zinc-200 font-semibold">Registro de usuarios</h2>
      {
        submitState.state !== "" && (
          <div className="w-full mb-4">
            <Message type={submitState.state}>{submitState.message}</Message>
          </div>
        )
      }
      <div className="w-full mb-4">
        <label
          htmlFor="name"
          className="block text-zinc-400 mb-2"
        >Full name</label>
        <input
          id='name'
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder='Edwin José Hernández Lugo'
          className='w-full px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-lg placeholder:text-zinc-600 text-zinc-500 outline outline-transparent focus-visible:outline-zinc-500'
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="email"
          className="block text-zinc-400 mb-2"
        >Email</label>
        <input
          id='email'
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder='email@email.com'
          className='w-full px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-lg placeholder:text-zinc-600 text-zinc-500 outline outline-transparent focus-visible:outline-zinc-500'
        />
      </div>
      <div className="w-full mb-6">
        <label
          htmlFor="password"
          className="block text-zinc-400 mb-2"
        >Password</label>
        <input
          id='password'
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder='password'
          className='w-full px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-lg placeholder:text-zinc-600 text-zinc-500 outline outline-transparent focus-visible:outline-zinc-500'
        />
      </div>
      <div className="w-full flex justify-end">
        {
          loading ? (
            <div
              className="w-full flex justify-center px-6 py-4 bg-zinc-500 rounded-lg text-zinc-800 uppercase text-sm font-semibold transition-all cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-400 rounded-lg text-zinc-800 uppercase text-sm font-semibold transition-all"
            >
              Register user
            </button>
          )
        }

      </div>
    </form>
  )
}