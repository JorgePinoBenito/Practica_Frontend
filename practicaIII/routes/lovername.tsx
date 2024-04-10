import LoverName from "../components/LoverName.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Lover } from "../types.ts";
import Axios from "npm:axios";

const fetchData = async (name: string | undefined): Promise<Lover> => {
  try {
    if (typeof name !== "string" || name === "" || name === undefined) {
      throw new Error("Invalid name provided for search.");
    }

    const response = await Axios.get<Lover>(
      `https://lovers.deno.dev/${name}`,
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
  GET: async (req: Request, ctx: FreshContext<unknown, Lover>) => {
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

const Page = (props: PageProps<Lover>) => {
  return (
    <div class="lovername">
      <h1>Lover</h1>
      <LoverName lover={props.data} />
    </div>
  );
};

export default Page;
