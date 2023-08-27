"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { db } from "@/firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { IUser } from "@/interfaces/user";
import { Form } from "@/components/Form";
import { UserList } from "@/components/UserList";

export default function Home() {

  const [users, setUsers] = useState<IUser[] | null>(null);
  const [editUser, setEditUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList: any = [];
      querySnapshot.forEach((doc) => {
        userList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userList);
    }
    getUsers();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between relative">
      <div className="container mx-auto flex flex-col justify-center items-center min-h-screen px-4">
        <div className="flex justify-center items-center gap-2 my-10 w-full">
          <h1 className="text-4xl text-zinc-100">CRUD with <span className="font-bold">Firebase</span></h1>
          <Image width={40} height={40} src="/firebase_28dp.png" alt="logo" className="w-10 h-10 object-contain" />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 w-full">
          <Form users={users!} setUsers={setUsers} editUser={editUser!} setEditUser={setEditUser} />
          <UserList users={users!} setUsers={setUsers} setEditUser={setEditUser} />
        </div>
      </div>
    </main>
  )
}
