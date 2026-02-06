import { useParams } from "react-router-dom";
import api from "../../../auth/axios";
import { useState } from "react";

const OverviewNew = () => {
  const { id } = useParams();
  const [overview, setOverview] = useState({
    content: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOverview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post(`/characters/${id}/overviews`, {
        overview,
      })
      .then((response) => {
        console.log("Form Submitted Successfully", response);
        alert("Overview Added");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Failed submitting form", error);
        alert("Failed adding Overview");
      });
  };

  return (
    <section className="OverviewsNew">
      <p>New Overview</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        content :{" "}
        <input
          type="text"
          onChange={handleInput}
          name="content"
          className="border rounded-md p-2"
        />
        <span className="flex justify-center pt-5">
          <button type="submit" className="bg-purple-300 p-3 rounded-md">
            Create New Overview
          </button>
        </span>
      </form>
    </section>
  );
};

export default OverviewNew;
