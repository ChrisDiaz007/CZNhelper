import { useParams } from "react-router-dom";
import api from "../../../auth/axios";
import { useEffect, useState } from "react";

interface CharacterType {
  id?: number;
  content?: string;
}

const StrengthsEdit = () => {
  const { id } = useParams();
  const [strengths, setStrengths] = useState<CharacterType[]>([]);

  useEffect(() => {
    api
      .get(`/characters/${id}/strengths`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const flatStrengths = res.data.data.map((item: any) => ({
          id: Number(item.id),
          content: item.attributes.content,
        }));
        setStrengths(flatStrengths);
      })
      .catch((error) => console.error("Error Fetch", error));
  }, [id]);

  console.log(strengths);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    strengthIndex: number,
  ) => {
    const { name, value } = event.target;

    setStrengths((previousStrengths) =>
      previousStrengths.map((strength, currentIndex) =>
        currentIndex === strengthIndex
          ? { ...strength, [name]: value }
          : strength,
      ),
    );
  };

  const handleSubmit = async () => {
    Promise.all(
      strengths.map((strength) =>
        api.patch(`/characters/${id}/strengths/${strength.id}`, { strength }),
      ),
    )
      .then((response) => console.log("Updated strengths", response))
      .catch((error) => console.error("Error Updating Restaurant", error));
  };

  const handleDelete = async (strengthId: number) => {
    try {
      await api.delete(`/characters/${id}/strengths/${strengthId}`);
      setStrengths((prevStrengths) =>
        prevStrengths.filter((strength) => strength.id !== strengthId),
      );
      alert("Strength deleted!");
    } catch (error) {
      console.error("Error deleting strength", error);
      alert("Failed to delete strength.");
    }
  };

  return (
    // prettier-ignore
    <section className="TablesEdit">
      <p>Strengths</p>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-md p-12">
        <div>
          {strengths.map((strength, index) => (
            <div key={strength.id} className="flex gap-5">
              <div>
                <input type="text" name="content" value={strength.content} onChange={(event) => handleInput(event, index)} className="border rounded-md w-100 p-2" />
              </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this strength?")) {
                      handleDelete(strength.id);
                    }
                  }}
                  className="bg-red-400 p-2 rounded-md hover:bg-red-500"
                >
                  Delete
                </button>
            </div>
            
          ))}
          
        </div>

          <div className="flex justify-center flex-col">
            <button type="submit" className="bg-green-400 p-2 rounded-md hover:cursor-pointer hover:bg-green-500">Save Tables</button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default StrengthsEdit;
