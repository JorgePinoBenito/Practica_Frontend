import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.221.0/http/cookie.ts";

interface Data {
  isAllowed: boolean;
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div class="index">
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>

      <a href="/login">Login</a>
      <br />
      <a href="/addlover">Register</a>
    </div>
  );
}
