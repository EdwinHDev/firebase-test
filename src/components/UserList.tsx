
import { IUser } from "@/interfaces/user";
import { User } from "./User";

interface Props {
  users: IUser[];
}

export const UserList = ({ users }: Props) => {

  return (
    <div className='flex flex-col gap-2 md:max-w-xl w-full p-4 border border-zinc-800 rounded-lg'>
      {
        users ? (
          users.length > 0 ? (
            users.map((user: any, index) => (
              <User
                key={index}
                name={user.name}
                email={user.email}
                role={user.role}
              />
            ))
          ) : (
            <p className="text-zinc-400">No hay usuarios registrados</p>
          )
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        )

      }
    </div>
  )
}

// Crear colección y un usuario.

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     name: "Edwin José Hernández Lugo",
//     email: "edwinhernandez.br@gmail.com",
//     password: "123456789",
//     role: "client"
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// Agregando nuevo usuario.

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     name: "Diego Gamboa",
//     email: "diegogamboa.br@gmail.com",
//     password: "123456789",
//     role: "client"
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }