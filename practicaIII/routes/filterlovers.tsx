// Page.tsx
import { FunctionComponent, h, JSX } from "preact";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Lover } from "../types.ts";
import LoversList from "../components/LoversList.tsx";

type FormData = {
  query: string;
};

const fetchData = async (): Promise<Lover[]> => {
  try {
    const response = await Axios.get<Lover[]>("https://lovers.deno.dev/");
    if (response.status !== 200) {
      throw new Error("Error");
    }
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Error");
  }
};

const filterLovers = (lovers: Lover[], searchQuery: string): Lover[] => {
  const query = searchQuery.toLowerCase();
  return lovers.filter(
    (lover) =>
      lover.name.toLowerCase().includes(query) ||
      lover.age.toString() === query || // Filtrar por edad
      lover.sex.toLowerCase() === query || // Filtrar por sexo
      // Filtrar por hobbies asi
      [lover.hobbies].flat().some((hobby) =>
        hobby.toLowerCase().includes(query)
      ),
  );
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Lover[]>) => {
    try {
      //haz una peticion a la api y con el array de lovers que te devuelva filtra los lovers que coincidan con la query de busqueda
      const url = new URL(req.url);
      const searchQuery = url.searchParams.get("search") || "";
      const lovers = await fetchData();
      const filteredLovers = filterLovers(lovers, searchQuery);
      return ctx.render(filteredLovers);
    } catch (error) {
      console.error(error);
      console.error("Error occurred during route handling:", error);
      throw new Error("Error");
    }
  },
};

const Page: FunctionComponent<PageProps<Lover[]>> = (props) => {
  return (
    <div class="filterlovers">
      <h1>Lovers</h1>
      <form action="/filterlovers" method="GET">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for names, age, sex, or hobbies.."
        />
        <button type="submit">Search</button>
      </form>
      <LoversList lovers={props.data} />
    </div>
  );
};

export default Page;
