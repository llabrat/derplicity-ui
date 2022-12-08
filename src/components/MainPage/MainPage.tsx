import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMediaQuery, useTheme } from "@mui/material";
import AppHeader from "../AppHeader/AppHeader";
import axios from "axios";
import Article, { ArticleDTO } from "../Article/Article";
import { useAuth0 } from "@auth0/auth0-react";

export interface Page {
  name: string;
}

export const PAGES: Page[] = [{ name: "Blog" }, { name: "Test" }];

export function MainPage() {
  const { getAccessTokenSilently } = useAuth0();
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [articles, setArticles] = useState<ArticleDTO[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      axios
        .get<ArticleDTO[]>("http://localhost:8080/v1/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => setArticles(result.data));
    })();
  }, []);

  return (
    <Grid2 container direction={"column"}>
      <Grid2>
        <AppHeader pages={PAGES} smallScreen={smallScreen} />
      </Grid2>
      <Grid2 display="flex" justifyContent="center" alignItems="center">
        {articles.map((article) => (
          <Article content={article.content} key={article.id} />
        ))}
      </Grid2>
    </Grid2>
  );
}
