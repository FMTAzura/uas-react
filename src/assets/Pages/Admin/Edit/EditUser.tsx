import { useState, useEffect } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate,useParams,NavLink } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const storedAuth: string | null = localStorage.getItem('auth');
    const statusAuth: boolean | false = (storedAuth !== null) && (storedAuth === 'true');
    if (statusAuth)
    {
      axios
        .get(`https://alwaysme.vercel.app/users/${userId}`)
        .then((response) => {
          setName(response.data.name);
          setEmail(response.data.email);
          // Password tidak perlu di-set di sini karena biasanya tidak boleh diambil dan ditampilkan
        })
        .catch((error) => {
          console.log(error);
        });
    }else {
      localStorage.removeItem('auth');
      navigate('/login');
    }
  }, [navigate,userId]); // Menghapus [navigate] karena tidak diperlukan

  const editAction = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    try {
      await axios.put(`https://alwaysme.vercel.app/users/${userId}`,formData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      navigate('/user');
    } catch (error) {
      alert('Gagal memperbaharui data users!')
      console.log(error);
    }
  }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={editAction}>
      <NavLink to={'/user'} className={'bg-slate-400 py-2 px-4 block w-fit rounded-md text-white font-semibold'}>Kembali</NavLink>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="name"
          value={name} // Menambahkan prop 'value' untuk menampilkan nilai yang sedang di-edit
          required
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@email.com"
          value={email} // Menambahkan prop 'value' untuk menampilkan nilai yang sedang di-edit
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          value={password} // Menambahkan prop 'value' untuk menampilkan nilai yang sedang di-edit
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default EditUser;
