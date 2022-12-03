import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMediaQuery, useTheme } from "@mui/material";
import AppHeader from "../AppHeader/AppHeader";
import axios from "axios";
import Article, { ArticleProps } from "../Article/Article";

export interface Page {
  name: string;
}

export const PAGES: Page[] = [{ name: "Blog" }, { name: "Test" }];

function MainPage() {
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
      </Grid2>
    </Grid2>
  );
}

export default MainPage;
