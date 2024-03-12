import { FunctionComponent } from "preact";
import { Heroe } from "../types.ts";

const HeroeName: FunctionComponent<{ heroe: Heroe }> = (
  { heroe },
) => {
  return (
    <div class="heroename">
      <a href={`/heroename?name=${heroe.name}`}>{heroe.name}</a>

      <img src={heroe.image} alt={heroe.name} />

      <audio controls>
        <source src={heroe.sound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default HeroeName;
