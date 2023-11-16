import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

const PageDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await API.put(`/bid/${id}`);
        console.log(data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
    } catch (error) {}
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching</p>;
  }

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={data.Img}
              alt={data.Item}
              className="object-cover w-full h-64 lg:h-auto"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-2">{data.Item}</h2>
            <p className="text-gray-600 mb-2">{data.Description}</p>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5>Days Left: {data.Daysleft} Days</h5>
              </div>
              <div className="flex first:first-letter:">
                <p className="text-lg">Price: {data.Price}</p>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDetail;
