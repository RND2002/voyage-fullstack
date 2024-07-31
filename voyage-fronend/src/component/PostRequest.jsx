
import React, { useState } from 'react';
import { executePostPostOfUserService, executeCoverUplloadOfPost } from '../api/PostApiService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import AuthenticatedNavbar from './AuthenticatedNavbar';

const PostRequest = () => {
      const[loader,setLoader]=useState(false)
      const [postRequest, setPostRequest] = useState({
        title: '',
        description: '',
        tags: [],
        isVisible:true,
        isDeleted:false
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            // Split the string value into an array of tags
            const tagsArray = value.split(',').map(tag => tag.trim());
            setPostRequest(prevData => ({
                ...prevData,
                [name]: tagsArray
            }));
        } else {
            setPostRequest(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const navigate=useNavigate()

    const handlePostSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoader(true);
        const response = await executePostPostOfUserService(postRequest);
        const postId = response.data;
        console.log('Post created with ID:', postId);
    
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          const response = await executeCoverUplloadOfPost(postId, formData);
          console.log(response)
          if (response.status === 202) {
            setLoader(false);
            console.log('Cover uploaded successfully');
            goToFeedsSection()
          } else {
            console.error('Failed to upload cover');
          }
        } else {
          console.warn('No file selected for upload');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };
    

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const goToFeedsSection=()=>{
      navigate(`/feeds`);
    }

    return (
      <div> <AuthenticatedNavbar/>
       <center><h3 className='font-semibold text-2xl'>Create Your Post</h3></center>
        <div className="flex justify-center items-center">
         
            <Card sx={{ maxWidth: 400 }}>
                <CardContent>
                    <form onSubmit={handlePostSubmit}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Title"
                            name="title"
                            value={postRequest.title}
                            onChange={handlePostChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Description"
                            name="description"
                            value={postRequest.description}
                            onChange={handlePostChange}
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Tags (comma separated)"
                            name="tags"
                            value={postRequest.tags}
                            onChange={handlePostChange}
                            margin="normal"
                        />
                        <input
                            accept="image/*"
                            type="file"
                            name="postCover"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            id="post-cover-input"
                        />
                        <label htmlFor="post-cover-input">
                            <Button variant="outlined"  component="span" fullWidth>
                                Upload Cover
                            </Button>
                        </label>
                        {selectedFile && (
                            <div className="mt-4">
                                <CardMedia
                                    component="img"
                                    image={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    sx={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Create Post
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default PostRequest;
