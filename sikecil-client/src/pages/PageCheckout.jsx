import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../configs/config";

const API = axios.create({
  baseURL: BASE_URL,
});

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await API.get(`/bid/${id}`);

        // console.log(response.data);
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

  const handleAddToPayment = async () => {
    try {
      const ipayMu = await API.get(`/checkout/${id}`);

      // console.log(ipayMu, 40);
      const { paymentUrl } = ipayMu.data;
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
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src={data.Img}
                            alt={data.Item}
                          />
                          <span className="font-semibold">{data.Item}</span>
                        </div>
                      </td>
                      <td className="py-4">Rp {data.Price}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-center w-8">1</span>
                        </div>
                      </td>
                      <td className="py-4">Rp {data.Price}</td>
                    </tr>
                    {/* <!-- More product rows --> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rp {data.Price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>Rp 0</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Rp 0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">Rp {data.Price}</span>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleAddToPayment}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
