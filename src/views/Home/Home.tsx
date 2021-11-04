import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { api } from "../../services/api";
import "./styles.scss";
import {
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Button } from "components";

interface ICategoriesData {
  id: number;
  name: string;
}

const difficultyArray = ["easy", "medium", "hard"];

const Home = () => {
  const [categories, setCategories] = useState<ICategoriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ICategoriesData>({
    id: -1,
    name: "",
  });
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const handleSetCategory = (value: ICategoriesData) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/api_category.php");

        setCategories(data.trivia_categories);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    getCategories();
  }, []);

  return (
    <div className="home">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="home__welcome">
            <div>
              <h1>Hello, welcome sir!</h1>
              <p>
                In order to start our quizz game, please fill the form below!
              </p>
            </div>
          </div>

          <form>
            <div className="home__form">
              <TextField
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <FormControl sx={{ mb: 2 }}>
                <span>Filter by Category</span>
                <Select
                  displayEmpty
                  value={selectedCategory.name}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select</em>;
                    }

                    return <em>{selected}</em>;
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <div style={{ maxHeight: 300 }}>
                    <MenuItem
                      value="Select"
                      onClick={() =>
                        handleSetCategory({
                          id: -1,
                          name: "",
                        })
                      }
                    >
                      <em>Select</em>
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem
                        key={cat.id}
                        value={cat.name}
                        onClick={() => handleSetCategory(cat)}
                      >
                        {cat.name}
                      </MenuItem>
                    ))}
                  </div>
                </Select>
              </FormControl>

              <FormControl sx={{ mb: 2 }}>
                <span>Filter by Difficulty</span>
                <Select
                  displayEmpty
                  value={difficulty}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Select</em>;
                    }

                    return <em>{selected}</em>;
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Select" onClick={() => setDifficulty(null)}>
                    <em>Select</em>
                  </MenuItem>
                  {difficultyArray.map((difficulty) => (
                    <MenuItem
                      key={difficulty}
                      value={difficulty}
                      onClick={() => setDifficulty(difficulty)}
                    >
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="home__form__btns">
                <Button btnClasses="_dark">Cancel</Button>
                <Button btnClasses="_red" type="submit">
                  Start
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Home;
