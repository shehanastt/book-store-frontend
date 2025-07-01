import React, { useEffect} from 'react';
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/edit-book.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  price: yup.number().typeError("price must be a number").positive("must be a positive number") ,
  image: yup
  .mixed() 
  .test("fileSize", "File too large", (value) => {
    if (!value || value.length === 0) return true;
    return value[0].size <= 2 * 1024 * 1024;
  })
  .test("fileType", "Unsupported file format", (value) => {
    if (!value || value.length === 0) return true;
    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
  })
})

const EditBook = () => {
  const {register , handleSubmit, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => {
        const { title, author, price } = res.data.data;
        reset({ title, author, price});
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load book details.");
      });
  }, [id, reset]);

  const onSubmit = async (data)=> {
    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('author',data.author)
    formData.append('price', data.price)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }


    api.patch(`/books/edit/${id}`, formData)
    .then(() => {
      alert('Book updated successfully!');
      navigate('/seller/dashboard');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to update book.');
    });
  }

  return (
    <div className="edit-book-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 rounded-4 bg-white edit-book-form" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4  fw-bold">Edit Book</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input 
            className="form-control" 
            placeholder="Book title" 
            {...register('title')}
            />
            <p className='text-danger'>{errors.title?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              className="form-control"
              placeholder="Author name"
              {...register('author')}
            />
            <p className='text-danger'>{errors.author?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price</label>
            <input
              type='number'
              className="form-control"
              placeholder="Enter price"
              {...register('price')}
            />
            <p className='text-danger'>{errors.price?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Upload New Image (optional)</label>
            <input
              type="file"
              {...register('image')}
              className="form-control"
              accept="image/*"
            />
            <p className='text-danger'>{errors.image?.message}</p>
          </div>

          <button type="submit" className="btn btn-light me-3 w-100">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
