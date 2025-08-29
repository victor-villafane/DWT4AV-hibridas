import * as service from "../services/productos.services.js";
import * as views from "../views/productos.views.js";

export function getProductos(req, res) {
  service.getProductos().then((productos) => {
    res.send(views.createProductosListPage(productos));
  });
}

export function getProductoById(req, res) {
  const id = req.params.id;
  service.getProductoById(id).then((producto) => {
    if (producto) {
      res.send(views.createDetailPage(producto));
    } else {
      res.send(views.errorPage());
    }
  });
}
