import { FreshContext, Handler, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { asset } from "$fresh/runtime.ts";
import { Data } from "../types.ts";

const fetchData = async (id: string | undefined): Promise<Data> => {
  try {
    if (id === undefined) {
      throw new Error("Error");
    }
    const response = await Axios.get<Data>(
      `https://learnyourlesson.deno.dev/${parseInt(id)} `,
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
    req: Request,
    ctx: FreshContext<unknown, Data>,
  ) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id") || undefined;
      const quote = id ? await fetchData(id) : undefined;
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
    <div id="divquoteespecifico">
      {!props.data && (
        <>
          <>
            <a href="/">
              <button id="botonquoteespecificovolver">Volver</button>
            </a>
            <h1 id="h1quoteespecificobuscar">
              Buscar Quote por id
            </h1>
          </>
          <form id="formquoteespecifico" method="get">
            <input type="text" name="id" />
            <button type="submit">Buscar</button>
          </form>
        </>
      )}
      {props.data &&
        (
          <>
            <>
              <>
                <h1 id="h1quoteespecifico">Quote</h1>
                <p id="pquoteespecifico">{quote}</p>
              </>
              <a href="/obtenerespecifico">
                <button id="botonquoteespecifico">Volver</button>
              </a>
            </>
            <img id="imgquoteespecifico" src={asset("./tigre.png")} />
            <audio id="audioquoteespecifico" controls autoplay muted loop>
              <source src={asset("./audio.mp3")} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </>
        )}
    </div>
  );
};

export default Page;
