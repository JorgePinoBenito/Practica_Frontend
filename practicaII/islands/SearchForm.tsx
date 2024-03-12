import { FunctionComponent, h } from "preact";
import { Heroe } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import HeroesList from "../components/HeroesList.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact";

export const SearchForm: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");

  const submitHandler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const errorMsg: string[] = [];
    if (name === "") {
      errorMsg.push("You must provide a name");
    }
    if (errorMsg.length > 0) setError(errorMsg.join(" | "));
    else {
      setError("");
      e.currentTarget.submit();
    }
  };
  return (
    <div class="searchform">
      <h1>Introduce el nombre del personaje a buscar</h1>
      <form
        action="/heroesearch"
        method="GET"
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
          <button
            type="submit"
            disabled={error !== ""}
            class="btn"
          >
            Search
          </button>
        </div>
        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
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

export default SearchForm;
