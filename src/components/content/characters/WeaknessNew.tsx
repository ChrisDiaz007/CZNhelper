import { useParams } from "react-router-dom";
import api from "../../../auth/axios";
import { useState } from "react";

const WeaknessNew = () => {
  const { id } = useParams();
  const [weakness, setWeakness] = useState({
    content: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setWeakness((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post(`/characters/${id}/weaknesses`, {
        weakness,
      });
      alert("Weakness Added");
      window.location.reload();
    } catch (error) {
      console.error("Failed submitting form", error);
      alert("Failed adding Weakness");
    }
  };

  return (
    <section className="WeaknessNew">
      <p>New Weakness</p>
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
            Create New Weakness
          </button>
        </span>
      </form>
    </section>
  );
};

export default WeaknessNew;
