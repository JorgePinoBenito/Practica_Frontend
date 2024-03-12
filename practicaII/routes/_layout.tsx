import { FreshContext } from "$fresh/server.ts";
import Menu from "../components/Menu.tsx";

type MenuProps = {
  selected: "Heroes" | "HeroeSearch" | "AddHeroe";
};

const Layout = async (req: Request, ctx: FreshContext) => {
  const Component = ctx.Component;
  const route = ctx.route;
  // last after /
  const page = route.split("/").pop();
  // if page is empty, it means we are at the root
  const selected = page === "" ? "Heroes" : "HeroeSearch";

  return (
    <>
      <Menu selected={selected} />
      <Component />
    </>
  );
};

export default Layout;
