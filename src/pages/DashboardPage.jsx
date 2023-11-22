import React, { useEffect } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const APIFunc = async () => {
      try {
        dispatch({
          type: "global/setLoading",
          payload: true,
        });
        const { id } = await api.getUserData();
        dispatch({
          type: "global/setLoading",
          payload: false,
        });
        if (id) {
          alert("Fetced User id " + " " + id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    APIFunc();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default DashboardPage;
