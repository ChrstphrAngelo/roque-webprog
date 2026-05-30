import { Link } from 'react-router-dom';
import Button from './Button';

const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%2394a3b8" text-anchor="middle" dy=".3em" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="rounded-3xl border-2 border-slate-300 bg-white p-4 shadow-sm">
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-slate-100">
            <img
              src={article.image || placeholderImage}
              alt={article.title}
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24rem] text-zinc-500">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {(article.content?.[0] || '').substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;