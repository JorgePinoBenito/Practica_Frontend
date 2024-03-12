import { FunctionComponent } from "preact";

type MenuProps = {
  selected: "Heroes" | "Buscar Heroe" | "Añadir Heroe";
};
const Menu: FunctionComponent<MenuProps> = ({ selected }) => {
  return (
    <div class="menu">
      <a href="/" class={selected === "Heroes" ? "selected" : ""}>
        Heroes
      </a>
      <a
        href="/heroesearch"
        class={selected === "Buscar Heroe" ? "selected" : ""}
      >
        Buscar Heroe
      </a>
      <a href="/add" class={selected === "Añadir Heroe" ? "selected" : ""}>
        Añadir Heroe
      </a>
    </div>
  );
};

export default Menu;
