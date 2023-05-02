import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftNav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4001/categoris')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error.message))
    }, [])
    return (
        <div>
            <h4>All Caterogy</h4>
            <div className='ps-4'>
                {
                    categories.map(category =>
                        <p key={category.id}><Link to={`/category/${category.id}`} className='text-black text-decoration-none'>{category.name}</Link></p>
                    )
                }
            </div>
        </div>
    );
};

export default LeftNav;