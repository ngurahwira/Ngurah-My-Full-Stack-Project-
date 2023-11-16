import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

const PageDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [newPrice, setNewPrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await API.get(`/bid/${id}`);
        console.log(response.data);
        setData(response.data);
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
      const updatedData = { Price: newPrice };
      const ipayMu = await API.put(`/bid/${id}`, updatedData);

      const { paymentUrl } = ipayMu.data;
      // console.log("test", paymentUrl);
      window.open(paymentUrl, "_blank");
      navigate("/");
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching</p>;
  }

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="card lg:card-side bg-white shadow-xl p-6 lg:p-8 transform hover:scale-105 transition-transform">
          <figure>
            <img
              src={data.Img}
              alt={data.Item}
              className="object-cover w-full h-64 lg:h-auto rounded-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl lg:text-3xl font-bold mb-2 text-gray-800">
              {data.Item}
            </h2>
            <p className="text-gray-600 mb-4">{data.Description}</p>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <p className="text-lg text-gray-800">IDR {data.Price}</p>
              </div>
              <div>
                <h5 className="text-gray-700">
                  Days Left: {data.Daysleft} Days
                </h5>
              </div>
            </div>
            <div className="card-actions flex items-center">
              <input
                type="text"
                placeholder="New Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="border border-gray-300 px-3 py-2 mr-2"
              />
              <button
                className="btn btn-primary px-6 py-2"
                onClick={handleAddToCart}
              >
                Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDetail;
