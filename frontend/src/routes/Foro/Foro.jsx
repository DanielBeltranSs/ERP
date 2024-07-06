import { useState, useEffect } from 'react';
import { getForo } from './../../services/foro.service.js';
import { useNavigate } from 'react-router-dom';
const Foro = () => {

    const [publicacion, setpublicacion] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
      try {
          const [foroResponse] = await Promise.all([getForo()]);
          console.log(foroResponse.data);
          setpublicacion(foroResponse.data);
      } catch (error) {
          console.error("Error al obtener datos", error);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    }

    const getPhotoUrl = (url) => {
    return url.startsWith('http') ? url : `http://localhost:3000/${url}`;
    };

    return (
        <div className='max-w-6xl'>
            <div className='text-center'>
                <h1 className='text-gray-700'>Foro Empresa</h1>
            </div>
            <div className='flex justify-between'>
                <p className='text-gray-700'>Ultimas publicaciones</p>
                <button onClick={() => navigate("/foro/nuevo")} className='text-gray-950 bg-yellow-300 mb-4 px-2 py-1 rounded-full text-xl align-middle justify-center items-center'>+</button>
            </div>
            
            <div className='bg-white'>
                {publicacion.map((post) => (
                    <div key={post._id} className='px-6 py-4 mb-4 ring-4 ring-red-300 rounded-b-lg rounded-r-lg'>
                        <div className='flex'>
                            
                            <h2 className='font-bold text-xl mb-2 text-blue-900'>{post.titulo}</h2>
                        </div>
                        {post.imagen && <img src={getPhotoUrl(post.imagen.imageUrl)} alt="archivos"  className='max-w-lg max-h-lvh'/>}
                        <p className='text-gray-700 text-base text-justify overflow-ellipsis overflow-hidden'>{post.contenido}</p>
                        <p className='text-sm text-gray-600'>{post.autor}</p>
                        <p className='text-sm text-gray-600'>{formatearFecha(post.fechaCreacion)}</p>
                        {post.comentarios && post.comentarios.map((comentario) => (
                            <div key={comentario._id} className='bg-gray-100 p-4 mt-4'>
                                <p className='text-gray-700'>{comentario.contenido}</p>
                                <p className='text-sm text-gray-600'>{comentario.autor}</p>
                                <p className='text-sm text-gray-600'>{formatearFecha(comentario.fechaCreacion)}</p>
                            </div>
                        ))}
                        <button className='text-red-400'>Comentar</button>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Foro;