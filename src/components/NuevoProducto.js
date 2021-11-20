import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';

const NuevoProducto = ({history}) => {
    // State del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // Utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    // Acceder al state del store
    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    // Manda a llamar el action de producto action
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar formulario
        if (nombre.trim() === '' || precio <= 0) {

            const alerta = {
                message: 'Ambos campos son obligatorios',
                classes : 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        // si no hay errores
        dispatch(ocultarAlerta());

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // redireccionar
        history.push('/');
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.message}</p> : null}

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input type="text" name="nombre" className="form-control"
                                    placeholder="Nombre Producto" value={nombre} onChange={e => guardarNombre(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input type="number" name="precio" className="form-control"
                                    placeholder="Nombre Producto" value={precio} onChange={e => guardarPrecio(Number(e.target.value))}/>
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>

                        { loading ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;