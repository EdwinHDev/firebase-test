"use client";

import { useState, ChangeEvent, FormEvent } from "react";

import { ISubmitState } from "@/interfaces/submitState";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

const INITAL_VALUE: LoginData = {
  email: "",
  password: ""
}

const INITIAL_SUBMIT: ISubmitState = {
  state: "",
  message: ""
}

export const SigninForm = () => {

  const [formData, setFormDate] = useState<LoginData>(INITAL_VALUE);
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
    const { email, password } = formData;
    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrfx_4GtNtwV7USk-YSZwbhyuQ-Fr7Gig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': "AIzaSyBrfx_4GtNtwV7USk-YSZwbhyuQ-Fr7Gig",
        },
        body: `{"email":"${email}","password":"${password}","returnSecureToken":true}`,
      })
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className='md:max-w-md w-full h-max p-10 border border-zinc-800 rounded-lg'
    >
      <h2 className="mb-6 text-xl text-zinc-200 font-semibold">Sign In</h2>
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
          className='read-only:bg-gray-100 w-full px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-lg placeholder:text-zinc-600 text-zinc-500 outline outline-transparent focus-visible:outline-zinc-500'
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
          className="w-full px-4 py-2 border border-zinc-800 bg-zinc-900 rounded-lg placeholder:text-zinc-600 text-zinc-500 outline outline-transparent focus-visible:outline-zinc-500"
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
              Sign in
            </button>
          )
        }

      </div>
    </form>
  )
}
