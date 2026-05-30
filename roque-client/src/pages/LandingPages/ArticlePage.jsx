import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import { fetchArticleByName } from '../../services/ArticleService';

const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%2394a3b8" text-anchor="middle" dy=".3em" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data } = await fetchArticleByName(name);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-zinc-500">Loading article…</p>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">Back to Articles</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-slate-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Article</p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">{article.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-slate-300 bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-slate-300 bg-slate-100 mb-8">
            <img
              src={article.image || placeholderImage}
              alt={article.title}
              className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {(article.content || []).map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-slate-300 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
