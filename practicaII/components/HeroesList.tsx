import { FunctionComponent } from "preact";
import { Heroe } from "../types.ts";
import HeroeName from "./HeroeName.tsx";

const HeroesList: FunctionComponent<{ heroes: Heroe[] }> = ({ heroes }) => {
  return (
    <div class="heroeslist">
      <h1>Heroes</h1>
      <ul>
        {heroes.map((heroe) => (
          <li key={heroe.name}>
            <HeroeName heroe={heroe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroesList;
