import { APP_NAME } from '@/constants';
import { ArticlesList } from '@/features/article';
import { PopularTagsList } from '@/features/article/components/popular.tags.list';
import { Layout } from '@/layout';
import { Container } from '@/layout/container';

export default function HomePage() {
  return (
    <Layout>
      <header className="bg-primary h-40 text-white flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">{APP_NAME}</h1>
        <h3 className="text-xl">A place to share your knowledge.</h3>
      </header>
      <section className="mt-4">
        <Container>
          <section className="flex flex-col px-2 gap-3 xl:flex-row xl:px-0">
            <ArticlesList />
            <PopularTagsList />
          </section>
        </Container>
      </section>
    </Layout>
  );
}
