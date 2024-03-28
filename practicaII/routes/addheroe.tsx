import AddForm from "../islands/AddForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";

import { load } from "https://deno.land/std@0.218.0/dotenv/mod.ts";
import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import axios from "npm:axios";

type FormData = {
  name: string;
  image: string;
  sound: string;
  creator: string;
};

const addSuperhero = async (data: FormData) => {
  try {
    const response = await axios.post(
      "https://supermondongo.deno.dev/",
      data,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding superhero");
  }
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const formData = await req.formData();

      const data: FormData = {
        name: formData.get("name") as string,
        image: formData.get("image") as string,
        sound: formData.get("sound") as string,
        creator: formData.get("creator") as string,
      };

      const response = await addSuperhero(data);

      return new Response("", {
        status: 201,
        headers: {
          Location: "/",
        },
      });
    } catch (error) {
      throw new Error("Error adding superhero");
    }
  },
};

const Page = () => {
  return (
    <div class="heroe">
      <h1>Supermondongo</h1>
      <AddForm />
    </div>
  );
};

export default Page;
