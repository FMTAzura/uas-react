import { Button, Label, TextInput } from 'flowbite-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LoginComponent() {
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

  const loginAction = async (e: any) => {
    e.preventDefault();
    var data = new FormData();
    data.append('email', email);
    data.append('password', password);
    try {
      await axios.post('https://alwaysme.vercel.app/users/login', data);
      alert("Login Berhasil");
      localStorage.setItem('auth', 'true');
      navigate('/user');
    } catch (error) {
      alert("Login Gagal");
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={loginAction}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Alamat Email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          name="email"
          placeholder="nama@email.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Kata Sandi" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Login</Button>
      <NavLink to="/SignUp">Register</NavLink>
    </form>
  );
}

export default LoginComponent;
