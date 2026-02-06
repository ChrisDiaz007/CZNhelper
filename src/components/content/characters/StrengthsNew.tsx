import { useState } from "react";
import api from "../../../auth/axios";
import { useParams } from "react-router-dom";

const StrengthsNew = () => {
  const { id } = useParams();
  const [strength, setStrength] = useState({
    content: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStrength((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post(`http://localhost:3000/api/v1/characters/${id}/strengths`, {
        strength,
      })
      .then((response) => {
        console.log("Form Submitted Successfully", response);
        alert("Success");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error submitting form", error);
        alert("Empty Content");
      });
  };

  return (
    <section className="StrengthsNew">
      <p>New Strength</p>
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
            Create New Strength
          </button>
        </span>
      </form>
    </section>
  );
};

export default StrengthsNew;
