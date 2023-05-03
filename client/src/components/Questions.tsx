import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  _id: string;
  categoryName: string;
  description: string;
  questions: string[];
  createdOn: Date;
  createdBy: string;
  categoryStatus: boolean;
}

const Questions = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  /* const [questions, setQuestions] = useState([]); */

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://exove.vercel.app/api/feedback",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* useEffect(() => {
    axios
      .get("https://exove.onrender.com/api/question")
      .then((data) => {
        console.log(data.data);
        setQuestions(data.data);
      })
      .catch((err) => console.log(err));
  }, []); */

  return (
    <div>
      {categories.map((category) => (
        <h2 key={category._id}>{category.categoryName}</h2>
      ))}
    </div>
  );
};

export default Questions;
