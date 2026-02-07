import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  character_attribute: string;
  character_class: string;
  cover: string;
  crop: string;
  half: string;
  portrait: string;
}

const Guides = () => {
  const { id } = useParams();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/characters", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const flatCharacters = res.data.data.map((item: any) => ({
          id: Number(item.id),
          ...item.attributes,
        }));
        (setCharacters(flatCharacters),
          console.log("Characters fetches", flatCharacters));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <p>{character.name}</p>
          <p>{character.character_attribute}</p>
          <p>{character.character_class}</p>
          <img
            className="ImageWrapped"
            src={character.cover}
            alt={`${character.cover} cover`}
            style={{
              width: "300px",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <img
            className="ImageWrapped"
            src={character.portrait}
            alt={`${character.portrait} portrait`}
            style={{
              width: "150px",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Guides;
