import { Dispatch, SetStateAction } from "react";

import { db } from "@/firebase/firebaseConfig";
import { IUser } from "@/interfaces/user";
import { doc, deleteDoc, runTransaction } from "firebase/firestore";

interface Props {
  user: IUser;
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[] | null>>
  setEditUser: Dispatch<SetStateAction<IUser | null>>
}

export const User = ({ user, users, setUsers, setEditUser }: Props) => {

  const { id, name, email, role } = user;

  const handleDeleteUser = async (id: string) => {

    const message = confirm("¿Seguro que deseas eliminar este usuario?");

    if(!message) return;

    try {
      await deleteDoc(doc(db, "users", id));
      const updateUsers = users.filter(user => user.id !== id);
      setUsers(updateUsers);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = async (id: string) => {

    setEditUser(user);

    // const sfDocRef = doc(db, "users", id);

    // console.log(sfDocRef)

    // try {
    //   await runTransaction(db, async (transaction) => {
    //     const sfDoc = await transaction.get(sfDocRef);
    //     if (!sfDoc.exists()) {
    //       throw "Document does not exist!";
    //     }
    
    //     const updateName = sfDoc.data().name = "test";
    //     const updateEmail = sfDoc.data().name = "test";
    //     transaction.update(sfDocRef, { name: updateName, email: updateEmail });
    //   });
    //   console.log("Transaction successfully committed!");
    // } catch (e) {
    //   console.log("Transaction failed: ", e);
    // }

  }

  return (
    <div className='divide-y divide-zinc-800/50 w-full p-4 border border-zinc-800 rounded-md bg-zinc-900/50 hover:bg-zinc-900 select-none'>
      <div className="flex gap-2 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <p className="text-zinc-400 font-semibold min-w-max">Name: <span className="font-normal">{ name }</span></p>
      </div>
      <div className="flex gap-2 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        <p className="text-zinc-400 font-semibold min-w-max">Email: <span className="font-normal">{ email }</span></p>
      </div>
      <div className="flex gap-2 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
        </svg>
        <p className="text-zinc-400 font-semibold min-w-max">Role: <span className="font-normal">{ role }</span></p>
      </div>
      <div className="flex gap-4 py-3 justify-end">
        <div
          className="w-10 h-10 border border-zinc-600 flex justify-center items-center rounded-full hover:bg-amber-500/25 hover:border-amber-600/25 hover:cursor-pointer"
          onClick={() => handleChange(id!)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>
        <div
          className="w-10 h-10 border border-zinc-600 flex justify-center items-center rounded-full hover:bg-red-500/25 hover:border-red-600/25 hover:cursor-pointer"
          onClick={() => handleDeleteUser(id!)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
  )
}
