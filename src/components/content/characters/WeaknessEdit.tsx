import { useParams } from "react-router-dom";
import api from "../../../auth/axios";
import { useEffect, useState } from "react";

interface CharacterType {
  id?: number;
  content?: string;
}

const WeaknessEdit = () => {
  const { id } = useParams();
  const [weaknesses, setWeakness] = useState<CharacterType[]>([]);

  useEffect(() => {
    api
      .get(`/characters/${id}/weaknesses`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const flatWeaknesses = res.data.data.map((item: any) => ({
          id: Number(item.id),
          content: item.attributes.content,
        }));
        setWeakness(flatWeaknesses);
      })
      .catch((error) => console.error("Error Fetch", error));
  }, [id]);
  console.log(weaknesses);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    weaknessIndex: number,
  ) => {
    const { name, value } = event.target;

    setWeakness((previousWeaknesses) =>
      previousWeaknesses.map((weakness, currentIndex) =>
        currentIndex === weaknessIndex
          ? { ...weakness, [name]: value }
          : weakness,
      ),
    );
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await Promise.all(
        weaknesses.map((weakness) =>
          api.patch(`/characters/${id}/weaknesses/${weakness.id}`, {
            weakness,
          }),
        ),
      );
      alert("Saved successfully!");
    } catch (error) {
      console.error("Error updating weaknesses", error);
    }
  };

  const handleDelete = async (weaknessId: number) => {
    try {
      await api.delete(`/characters/${id}/weaknesses/${weaknessId}`);
      setWeakness((prevWeaknesses) =>
        prevWeaknesses.filter((weakness) => weakness.id !== weaknessId),
      );
      alert("Content deleted!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting.", error);
      alert("Failed to delete.");
    }
  };

  return (
    // prettier-ignore
    <section className="TablesEdit">
      <p>Weaknesses</p>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-md p-12">
        <div>
          {weaknesses.map((weakness, index) => (
            <div key={weakness.id} className="flex gap-5">
              <div>
                <input type="text" name="content" value={weakness.content} onChange={(event) => handleInput(event, index)} className="border rounded-md w-100 p-2" />
              </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this content?")) {
                      handleDelete(weakness.id);
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

export default WeaknessEdit;
