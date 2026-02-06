import { useParams } from "react-router-dom";
import api from "../../../auth/axios";
import { useEffect, useState } from "react";

interface CharacterType {
  id?: number;
  content?: string;
}

const OverviewEdit = () => {
  const { id } = useParams();
  const [overviews, setOverviews] = useState<CharacterType[]>([]);

  useEffect(() => {
    api
      .get(`/characters/${id}/overviews`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const flatOverviews = res.data.data.map((item: any) => ({
          id: Number(item.id),
          content: item.attributes.content,
        }));
        setOverviews(flatOverviews);
      })
      .catch((error) => console.error("Error Fetch", error));
  }, [id]);
  console.log(overviews);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    overviewIndex: number,
  ) => {
    const { name, value } = event.target;

    setOverviews((previousOverviews) =>
      previousOverviews.map((overview, currentIndex) =>
        currentIndex === overviewIndex
          ? { ...overview, [name]: value }
          : overview,
      ),
    );
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await Promise.all(
        overviews.map((overview) =>
          api.patch(`/characters/${id}/overviews/${overview.id}`, { overview }),
        ),
      );
      alert("Saved successfully!");
    } catch (error) {
      console.error("Error updating overviews", error);
    }
  };

  const handleDelete = async (overviewId: number) => {
    try {
      await api.delete(`/characters/${id}/overviews/${overviewId}`);
      setOverviews((prevOverviews) =>
        prevOverviews.filter((overview) => overview.id !== overviewId),
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
      <p>Overview</p>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-md p-12">
        <div>
          {overviews.map((overview, index) => (
            <div key={overview.id} className="flex gap-5">
              <div>
                <input type="text" name="content" value={overview.content} onChange={(event) => handleInput(event, index)} className="border rounded-md w-100 p-2" />
              </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this content?")) {
                      handleDelete(overview.id);
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

export default OverviewEdit;
