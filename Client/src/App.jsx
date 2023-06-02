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
import SignIn from "./pages/SignIn/SignIn";
import ImageUploadForm from "./pages/ImageUploadForm";

export const AppPageContext = createContext();

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8000/graphql",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWQ3ZDUzZmFhNDgwYjMzM2NiNGU1NCIsImlhdCI6MTY4NDYyNzMyNSwiZXhwIjoxNjg0NjM0NTI1fQ.0Q3FJQ7fqoENGptFuai0d86eX3AXAtq5fMvrhD4BlrI",
    },
  });


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

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme} >
          <AppPageContext.Provider
          value={{
            cardVisible1,
            cardVisible2,
            cardVisible3,
            setCardVisible1,
            setCardVisible2,
            setCardVisible3,
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
