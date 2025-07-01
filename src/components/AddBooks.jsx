import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/add-book.css';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  price: yup.number().typeError("price must be a number").positive('must be greater than 0').required('Price is required'),
  stock: yup.number().typeError("Stock must be a number").positive().notRequired(),
  image: yup
  .mixed()
  .required('image is required')
  .test("fileRequired", "Image is required", (value) => {
    return value && value.length > 0
  }) // 2MB
  .test("fileSize", "File too large", (value) => {
    if (!value || value.length === 0) return true; // skip this test if no file
    return value[0].size <= 2 * 1024 * 1024; // 2MB
  }) // 2MB
  .test("fileType", "Unsupported file format", (value) => {
    if (!value || value.length === 0) return true; // skip this test if no file
    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
  }
)
});

const AddBook = () => {
  const navigate = useNavigate();
  // const [book, setBook] = useState({
  //   title: '',
  //   author: '',
  //   price: '',
  //   image: null,
  // });

    const {register, handleSubmit, formState: {errors}} = useForm({
      resolver: yupResolver(schema)
    });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setBook(prev => ({
  //     ...prev,
  //     [name]: files ? files[0] : value
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const role = user?.role;
  //   const token = localStorage.getItem("token");

  //   const formData = new FormData();
  //   for (let key in book) {
  //     formData.append(key, book[key]);
  //   }

  const onSubmit = async (data)=> {
    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('author',data.author)
    formData.append('price', data.price)
    formData.append('stock',data.stock)
    formData.append('image',data.image[0])

    
    try {
      await api.post('/books/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert("Book added successfully!");
      navigate('/seller/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  }

  return (
    <div className="add-book-page">
      <div className="overlay"></div>
      <div className="form-container container">
        <h2 className="text-center mb-4 text-white">Add a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="glass-form p-4 rounded shadow-lg">

          <div className="mb-3">
            <label className="form-label text-white">Title</label>
            <input type="text" className="form-control" {...register('title')}/>
            <p className='text-danger'>{errors.title?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Author</label>
            <input type="text" className="form-control" {...register('author')}/>
            <p className='text-danger'>{errors.author?.message}</p>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Price (₹)</label>
            <input type="number" className="form-control" {...register('price')}/>
            <p className='text-danger'>{errors.price?.message}</p>
          </div>

          <div className="mb-4">  
            <label className="form-label text-white">Upload Cover Image</label>
            <input type="file" accept="image/*" className="form-control" {...register('image')}/>
            <p className='text-danger'>{errors.image?.message}</p>
          </div>

          <button type="submit" className="btn btn-glass w-100"> Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
