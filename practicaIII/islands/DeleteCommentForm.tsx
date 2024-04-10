import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import { JSX } from "preact";

export const DeleteCommentForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [user_password, setUser_Password] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [name_password, setName_Password] = useState<string>("");

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", user);
    formData.append("user_password", user_password);
    formData.append("name", name);
    formData.append("name_password", name_password);

    if (
      user === "" || user_password === "" || name === "" || name_password === ""
    ) {
      setError("All fields are required");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch(`/deletecomment`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Comment deleted successfully!");
        setUser("");
        setUser_Password("");
        setName("");
        setName_Password("");
        setError("");
      } else {
        setError("Error deleting comment");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("Error deleting comment");
      setSuccessMessage("");
    }
  };

  return (
    <div class="deletecommentform">
      <h1>Delete comment</h1>
      <form
        action="/deletecomment"
        method="POST"
        onSubmit={submitHandler}
      >
        <div>
          <label for="user">User</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setUser(e.currentTarget.value)}
            type="text"
            id="user"
            name="user"
          />
        </div>
        <div>
          <label for="user_password">Password</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setUser_Password(e.currentTarget.value)}
            type="password"
            id="user_password"
            name="user_password"
          />
        </div>
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
          <label for="name_password">Password</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setName_Password(e.currentTarget.value)}
            type="password"
            id="name_password"
            name="name_password"
          />
        </div>
        <div>
          <button type="submit" disabled={error !== ""} class="btn">
            Delete comment
          </button>
        </div>

        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setName_Password("");
              setUser("");
              setUser_Password("");
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

export default DeleteCommentForm;
