import React, { createContext } from 'react';

const GreetContext = createContext({
    greeting: 'Welcome',
    setGreeting: () => {}
});

export default GreetContext;