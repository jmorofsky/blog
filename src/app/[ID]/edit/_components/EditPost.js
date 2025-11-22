'use client'

import Authenticate from '@/app/_shared/Authenticate';
import PostCreator from '@/app/_shared/PostCreator';


export default function EditPost(props) {
    const id = props.ID;

    const authResult = Authenticate();
    
        if (typeof(authResult) == 'string') {
            return <PostCreator hash={authResult} id={id} />;
        } else {
            return authResult;
        };
};
