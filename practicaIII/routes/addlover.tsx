import RegisterForm from "../islands/AddForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import axios from "npm:axios";
import {
  Cookie,
  setCookie,
} from "https://deno.land/std@0.221.0/http/cookie.ts";
import { Comment } from "../types.ts";

type FormData = {
  name: string;
  password: string;
  age: number;
  sex: string;
  description: string;
  hobbies: string[];
  photo: string;
  comments: Comment[];
};

const addPerson = async (data: FormData) => {
  try {
    const response = await axios.post("https://lovers.deno.dev/", data);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding person");
  }
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const url = new URL(req.url);
      const formData = await req.formData();

      const data: FormData = {
        name: formData.get("name") as string,
        password: formData.get("password") as string,
        age: Number(formData.get("age")) as number,
        sex: formData.get("sex") as string,
        description: formData.get("description") as string,
        hobbies: formData.getAll("hobbies") as string[],
        photo: formData.get("photo") as string,
        comments: formData.get("comments") as unknown as Comment[],
      };

      const headers = new Headers();

      // Crear cookies separadas para el nombre de usuario y la contraseña
      setCookie(headers, {
        name: `username_${data.name}`, // Nombre de la cookie para el nombre de usuario
        value: data.name, // Valor del nombre de usuario
        maxAge: 120,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      setCookie(headers, {
        name: `password_${data.name}`, // Nombre de la cookie para la contraseña
        value: data.password, // Valor de la contraseña
        maxAge: 120,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      await addPerson(data);

      headers.set("location", "/personlist");
      return new Response("", {
        status: 201, // "See Other"
        headers,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error adding person");
    }
  },
};

const Page = () => {
  return (
    <div class="addlover">
      <RegisterForm />
    </div>
  );
};

export default Page;
