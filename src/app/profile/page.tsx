"use client"
import axios from "axios";
import React, {useState} from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successfully")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
      router.push("/login")
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/dashboard')
    console.log(res.data); 
    setData(res.data.data._id)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 >Profile</h1>
      <hr />
      <p className='text-4xl'>Profile Page</p>
      <h2 className="p-1 rounded bg-red-500">{data === 'nothing' ? "Nothing" : <Link href={'/profile/${data}'}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 mt-4 rounded'>
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className='bg-green-800 hover:bg-green-400 text-white font-bold py-4 px-6 mt-4 rounded'>
        Get User Details
      </button>
    </div>
  )
}

export default Profile