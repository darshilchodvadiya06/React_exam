import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const apiUrl = 'http://localhost:4000/posts';

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const postData = async (formData) => {
        try {
            await axios.post(apiUrl, formData);
            fetchData();
            reset(); // Clear form after successful submission
        } catch (error) {
            setError(error);
        }
    };

    const deleteData = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchData();
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = (formData) => {
        postData(formData);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteData(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                <input id='firstName' {...register('firstName')} />
                <input id='lastName' {...register('lastName', { required: true })} />
                {errors.lastName && <p>Product Descriptionis required.</p>}
                <input id='age' {...register('age', { pattern: /\d+/ })} />
                {errors.age && <p>Please enter a price of Product.</p>}
                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>

            <div className='row'>
                {error && <div className='alert alert-danger'>Error: {error.message}</div>}
                {data.map((item) => {
                    const { id, productName, price, desc } = item;
                    return (
                        <div key={id} className='col-md-4 mb-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className='card-title'>ID: {id}</h4>
                                    <h1 className='card-title'>{productName}</h1>
                                    <h5 className='card-text'>{desc}</h5>
                                    <h5 className='card-text'>${price}</h5>
                                    <button onClick={() => handleDelete(id)} className='btn btn-danger' data-bs-toggle='modal' data-bs-target='#confirmDeleteModal'>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Delete Confirmation Modal */}
            <div className='modal' id='confirmDeleteModal' tabIndex='-1'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Confirm Deletion</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete this data?</p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                            <button type='button' className='btn btn-danger' onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
