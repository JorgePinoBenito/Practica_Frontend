import { FunctionComponent } from "preact";
import { Lover } from "../types.ts";
import { Comment } from "../types.ts";

const LoverName: FunctionComponent<{ lover: Lover }> = (
  { lover },
) => {
  return (
    <div class="lovername">
      <a href={`/lovername?name=${lover.name}`}>{lover.name}</a>

      <img src={lover.photo} alt={lover.name} />

      <p>
        <strong>Age:</strong>
        {lover.age}
      </p>

      <p>
        <strong>Sex:</strong> {lover.sex}
      </p>
      <p>
        <strong>Description:</strong> {lover.description}
      </p>
      <p>
        <strong>Hobbies:</strong> {[lover.hobbies].join(", ")}
      </p>
      <p>
        <strong>Comments:</strong>
      </p>
      <ol>
        {[lover.comments].flat().map((comment: Comment) => (
          <li key={comment}>
            <strong>{comment.user}:</strong> {comment.message}
            {" "}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LoverName;
