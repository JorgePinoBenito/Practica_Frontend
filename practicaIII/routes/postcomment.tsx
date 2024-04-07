/*POST /:name/comment
Adds a comment to the lover's profile.
Requires user, password, and message fields in the request body. (User from which the comment is made)
Requires the name field in the request parameters. (User to comment on)
Requires the password field in the request body for authentication.*/

import { FunctionComponent, h } from "preact";
import { FreshContext, Handlers } from "$fresh/server.ts";
import PostCommentForm from "../islands/PostCommentForm.tsx";
import {
  Cookie,
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.221.0/http/cookie.ts";

import axios from "npm:axios";

type FormData = {
  user: string;
  password: string;
  message: string;
  name: string;
};

const postComment = async (
  user: string,
  password: string,
  message: string,
  name: string,
) => {
  try {
    const response = await fetch(`https://lovers.deno.dev/${name}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password, message }),
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding comment");
  }
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, unknown>) => {
    try {
      const url = new URL(req.url);
      const formData = await req.formData();

      const data: FormData = {
        user: formData.get("user") as string,
        password: formData.get("password") as string,
        message: formData.get("message") as string,
        name: formData.get("name") as string,
      };

      console.log(data.user);
      console.log(data.password);
      console.log(data.message);
      console.log(data.name);

      await postComment(data.user, data.password, data.message, data.name);
      return new Response("Comment added successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error adding comment", { status: 500 });
    }
  },
};

const Page = () => {
  return (
    <div class="postcomment">
      <h1>Post comment</h1>
      <PostCommentForm />
    </div>
  );
};

export default Page;
