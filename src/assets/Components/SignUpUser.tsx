import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const statusAuth = localStorage.getItem('auth');
    console.log(statusAuth);
    if (statusAuth === 'true') {
      navigate('/user'); // Navigate ke halaman utama setelah login
    }
  }, [navigate]);

  const registerAction = async (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    try {
      await axios.post('https://alwaysme.vercel.app/users/', data);
      alert('Register Berhasil');
      localStorage.setItem('auth', 'true');
      navigate('/login');
    } catch (error) {
      alert('Register Gagal');
    }
  }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={registerAction}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="name"
          required
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
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
}

export default RegisterComponent;
