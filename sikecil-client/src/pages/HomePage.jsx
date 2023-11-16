import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("categori1");

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

  const filteredData = data.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <>
      <div>
        <div className="text-center mb-4 flex items-center justify-center mt-4">
          <CountdownCircleTimer
            isPlaying
            duration={300} // Sesuaikan durasi countdown sesuai kebutuhan (dalam detik)
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          >
            {({ remainingTime }) => (
              <h5 className="text-xl font-bold mb-2">
                Countdown: {remainingTime}s
              </h5>
            )}
          </CountdownCircleTimer>
        </div>
        <div className="flex items-center justify-center">
          {/* Add category selection buttons */}

          {filteredData.map((item) => (
            <div
              key={item.id}
              className="card w-96 bg-base-100 shadow-xl mx-4 hover:scale-105 transition-transform"
            >
              <figure className="px-10 pt-10">
                <img
                  src={item.img_url}
                  alt={item.item}
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.item}</h2>

                <p>IDR {item.amount}</p>
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
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => setSelectedCategory("categori1")}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Category 1
          </button>
          <button
            onClick={() => setSelectedCategory("categori2")}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Category 2
          </button>
          {/* Tambahkan tombol-tombol lain untuk kategori lainnya sesuai kebutuhan */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
