import React, { Suspense } from "react";
import { Source } from "@/lib/data";
import { getData } from "./article-content";

interface ArticleLengthProps {
  length: number;
}

export default function ArticleLength({ length }: ArticleLengthProps) {
  return (
    <div>
      <h3>Article Length</h3>
      <p>{length} words</p>
    </div>
  );
}
