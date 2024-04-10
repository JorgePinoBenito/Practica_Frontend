import { FunctionComponent } from "preact";
import { Lover } from "../types.ts";
import LoverName from "./LoverName.tsx";

const LoversList: FunctionComponent<{ lovers: Lover[] }> = ({ lovers }) => {
  return (
    <div class="loverlist">
      <ul>
        {lovers.map((p) => (
          <li key={p.name}>
            <LoverName lover={p} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoversList;
