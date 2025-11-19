import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient";
import Table from 'react-bootstrap/Table';

interface Movie {
    _id: string;
    judul: string;
    tahunRilis: string;
    sutradara: string;
    createdAt: string;
    updatedAt: string;

}

function Movies(){
    const[movies, setMovies] = useState<Movie[]> ([]);
    const[loading, setLoading] = useState<boolean>(true)

    const fetchMovies = useCallback(async() => {
        setLoading(true)
        const response = await ApiClient.get("/movie")

        if(response.status == 200){
            setMovies(response.data.data)
            setLoading(false)
        }


    }, []);

    useEffect(() =>{
        fetchMovies()
    },[fetchMovies])

    const handleDelete = async (movieId : string) => {
        const response = await ApiClient.delete(`/movie/${movieId}`)

        if (response.status == 200){
            fetchMovies()
        }
    }



    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-1">
            <h2>Movie Page</h2>
            <NavLink to="/add-movie"className="btn btn-primary">AddMovie</NavLink>
        </div>
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Tahun Rilis</th>
                        <th>Sutradara</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading......</td>
                        </tr>
                    }
                    {
                        movies.length > 0 && movies.map((movie,index) =>{
                            return <tr key ={movie._id}>
                                <td>{index +1}</td>
                                <td>{movie.judul}</td>
                                <td>{movie.tahunRilis}</td>
                                <td>{movie.sutradara}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(movie._id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}

export default Movies