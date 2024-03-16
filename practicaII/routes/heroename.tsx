import HeroeName from "../components/HeroeName.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Heroe } from "../types.ts";
import Axios from "npm:axios";
import HeroesList from "../components/HeroesList.tsx";

const fetchData = async (name: string | undefined): Promise<Heroe[]> => {
  try {
    if (typeof name !== "string" || name === "" || name === undefined) {
      throw new Error("Invalid name provided for search.");
    }

    const response = await Axios.get<Heroe[]>(
      `https://supermondongo.deno.dev/${name}`,
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
      const url = new URL(req.url);
      const name = url.searchParams.get("name") || undefined;
      const heroe = await fetchData(name);

      return ctx.render(heroe);
    } catch (error) {
      console.error(error);
      throw new Error("Error");
    }
  },
};

const Page = (props: PageProps<Heroe[]>) => {
  return (
    <div class="heroe">
      <h1>Supermondongo</h1>
      <HeroesList heroes={props.data} />
    </div>
  );
};

export default Page;
