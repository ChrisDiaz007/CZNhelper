import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../auth/axios";

interface CharacterType {
  id?: number;
  name: string;
  character_attribute: string;
  character_class: string;
  role: string;
}

const CharacterEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterType>({
    name: "",
    character_attribute: "",
    character_class: "",
    role: "",
  });

  const attributes = ["Passions", "Void", "Instinct", "Order", "Justice"];
  // prettier-ignore
  const classes = [ "Striker", "Vanguard", "Hunter", "Ranger", "Psionic", "Controller"];
  const roles = ["Main DPS", "Sub DPS", "Support", "Tank"];

  // load character
  useEffect(() => {
    api
      .get(`/characters/${id}`, {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        const item = res.data.data;
        setCharacter({ id: item.id, ...item.attributes });
      })
      .catch((error) => {
        console.error("Error Fetch", error);
      });
  }, [id]);
  console.log(character);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(character).forEach(([key, value]) => {
      if (value == null) return;

      // Skip image URL strings
      if (
        ["cover", "crop", "half", "portrait"].includes(key) &&
        typeof value === "string"
      ) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`character[${key}][]`, String(v)));
      } else {
        formData.append(`character[${key}]`, String(value));
      }
    });

    try {
      await api.patch(`/characters/${id}`, formData);
      console.log("Character updated successfully!");
      navigate(`/characters/${id}/edit`);
      window.location.reload();
      const msg = "Character Updated";
      alert(msg);
    } catch (error) {
      console.error("Error Updating Character", error);
    }
  };

  return (
    // prettier-ignore
    <div>
      <p>CharacterEdit</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <p className="font-semibold text-3xl">Update Character</p>
          Name : <input type="text" onChange={handleInput} name="name" value={character.name} className="border rounded-md p-2"/>
          <select
            name="character_attribute"
            value={character.character_attribute}
            onChange={handleSelect}
            className="border rounded-md p-2"
          >
            <option value="">Select a attribute</option>
            {attributes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <select
            name="character_class"
            value={character.character_class}
            onChange={handleSelect}
            className="border rounded-md p-2"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          <select
            name="role"
            value={character.role}
            onChange={handleSelect}
            className="border rounded-md p-2"
          >
            <option value="">Select a role</option>
            {roles.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <span className="flex justify-center">
            <button type="submit" className="bg-green-400 p-2 rounded-md">Save</button>
          </span>
      </form>
    </div>
  );
};

export default CharacterEdit;
