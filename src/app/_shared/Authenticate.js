'use client'

import { useState } from 'react';
import { validatePassword } from './sharedActions';


export default function Authenticate() {
    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [banned, setBanned] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [hash, setHash] = useState('');

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            setError(false);
            setLoading(true);

            validatePassword(password)
                .then(response => {
                    if (response == 'error') {
                        setError(true);
                    } else if (response == 'banned') {
                        setBanned(true);
                    } else if (typeof (response) == 'number') {
                        setAttempts(response);
                    } else {
                        setPasswordIsValid(true);
                        setHash(response);
                    };
                })
                .catch(err => {
                    setError(true);
                })
                .finally(() => { setLoading(false); setPassword('') });
        };
    };

    if (!passwordIsValid) {
        return (
            <div className='m-auto mt-[30vh] w-50 text-primary-text'>
                <p className='font-mono'>Enter password:</p>
                <input
                    type='password'
                    disabled={loading}
                    value={password}
                    maxLength='20'
                    className='p-1 border-2'
                    style={{ outline: 'none' }}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />

                {banned ?
                    <p className='font-mono text-red-600'>Banned</p>
                    :
                    error ?
                        <p className='font-mono text-red-600'>Error</p>
                        :
                        attempts > 0 ?
                            <p className='font-mono'>Attempt: {attempts}</p>
                            :
                            null
                }
            </div>
        );
    } else {
        return hash;
    };
};
