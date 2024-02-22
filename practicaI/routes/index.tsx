import { asset } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div id="divobtener">
      <a href="/obteneraleatorio">
        <button id="botonobteneraleatorio">Obtener</button>
      </a>
      <a href="/obtenerespecifico">
        <button id="botonobtenerespecifico">Obtener especifico</button>
      </a>
      <a href="https://www.nebrija.com/">
        <p id="broma">
          !Solo te pido que nunca <br />
          curses nada aquí!
        </p>
      </a>
      <img id="imgindex" src={asset("./tigre.png")} />
      <audio id="audioindex" controls autoplay muted loop>
        <source src={asset("./audio.mp3")} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <video id="videoindex" width="320" height="240" controls>
        <source src={asset("./video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
