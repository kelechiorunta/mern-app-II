import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [formdata, setFormData] = useState({name: "", password: ""})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formdata, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault(true)
    try{
      const response = await(axios.post('http://localhost:8000/client', formdata))
      console.log(response.data)
      setFormData({name: '', password: ''})
    }
    catch(err){
      console.error(err)
    }
    finally{
      
    }
  }

  return (
    <div className="App">
      <form className='labeltext border border-2-black p-8 mx-auto my-20 w-100'>
        <div className='flex gap-10 items-end px-4'>
          <label className='inline-block w-12 text-left font-bold' htmlFor='name'>Name:</label>
          <input className='border border-black' type='text' name='name' value={formdata.name} onChange={handleChange}/>
        </div>
        <div className='flex gap-10 items-end px-4'>
          <label className='inline-block w-12 text-left font-bold' htmlFor='password'>Password:</label>
          <input className='border border-black' type='password' name='password' value={formdata.password} onChange={handleChange}/>
        </div>
        <div className='flex gap-10 items-end px-4'>
          <button className='rounded bg-slate-700 text-white my-2 p-1.5 font-bold'type='submit' onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
