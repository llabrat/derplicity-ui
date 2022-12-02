import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMediaQuery, useTheme } from "@mui/material";
import AppHeader from "./AppHeader";
import axios from "axios";
import Article, { ArticleProps } from "./Article";
import { useAuth0 } from "@auth0/auth0-react";

export interface Page {
  name: string;
}

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  ) : null;
};

export const PAGES: Page[] = [{ name: "Blog" }, { name: "Test" }];

function App() {
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    axios
      .get<ArticleProps[]>("http://localhost:8080/v1/articles")
      .then((result) => setArticles(result.data));
  }, []);

  return (
    <Grid2 container direction={"column"}>
      <Grid2>
        <AppHeader pages={PAGES} smallScreen={smallScreen} />
      </Grid2>
      <Grid2 display="flex" justifyContent="center" alignItems="center">
        {articles.map((article) => (
          <Article content={article.content} />
        ))}
        <Profile />
      </Grid2>
    </Grid2>
  );
}

export default App;
