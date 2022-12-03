import { Paper } from "@mui/material";

export interface ArticleProps {
  content: string;
}

function Article({ content }: ArticleProps) {
  return <Paper>{content}</Paper>;
}

export default Article;
