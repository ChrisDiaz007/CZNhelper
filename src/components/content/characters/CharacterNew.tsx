import { useState } from "react";
import api from "../../../auth/axios";

const CharacterNew = () => {
  const [character, setCharacter] = useState({
    name: "",
    character_attribute: "",
    character_class: "",
    role: "",
    rating: "",
    cover: null,
    crop: null,
    half: null,
    portrait: null,
  });

  const attributes = ["Passions", "Void", "Instinct", "Order", "Justice"];
  // prettier-ignore
  const classes = [ "Striker", "Vanguard", "Hunter", "Ranger", "Psionic", "Controller"];
  const roles = ["Main DPS", "Sub DPS", "Support", "Tank"];

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      setCharacter((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(character).forEach((key) => {
      const value = character[key as keyof typeof character];
      if (value !== null) {
        formData.append(`character[${key}]`, value);
      }
    });

    api
      .post("/characters", formData)
      .then((response) => console.log("Form Submitted Successfully", response))
      .catch((error) => console.log("Error submitting form", error));
  };

  return (
    //prettier-ignore
    <section className="CharacterNew">
      <form onSubmit={handleSubmit} className="flex flex-col">
        Name : <input type="text" onChange={handleInput} name="name" className="border" />
        Rating : <input type="text" onChange={handleInput} name="rating" className="border" />
        Attribute : <select
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
        Class : <select
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
          Role : <select
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

          Cover Photo : <input
          type="file"
          onChange={handleFileInput}
          name="cover"
          accept="image/*"
          required
          className="border"
          />
          Crop Photo : <input
            type="file"
            onChange={handleFileInput}
            name="crop"
            accept="image/*"
            required
            className="border"
          />
          half Photo : <input
            type="file"
            onChange={handleFileInput}
            name="half"
            accept="image/*"
            required
            className="border"
          />
          Portrait Photo : <input
            type="file"
            onChange={handleFileInput}
            name="portrait"
            accept="image/*"
            required
            className="border"
          />

      
        <button type="submit">Create Character</button>
      </form>
    </section>
  );
};

export default CharacterNew;
