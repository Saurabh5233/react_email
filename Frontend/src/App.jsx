import { useState } from 'react'


function App() {
  const [form, setForm] = useState({name : "", email : "" , message : ""});
  const [status, setStatus] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value});

  const  handleSubmit= async (e)=>{
    e.preventDefault();
    setStatus('Sending....');
    try{
      const res = await fetch(`${API}/send-email`,{
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setStatus(data.message);
      setForm({name : "", email : "" , message : ""});
    }catch (err){
      setStatus("Failed to send....")
    }

  };
  return (
    <>
     <div className="h-screen flex items-center bg-gradient-to-br from-[#194055] to-[#38abea] justify-center ">
      <form 
        onSubmit={handleSubmit}
        className=" p-6 rounded-2xl bg-gradient-to-br from-[#4d7bc0] via-[#1d4178] to-[#041b4a] shadow-md w-96 space-y-4">
          <h2 className="text-2xl font-bold text-center underline">Send an Email</h2>
          <input 
           className="border-2 p-2 w-full rounded bg-white"
           name='name'
           placeholder='Your Name'
           value={form.name}
           onChange={handleChange}
          />
          <input 
           className="border-2 p-2 w-full rounded bg-white"
           name='email'
           placeholder='Recipient Email'
           value={form.email}
           onChange={handleChange}
          />
          <textarea 
            className='border-2 p-2 w-full rounded bg-white'
            name="message" placeholder='Message' 
            rows='4'
            value={form.message}
            onChange={handleChange}
            />
            <button className="bg-black text-white w-50  py-2 rounded hover:bg-gray-700">Submit</button>
            <p className="text-center text-gray-600">{status}</p>
        </form>
     </div>
    </>
  )
}

export default App
