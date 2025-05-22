import './App.css';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [correo, setCorreo] = useState("");
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      correo: correo,
    }).then(() => {
      limpiarDatos();
      getUsuarios();

      Swal.fire({
        icon: "success",
        title: "¡Registro Exitoso!",
        html: "<strong>" + nombre + "</strong> ha sido registrado con exito.",
        draggable: true,
        timer: 1500
      });
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el usuario!",
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Verifique su conexion a internet" : JSON.parse(JSON.stringify(error)).message
      });
    })
  }

  const editarUsuario = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCorreo(val.correo);
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      correo: correo,
    }).then(() => {
      limpiarDatos();
      getUsuarios();
      Swal.fire({
        icon: "success",
        title: "¡Actualización Exitosa!",
        html: "<strong>" + nombre + "</strong> ha sido actualizado con exito.",
        draggable: true,
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró actualizar el usuario!",
        footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Verifique su conexion a internet" : JSON.parse(JSON.stringify(error)).message
      });
    })
  }

  const deleteUsuario = (val) => {
    Swal.fire({
      title: "Estas seguro de Eliminar?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          Swal.fire({
            title: "Usuario Eliminado!",
            html: "<strong>" + val.nombre + "</strong> ha sido eliminado.",
            icon: "success",
            timer: 3000
          });
          limpiarDatos();
          getUsuarios();
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar el usuario!",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Verifique su conexion a internet" : JSON.parse(JSON.stringify(error)).message
          });
        })
      }
      else {
        Swal.fire({
          title: "Cancelado!",
          html: "El usuario <strong>" + val.nombre + "</strong> no ha sido eliminado.",
          icon: "success",
          timer: 3000
        });
      };
    });
  }

  const limpiarDatos = () => {
    setEditar(false);
    setNombre("");
    setEdad("");
    setCorreo("");
  }

  const getUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios").then((response) => {
      setUsuarios(response.data);
    });
  }

  useEffect(() => {
    getUsuarios(); // Llamar a getUsuarios cuando el componente se monta
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente


  return (
    <div className='container1'>    
      <div className="container">
        <div className='App'>
          <div className="datos">
            <div className="card text-center">
              <div className="card-header">CRUD REACT USUARIOS</div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nombre: </span>
                  <input value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    type="text" className="form-control" placeholder="Nombre" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Edad: </span>
                  <input value={edad}
                    onChange={(event) => setEdad(event.target.value)}
                    type="number" className="form-control" placeholder="Edad" />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Correo: </span>
                  <input value={correo}
                    onChange={(event) => setPais(event.target.value)}
                    type="text" className="form-control" placeholder="Correo" />
                </div>

              </div>
              <div className="card-footer text-muted">
                <div>
                  {
                    editar ? <div>
                      <button onClick={update} type="button" className="btn btn-info m-2">Actualizar</button>
                      <button onClick={limpiarDatos} type="button" className="btn btn-danger m-2">Cancelar</button>
                    </div>
                      :
                      <button onClick={add} type="button" className="btn btn-success">REGISTRAR</button>
                  }
                </div>
              </div>
            </div>
          </div>

          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Correo</th>
              </tr>
            </thead>
            <tbody>
              {
                empleados.map((val, key) => {
                  return <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.correo}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => editarEmpleado(val)} type="button" className="btn btn-info">Editar</button>
                        <button onClick={() => deleteEmpleado(val)} type="button" className="btn btn-danger">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
          
        </div>
      </div>
      <Footer />
  </div>
  );
}

export default App;