import { FunctionComponent, h } from "preact";
import { Heroe } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import HeroesList from "../components/HeroesList.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact";

export const AddForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [sound, setSound] = useState<string>("");
  const [creator, setCreator] = useState<string>("");

  const submitHandler = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("sound", sound);
    formData.append("creator", creator);

    if (name === "" || image === "" || sound === "" || creator === "") {
      setError("You must provide all the fields");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("/addheroe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Superhero added successfully!");
        setName("");
        setImage("");
        setSound("");
        setCreator("");
        setError("");
      } else {
        setError("Error adding superhero");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("Error adding superhero");
      setSuccessMessage("");
    }
  };

  return (
    <div class="addform">
      <h1>Añadir heroe</h1>
      <form
        action="/addheroe"
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
          <label for="image">Image</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setImage(e.currentTarget.value)}
            type="text"
            id="image"
            name="image"
          />
        </div>
        <div>
          <label for="sound">Sound</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setSound(e.currentTarget.value)}
            type="text"
            id="sound"
            name="sound"
          />
        </div>
        <div>
          <label for="creator">Creator</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setCreator(e.currentTarget.value)}
            type="text"
            id="creator"
            name="creator"
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
              setImage("");
              setSound("");
              setCreator("");
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

export default AddForm;
