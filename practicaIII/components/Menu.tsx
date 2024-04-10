import { FunctionComponent } from "preact";

type MenuProps = {
  selected:
    | "Lovers"
    | "Filtrar lovers"
    | "Crear cuenta"
    | "Login"
    | "Eliminar lover"
    | "Comentar a otro usuario"
    | "Eliminar comentarios de otro usuario en tu perfil";
};
const Menu: FunctionComponent<MenuProps> = ({ selected }) => {
  return (
    <div class="menu">
      <a href="/loverslist" class={selected === "Lovers" ? "selected" : ""}>
        Personas
      </a>
      <a
        href="/filterlovers"
        class={selected === "Filtrar lovers" ? "selected" : ""}
      >
        Filtrar perfiles
      </a>
      <a
        href="/addlover"
        class={selected === "Crear cuenta" ? "selected" : ""}
      >
        Crear cuenta
      </a>

      <a
        href="/login"
        class={selected === "Login" ? "selected" : ""}
      >
        Login
      </a>
      <a
        href="/deletelover"
        class={selected === "Eliminar lover" ? "selected" : ""}
      >
        Eliminar usuario
      </a>
      <a
        href="/postcomment"
        class={selected === "Comentar a otro usuario" ? "selected" : ""}
      >
        Comentar a otro usuario
      </a>

      <a
        href="/deletecomment"
        class={selected === "Eliminar comentarios de otro usuario en tu perfil"
          ? "selected"
          : ""}
      >
        Eliminar comentarios de otro usuario en tu perfil
      </a>
    </div>
  );
};

export default Menu;
