import AddForm from "../islands/AddForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import HeroeModel from "../db/Heroe.ts";
import { load } from "https://deno.land/std@0.218.0/dotenv/mod.ts";
import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const env = await load();
const password = env["PASS"];
const user = env["USER"];

const connectMongoDB = async (): Promise<Database> => {
  const mongo_usr = user;
  const mongo_pwd = password;
  const db_name = "supermondongos";
  const mongo_uri = "mongomake.3ta2r.mongodb.net";
  const mongo_url =
    `mongodb+srv://${mongo_usr}:${mongo_pwd}@${mongo_uri}/${db_name}?authMechanism=SCRAM-SHA-1`;
  const client = new MongoClient();
  await client.connect(mongo_url);
  const db = client.database(db_name);
  return db;
};

const db = await connectMongoDB();
const superHeroes = db.collection("superheroes");

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const formData = await req.formData();
      const data = {
        name: formData.get("name"),
        image: formData.get("image"),
        sound: formData.get("sound"),
        creator: formData.get("creator"),
      };

      const heroe = await superHeroes.insertOne(data);

      return new Response("", {
        status: 303,
        headers: {
          "Location": `/heroename?name=${heroe.name}`,
        },
      });
    } catch (error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  },
};

const Page = () => {
  return (
    <div>
      <h1>Supermondongo</h1>
      <AddForm />
    </div>
  );
};

export default Page;
