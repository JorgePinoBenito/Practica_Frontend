import { FunctionComponent, h } from "preact";
import { FreshContext, Handlers } from "$fresh/server.ts";
import DeleteCommentForm from "../islands/DeleteCommentForm.tsx";
import {
  Cookie,
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.221.0/http/cookie.ts";

type FormData = {
  user: string;
  user_password: string;
  name: string;
  name_password: string;
};

const deleteComment = async (
  user: string,
  user_password: string,
  name: string,
  name_password: string,
) => {
  try {
    const response = await fetch(`https://lovers.deno.dev/${name}/comment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, user_password, name_password }),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting comment");
  }
};

export const handler: Handlers = {
  DELETE: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const url = new URL(req.url);
      const formData = await req.formData();

      const data: FormData = {
        user: formData.get("user") as string,
        user_password: formData.get("user_password") as string,
        name: ctx.params.name as string,
        name_password: formData.get("name_password") as string,
      };

      const headers = new Headers(req.headers);

      deleteCookie(headers, `username_${data.user}`, {
        path: "/",
        domain: url.hostname,
      });
      deleteCookie(headers, `password_${data.user}`, {
        path: "/",
        domain: url.hostname,
      });

      await deleteComment(
        data.user,
        data.user_password,
        data.name,
        data.name_password,
      );

      return new Response("", {
        status: 201,
        headers: {
          Location: "/",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Error deleting comment", {
        status: 500,
      });
    }
  },
};

const Page: FunctionComponent = () => {
  return (
    <div class="deletecomment">
      <DeleteCommentForm />
    </div>
  );
};

export default Page;
