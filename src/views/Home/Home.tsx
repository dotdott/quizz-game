import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { api } from "../../services/api";
import "./styles.scss";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Button } from "components";

import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSetCategory = (value: ICategoriesData) => {
    setSelectedCategory(value);
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .transform((value) => Number(value))
        .min(0, "Please, select how many questions you want in your quizz.")
        .max(10, "The max amount value allowed is 10")
        .required("Please, select how many questions you want in your quizz.")
        .positive("Please enter an positive number")
        .integer(),
    }),
    onSubmit: ({ amount }) => {
      console.log(amount);
    },
  });

  const hasErrors = formik.touched && formik.errors.amount ? true : false;

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

          <form
            onSubmit={(e) => {
              e.preventDefault(), formik.handleSubmit();
            }}
          >
            <div className="home__form">
              <TextField
                label="Amount"
                type="number"
                variant="outlined"
                sx={{ mb: 2 }}
                name="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
                disabled={showConfirmation}
                error={hasErrors}
              />
              {hasErrors && (
                <span className="home__form__errors">
                  {formik.errors.amount}
                </span>
              )}

              <FormControl sx={{ mb: 2 }}>
                <span>Filter by Category</span>
                <Select
                  displayEmpty
                  disabled={showConfirmation}
                  value={selectedCategory.name}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select</em>;
                    }

                    return <em>{selected}</em>;
                  }}
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
                  value={difficulty ?? "Select"}
                  disabled={showConfirmation}
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

              {!showConfirmation ? (
                <div
                  className="home__form__btns"
                  onClick={() => setShowConfirmation(true)}
                >
                  <Button btnClasses="_red">Continue</Button>
                </div>
              ) : (
                <div className="home__form__btns">
                  <Button
                    btnFunction={() => setShowConfirmation(false)}
                    btnClasses="_dark"
                  >
                    Cancel
                  </Button>
                  <Button btnClasses="_red" type="submit">
                    Start
                  </Button>
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Home;
