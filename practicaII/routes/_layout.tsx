import { FreshContext } from "$fresh/server.ts";
import Menu from "../components/Menu.tsx";

type MenuProps = {
  selected: "Heroes" | "Buscar Heroe";
};

const Layout = async (req: Request, ctx: FreshContext) => {
  const Component = ctx.Component;
  const route = ctx.route;
  const page = route.split("/").pop();
  const selected = page === "" ? "Heroes" : "Buscar Heroe";

  return (
    <>
      <Menu selected={selected} />
      <Component />
    </>
  );
};

export default Layout;
