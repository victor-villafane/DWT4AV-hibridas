export function createPage(titulo, contenido) {
  let html = "";
  html +=
    '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
  html += "<title>" + titulo + "</title>";
  html += "</head><body>";
  html += `<h1>${titulo}</h1>`;
  html += contenido;
  html += "</body></html>";

  return html;
}

export function createProductosListPage(productos) {
  let html = "<ul>";
  productos.forEach((producto) => {
    html += `<li>${producto.modelo} <a href="/productos/${producto.id}">Ver</a></li>`;
  });
  html += "</ul>";

  return createPage("Productos", html);
}

export function createDetailPage(producto) {
  let html = "";
  html += "<ul>";
  html += `<li>Marca: ${producto.marca}</li>`;
  html += `<li>Modelo: ${producto.modelo}</li>`;
  html += `<li>Precio: ${producto.precio}</li>`;
  html += "</ul>";
  html += `<a href="/productos">Volver</a>`;
  return createPage(producto.modelo, html);
}

export function errorPage() {
  let html = "";
  html += "<h2>No se encontro el producto buscado</h2>";
  html += `<a href="/">Volver</a>`;
  return createPage("404", html);
}
