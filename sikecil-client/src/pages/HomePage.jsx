import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleOnClick = (id) => {
    navigate(`/bid/${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await API.get("/");
        setData(data.data);
        // console.log(data.data, 1212121);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching</p>;
  }

  return (
    <div className="flex items-center justify-center pt-5">
      {data.map((item) => (
        <div key={item.id} className="card w-96 bg-base-100 shadow-xl mx-4">
          <figure className="px-10 pt-10">
            <img src={item.img_url} alt={item.item} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.item}</h2>
            <p>{item.description}</p>
            <p>Amount: {item.amount}</p>
            <div className="card-actions">
              <button
                onClick={() => handleOnClick(item.id)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
