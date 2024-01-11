import { useState, useEffect } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const statusEdit = localStorage.getItem('edit');
    console.log(statusEdit);
    if (statusEdit === 'true') {
      const userId = localStorage.getItem('userId');
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
    }
  }, []); // Menghapus [navigate] karena tidak diperlukan

  const editAction = async (e: any) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      await axios.put(`https://alwaysme.vercel.app/users/${userId}`, {
        name,
        email,
        password, // Tetap menyertakan password walaupun biasanya tidak ditampilkan
      });
      navigate('/users');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={editAction}>
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
