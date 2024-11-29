import React, { useEffect } from 'react';
import api from './api';

function App() {
    useEffect(() => {
        api.get('/sites')
            .then(response => console.log(response.data))
            .catch(error => console.error('Error fetching sites:', error));
    }, []);

    return (
        <div>
            <h1>Nurse Schedule Management</h1>
        </div>
    );
}

export default App;