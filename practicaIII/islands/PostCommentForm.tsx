import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";

export const PostCommentForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", user);
    formData.append("password", password);
    formData.append("message", message);
    formData.append("name", name);

    if (user === "" || password === "" || message === "" || name === "") {
      setError("All fields are required");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch(`/postcomment`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Comment added successfully!");
        setUser("");
        setPassword("");
        setMessage("");
        setName("");
        setError("");
      } else {
        setError("Error adding comment");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("Error adding comment");
      setSuccessMessage("");
    }
  };

  return (
    <div class="postcommentform">
      <h1>Post comment</h1>
      <form
        action="/postcomment"
        method="POST"
        onSubmit={submitHandler}
      >
        <div>
          <label htmlFor="user">User</label>
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
          <label htmlFor="message">Message</label>
        </div>
        <div>
          <textarea
            onFocus={(e) => setError("")}
            onInput={(e) => setMessage(e.currentTarget.value)}
            id="message"
            name="message"
          />
        </div>
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
          <button type="submit" disabled={error !== ""} class="btn">
            Post comment
          </button>
        </div>
        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setPassword("");
              setMessage("");
              setUser("");
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

export default PostCommentForm;
