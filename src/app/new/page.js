'use client'

import Authenticate from '../_shared/Authenticate';
import PostCreator from '../_shared/PostCreator';


export default function NewPost() {
    const authResult = Authenticate();

    if (typeof(authResult) == 'string') {
        return <PostCreator hash={authResult} />;
    } else {
        return authResult;
    };
};
