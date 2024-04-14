import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import { JSX } from "preact";

export const RegisterForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("age", age.toString());
    formData.append("sex", sex);
    formData.append("description", description);
    hobbies.forEach((hobby) => formData.append("hobbies", hobby));
    formData.append("photo", photo);
    formData.append("comments", JSON.stringify(comments));

    if (
      name === "" ||
      password === "" ||
      age === 0 ||
      sex === "" ||
      description === "" ||
      hobbies.length === 0 ||
      photo === "" ||
      comments.length === 0
    ) {
      setError("All fields are required");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("/addlover", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Person added successfully!");
        setName("");
        setPassword("");
        setAge(0);
        setSex("");
        setDescription("");
        setHobbies([]);
        setPhoto("");
        setComments([]);

        setError("");
      } else {
        setError("Error adding person");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("Error adding person");
      setSuccessMessage("");
    }
  };

  return (
    <div class="addform">
      <h1>Add lover</h1>
      <form
        action="/addlover"
        method="POST"
        onSubmit={submitHandler}
      >
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label for="password">Password</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setPassword(e.currentTarget.value)}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div>
          <label for="age">Age</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setAge(Number(e.currentTarget.value))}
            type="number"
            id="age"
            name="age"
          />
        </div>
        <div>
          <label for="sex">Sex</label>
        </div>
        <div>
          <select
            onFocus={(e) => setError("")}
            onInput={(e) => setSex(e.currentTarget.value)}
            type="text"
            id="sex"
            name="sex"
          >
            <option value="">Todos</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otros</option>
          </select>
        </div>

        <div>
          <label for="description">Description</label>
        </div>
        <div>
          <textarea
            onFocus={(e) => setError("")}
            onInput={(e) => setDescription(e.currentTarget.value)}
            id="description"
            name="description"
          />
        </div>
        <div>
          <label for="hobbies">Hobbies</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setHobbies(e.currentTarget.value.split(","))}
            type="text"
            id="hobbies"
            name="hobbies"
          />
        </div>
        <div>
          <label for="photo">Photo</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setPhoto(e.currentTarget.value)}
            type="text"
            id="photo"
            name="photo"
          />
        </div>

        <div>
          <label for="comments">Comments</label>
        </div>
        <div>
          <textarea
            onFocus={(e) => setError("")}
            onInput={(e) => setComments(JSON.parse(e.currentTarget.value))}
            id="comments"
            name="comments"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={error !== ""}
            class="btn"
          >
            Add
          </button>
        </div>

        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setPassword("");
              setAge(0);
              setSex("");
              setDescription("");
              setHobbies([]);
              setPhoto("");
              setComments([]);

              setError("");
            }}
          >
            Reset
          </button>
        </div>
        {error !== "" && <div class="span-2 error">{error}</div>}
        {successMessage !== "" && (
          <div class="span-2 success">{successMessage}</div>
        )}
      </form>
    </div>
  );
};
export default RegisterForm;
