import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './dogApp.style.css';

const url = 'https://dog.ceo/api/breeds/image/random';

export const DogApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dogCart, setDogCart] = useState([]);

    const getRandomDog = async () => {
        try {
            setIsLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            if (!data.status) throw new Error('Error!');

            setDogCart([
                ...dogCart,
                { url: data.message, likes: 0, comments: [], id: uuidv4() },
            ]);
            setIsLoading(false);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    const handleLike = (id) => {
        setDogCart((prevDogCart) =>
            prevDogCart.map((dog) =>
                dog.id === id ? { ...dog, likes: dog.likes + 1 } : dog
            )
        );
    };

    const handleRemove = (id) => {
        setDogCart((prevDogCart) =>
            prevDogCart.filter((dog) => dog.id !== id)
        );
    };

    const handleComment = (id, comment) => {
        setDogCart((prevDogCart) =>
            prevDogCart.map((dog) =>
                dog.id === id
                    ? { ...dog, comments: [...dog.comments, comment] }
                    : dog
            )
        );
    };

    useEffect(() => {
        getRandomDog();
    }, []);

    // ... (previous code remains unchanged)

    return (
        <div className='dog-app'>
            <button onClick={getRandomDog}>
                {isLoading ? 'Loading...' : 'Get Dog'}
            </button>
            {/* Display the dog image, like button, comment section, and comments */}
            <div className='dogs'>
                {dogCart.map((el) => (
                    <div key={el.id} className='dog'>
                        <div>Likes: {el.likes}</div>
                        <div>Comments: {el.comments.length}</div>
                        <div className='dog-comments'>
                            {el.comments.map((comment, index) => (
                                <div key={index} className='comment'>
                                    {comment}
                                </div>
                            ))}
                        </div>
                        <div className='dog-buttons'>
                            <button
                                className='remove-button'
                                onClick={() => handleRemove(el.id)}
                            >
                                Remove from Cart
                            </button>
                            <button onClick={() => handleLike(el.id)} className='like-button'>
                                Like
                            </button>
                            <input
                                type='text'
                                placeholder='Add a comment...'
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleComment(el.id, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                        <img src={el.url} alt='dog' />
                    </div>
                ))}
            </div>
        </div>
    );
}