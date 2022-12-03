import { Paper } from "@mui/material";
import React from "react";

export interface ArticleProps {
  content: string;
}

function Article({ content }: ArticleProps) {
  return <Paper>{content}</Paper>;
}

export default Article;
