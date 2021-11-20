import { 
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
import client from '../config/axios';
import Swal from 'sweetalert2';


// AGREGAR PRODUCTOS

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto() );

        try {
            // Crear nuevo producto API
            await client.post('/productos', producto)
            
            // Si todo sale bien, actualizar el state con el nuevo producto
            dispatch(agregarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            // Hubo un error
            console.log(error);
            dispatch(agregarProductoError(true));

            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si se guarda el producto
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

/************************************************************************************ */

// LISTADO DE PRODUCTOS

// Función que descarga los productos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await client.get('/productos');

            dispatch(descargarProductosExito(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError());
        }
    }
};

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

/************************************************************************************ */

// ELIMINAR PRODUCTO

export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await client.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            // Alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(productoEliminadoError());
        }
    }
};

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
});

const productoEliminadoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

/************************************************************************************ */
// EDITAR PRODUCTO

export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
            await client.put(`/productos/${producto.id}`, producto);
            dispatch(productoEditadoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se editó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(productoEditadoError());
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: true
});

const productoEditadoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const productoEditadoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
});