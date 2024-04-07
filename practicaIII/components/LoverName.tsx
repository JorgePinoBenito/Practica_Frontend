import { FunctionComponent } from "preact";
import { Lover } from "../types.ts";

const LoverName: FunctionComponent<{ lover: Lover }> = (
  { lover },
) => {
  return (
    <div class="heroename">
      <a href={`/lovername?name=${lover.name}`}>{lover.name}</a>

      <img src={lover.photo} alt={lover.name} />

      <p>Age: {lover.age}</p>

      <p>Sex: {lover.sex}</p>
      <p>Description: {lover.description}</p>
      <p>Hobbies: {lover.hobbies.join(", ")}</p>

      <p>Comments:</p>
      <ol>
        {lover.comments.map((c) => (
          <li key={c}>
            {c.user}: {c.message}
            {" "}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LoverName;
