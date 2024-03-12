import { FunctionComponent, h } from "preact";
import { Heroe } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import HeroesList from "../components/HeroesList.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact";

export const AddForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [sound, setSound] = useState<string>("");
  const [creator, setCreator] = useState<string>("");

  const submitHandler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const errorMsg: string[] = [];
    if (name === "") {
      errorMsg.push("You must provide a name");
    }
    if (image === "") {
      errorMsg.push("You must provide an image");
    }
    if (sound === "") {
      errorMsg.push("You must provide a sound");
    }
    if (creator === "") {
      errorMsg.push("You must provide a creator");
    }
    if (errorMsg.length > 0) setError(errorMsg.join(" | "));
    else {
      setError("");
      e.currentTarget.submit();
    }
  };
  return (
    <div class="addform">
      <h1>Añadir heroe</h1>
      <form
        action="/add"
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
      </form>
    </div>
  );
};

export default AddForm;
