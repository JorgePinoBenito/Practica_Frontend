import { FunctionComponent, h } from "preact";
import { FreshContext, Handlers } from "$fresh/server.ts";
import DeleteForm from "../islands/DeleteLoverForm.tsx";
import {
  Cookie,
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.221.0/http/cookie.ts";

type FormData = {
  name: string;
  password: string;
};

const deletePerson = async (name: string, password: string) => {
  try {
    const response = await fetch(`https://lovers.deno.dev/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting person");
  }
};

export const handler: Handlers = {
  DELETE: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const url = new URL(req.url);
      const formData = await req.formData();

      const data: FormData = {
        name: formData.get("name") as string,
        password: formData.get("password") as string,
      };

      const headers = new Headers(req.headers);

      deleteCookie(headers, `username_${data.name}`, {
        path: "/",
        domain: url.hostname,
      });
      deleteCookie(headers, `password_${data.name}`, {
        path: "/",
        domain: url.hostname,
      });

      await deletePerson(data.name, data.password);

      return new Response("", {
        status: 201,
        headers: {
          Location: "/",
        },
      });
    } catch (error) {
      throw new Error("Error deleting person");
    }
  },
};

const Page = () => {
  return (
    <div class="deletelover">
      <DeleteForm />
    </div>
  );
};

export default Page;
