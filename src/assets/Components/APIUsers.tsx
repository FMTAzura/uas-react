import { useState, useEffect } from "react";
import axios from "axios";

const Api = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://alwaysme.vercel.app/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Api;
