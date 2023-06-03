import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import { createContext, useEffect, useState } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider,extendTheme } from "@chakra-ui/react";  //for styling
import LogIn from "./pages/LogIn/LogIn";
import Cookies from 'js-cookie';
import SignIn from "./pages/SignIn/SignIn";
import ImageUploadForm from "./pages/ImageUploadForm";

export const AppPageContext = createContext();



function App() {

  const [token, setToken] = useState('');

  const fetchCookie=() => {
    console.log("oazjhezahzaioehaiazehiozahoei")
    const storedToken = Cookies.get('token'); // Retrieve the token from cookies
    // setToken(storedToken);
    console.log("hello")
    console.log(token);
  }
  ;

  useEffect(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: "http://localhost:8000/graphql",
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Use the updated token bearer
      },
    });
    // Update the ApolloProvider client
    setApolloClient(client);
  }, [token]);

  const [apolloClient, setApolloClient] = useState(null);




  const [cardVisible1, setCardVisible1] = useState(false);
  const [cardVisible2, setCardVisible2] = useState(false);
  const [cardVisible3, setCardVisible3] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="logIn" element={<LogIn/>}/>
        <Route path="signIn" element={<SignIn/>}/>
        <Route path="ImageUploadForm" element={<ImageUploadForm/>}/>

      </Route>
    )
  );

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
          

        },
      }),
    },
    config: {
      useSystemColorMode:        false, // Disable system color mode
      initialColorMode: 'dark', // Set the initial color mode to dark (or light)
    },
  });

  if (!apolloClient) {
    return null; // You may choose to render a loading state until the ApolloClient is ready
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme} >
          <AppPageContext.Provider
          value={{
            cardVisible1,
            cardVisible2,
            cardVisible3,
            setCardVisible1,
            setCardVisible2,
            setCardVisible3,
            fetchCookie,
            token,
            setToken
          }}
        >
          <RouterProvider router={router} />
        </AppPageContext.Provider>
       </ChakraProvider>
      </ApolloProvider>

      /////saouehzauoegzauoegzaoueghzauoeh

      ///oajzepiazjepiaz

  );
}

export default App;
