import HeroesList from "../components/HeroesList.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Heroe } from "../types.ts";
import Axios from "npm:axios";

const fetchData = async (): Promise<Heroe[]> => {
  try {
    const response = await Axios.get<Heroe[]>(
      `https://supermondongo.deno.dev/`,
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

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Heroe[]>) => {
    try {
      const heroes = await fetchData();
      return ctx.render(heroes);
    } catch (error) {
      console.error(error);
      throw new Error("Error");
    }
  },
};

export default function Home(props: PageProps<Heroe[]>) {
  return (
    <div class="home">
      <h1>Supermondongo</h1>
      <HeroesList heroes={props.data} />
    </div>
  );
}
