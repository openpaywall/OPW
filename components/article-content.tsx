import { GlobeAltIcon, LinkIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "./ui/skeleton";

interface ArticleContentProps {
  title: string;
  body: string;
}

export default function ArticleContent({ title, body }: ArticleContentProps) {
  return (
    <div className="article-content">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
