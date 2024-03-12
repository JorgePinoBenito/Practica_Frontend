import mongoose from "npm:mongoose";
import { Heroe } from "../types.ts";

if (mongoose.connection.readyState === 0) {
  await mongoose.connect(Deno.env.get("MONGO_URL")!);
}

const heroeSchema = new mongoose.Schema({
  name: String,
  image: String,
  sound: String,
  creator: String,
});

export default mongoose.model<Heroe>("Heroe", heroeSchema);
