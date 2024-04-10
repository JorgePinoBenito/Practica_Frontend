import LoginForm from "../islands/LoginForm.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";

import axios from "npm:axios";

import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.221.0/http/cookie.ts";

/*POST /login
Name and password on body for authentication.  */

type FormData = {
  name: string;
  password: string;
};

interface Data {
  isAllowed: boolean;
}

const login = async (data: FormData) => {
  try {
    const response = await axios.post(
      "https://lovers.deno.dev/login",
      data,
    );
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
      };

      const headers = new Headers();
      //obtener todos las cookies con nombre-valor del request y comprobar con el nombre y contraseña del formulario
      const cookies = getCookies(req.headers);
      if (
        cookies.username === data.name && cookies.password === data.password
      ) {
        await login(data);
        headers.set("location", "/personlist");
        return new Response("", {
          status: 201, // "See Other"
          headers,
        });
      } else {
        headers.set("location", "/login");
        return new Response("", {
          status: 201, // "See Other"
          headers,
        });
      }
    } catch (error) {
      throw new Error("Error login person");
    }
  },
};

const Page = () => {
  return (
    <div class="login">
      <LoginForm />
    </div>
  );
};

export default Page;
