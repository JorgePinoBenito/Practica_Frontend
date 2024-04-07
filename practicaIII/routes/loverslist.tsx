import LoversList from "../components/LoversList.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Lover } from "../types.ts";
import Axios from "npm:axios";

const fetchData = async (): Promise<Lover[]> => {
  try {
    const response = await Axios.get<Lover[]>(
      `https://lovers.deno.dev/`,
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
  GET: async (req: Request, ctx: FreshContext<unknown, Lover[]>) => {
    try {
      const lovers = await fetchData();
      return ctx.render(lovers);
    } catch (error) {
      console.error(error);
      throw new Error("Error");
    }
  },
};

const Page = (props: PageProps<Lover[]>) => {
  //comprobar si esta logeado

  return (
    <div class="personlist">
      <h1>Lovers</h1>
      <LoversList lovers={props.data} />
    </div>
  );
};

export default Page;
