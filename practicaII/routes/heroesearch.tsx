import { FunctionComponent, h } from "preact";
import { Heroe } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import HeroesList from "../components/HeroesList.tsx";
import SearchForm from "../islands/SearchForm.tsx";

type Data = {
  name: string;
};

const fetchData = async (name: string | undefined): Promise<Heroe[]> => {
  try {
    const response = await Axios.get<Heroe[]>(
      `https://supermondongo.deno.dev/${name}`,
    );

    if (response.status !== 200) {
      throw new Error("Error");
    }

    return response.data;
  } catch (e) {
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

const Page = (
  props: PageProps<Heroe[]>,
) => {
  return (
    <div class="heroe">
      <h1>Supermondongo</h1>
      <SearchForm />
      <HeroesList heroes={props.data} />
    </div>
  );
};

export default Page;
