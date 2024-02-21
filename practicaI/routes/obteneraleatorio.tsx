import { FreshContext, Handler, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { asset } from "$fresh/runtime.ts";
import { Data } from "../types.ts";

const fetchData = async (): Promise<Data> => {
  try {
    const response = await Axios.get<Data>(
      `https://learnyourlesson.deno.dev/`,
    );

    if (response.status !== 200) {
      throw new Error("Error");
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Error");
  }
};

export const handler: Handler = {
  async GET(
    _req: Request,
    ctx: FreshContext<unknown, Data>,
  ) {
    try {
      const quote = await fetchData();
      return ctx.render(quote);
    } catch (e) {
      console.error(e);
      throw new Error("Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  const quote = props.data;

  return (
    <div id="divquotealeatorio">
      <h1 id="h1quotealeatorio">Quote</h1>
      <p id="pquotealeatorio">{quote}</p>
      <a href="/">
        <button id="botonquotealeatorio">Volver</button>
      </a>
      <img id="imgquotealeatorio" src={asset("./tigre.png")} />
      <audio id="audioquotealeatorio" controls autoplay muted loop>
        <source src={asset("./audio.mp3")} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Page;
