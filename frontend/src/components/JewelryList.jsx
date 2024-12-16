import React, { useState, useEffect } from "react";
import api from "../api/axios";

const JewelryList = () => {
  const [jewelry, setJewelry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const response = await api.get("/joyas", {
          params: { limits: 10, page: 1, order_by: "stock_ASC" },
        });
        setJewelry(response.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelry();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Jewelry List</h1>
      <ul>
        {jewelry.map((jewel) => (
          <li key={jewel.href}>{jewel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default JewelryList;
