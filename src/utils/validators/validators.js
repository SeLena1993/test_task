import React from 'react';

export const requiredField = value => {
    if(value)
        return undefined
    return 'Required field'
}
