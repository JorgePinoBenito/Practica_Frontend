// DeleteForm.tsx
import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";

export const DeleteForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);

    if (name === "" || password === "") {
      setError("All fields are required");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("/deletelover", {
        method: "DELETE",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Person deleted successfully!");
        setName("");
        setPassword("");
        setError("");
      } else {
        setError("Error deleting person");
        setSuccessMessage("");
      }
    } catch (error) {
      setError("Error deleting person");
      setSuccessMessage("");
    }
  };

  return (
    <div class="deleteform">
      <h1>Delete lover</h1>
      <form action="/deletelover" method="DELETE" onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="password">Password</label>
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
          <button type="submit" disabled={error !== ""} class="btn">
            Delete
          </button>
        </div>
        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setPassword("");
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

export default DeleteForm;
