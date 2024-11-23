let menu = true;

while (menu) {
  let usuario = parseInt(
    prompt(`Para ver un usuario, elija su ID entre 1 y 10. 
De lo contrario, ingrese 0 para ver todos los usuarios.`)
  );

  const leer = async () => {
    try {
      const usersRes = await fetch("./users.json");
      const postsRes = await fetch("./posts.json");
      const comentariosRes = await fetch("./comentarios.json");
      const albumsRes = await fetch("./albums.json");
      const fotosRes = await fetch("./fotos.json");

      if (!usersRes.ok || !postsRes.ok || !comentariosRes.ok || !albumsRes.ok || !fotosRes.ok) {
        throw new Error("Error al leer uno o más archivos JSON.");
      }

      const users = await usersRes.json();
      const posts = await postsRes.json();
      const comentarios = await comentariosRes.json();
      const albums = await albumsRes.json();
      const fotos = await fotosRes.json();

      return { users, posts, comentarios, albums, fotos };
    } catch (error) {
      console.error("error al cargar los archivos json:", error);
    }
  };
//   const leer = async () => {
//     try {
//         const response = await fetch("./json18.json");
//         if (!response.ok) {
//             throw new Error("Error al leer el archivo JSON");
//         }
//         return response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// leer().then(data => {
//     // Filtrar los elementos cuyo nombre comience con "A"
//     const filtrados = data.filter(item => item.nombre && item.nombre.startsWith("A"));
//     console.log(filtrados);
// });

  if (usuario >= 1 && usuario <= 10) {
    alert("el usuario sera visible en consola");

    leer().then(({ users, posts, comentarios, albums, fotos }) => {
        //arrow function 
      const usuarioSeleccionado = users.find((user) => user.id === usuario);
            //camelCase              .find primer elemento de codicion
// leer().then(data => {
//     const filtrados = data.filter(item => item.nombre && item.nombre.startsWith("A"));
//     console.log(filtrados);
// });
      if (!usuarioSeleccionado) {
        console.log("Usuario no encontrado.");
        return;
      }
      console.log(`id: selecionado: ${usuarioSeleccionado.id}
usuario seleccionado: ${usuarioSeleccionado.name}`);

    //   "id": 1,
    //   "name": "Leanne Graham",
    //   "username": "Bret",

      // Filtrar posts y comentarios
      const userPosts = posts
        .filter((post) => post.userId === usuario)
        .map((post) => ({
          ...post,
          //destructuracion de objetos para ver el resto de posts  " https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
          comentarios: comentarios.filter((comentario) => 
         //filtracion comentarios con comentarios.postID
        //   "postId": 99,
        //   "id": 495,
        //   "name": "dolor ut ut aut molestiae esse et tempora numquam",
          comentario.postId === post.id),
        }));

      // filtrar albumes y fotos
      const userAlbums = albums
        .filter((album) => album.userId === usuario)
        .map((album) => ({
          ...album,
        //destructuracion de objetos para ver el resto de albums  " https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
          fotos: fotos.filter((foto) => foto.albumId === album.id),
          //filtrar fotos con album id   fotos.albumID
        }));

      console.log("posts con comentarios:", userPosts);
      console.log("albumes con fotos:", userAlbums);
    });

    menu = false;
  } else if (usuario === 0) {
    alert("Todos los usuarios serán visibles en consola");

    leer().then(({ users, posts, comentarios, albums, fotos }) => {
      console.log("Lista de todos los usuarios:", users);

      users.forEach((user) => {
        console.log(`Usuario: ${user.name}`);

        const userPosts = posts
          .filter((post) => post.userId === user.id)
          .map((post) => ({
            ...post,
            comentarios: comentarios.filter((comentario) => comentario.postId === post.id),
          }));

        const userAlbums = albums
          .filter((album) => album.userId === user.id)
          .map((album) => ({
            ...album,
            fotos: fotos.filter((foto) => foto.albumId === album.id),
          }));

        console.log("posts con comentarios:", userPosts);
        console.log("albumes con fotos:", userAlbums);
      });
    });

    menu = false;
  } else {
    alert("dato no valido");
  }
}
