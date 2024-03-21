import AddForm from "../islands/AddForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";

import { load } from "https://deno.land/std@0.218.0/dotenv/mod.ts";
import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import axios from "npm:axios";
import DeleteForm from "../islands/DeleteForm.tsx";

type FormData = {
  name: string;
  creator: string;
};

const deleteSuperhero = async (data: FormData) => {
  try {
    const response = await axios.delete(
      `https://supermondongo.deno.dev/${data.name}`,
      { data: { creator: data.creator } },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting superhero");
  }
};

export const handler: Handlers = {
  DELETE: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const formData = await req.formData();

      const data: FormData = {
        name: ctx.params.name as string,
        creator: formData.get("creator") as string,
      };

      const response = await deleteSuperhero(data);

      return new Response("", {
        status: 204,
      });
    } catch (error) {
      throw new Error("Error deleting superhero");
    }
  },
};

const Page = () => {
  return (
    <div class="heroe">
      <h1>Supermondongo</h1>
      <DeleteForm />
    </div>
  );
};

export default Page;
