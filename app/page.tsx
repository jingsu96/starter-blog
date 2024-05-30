import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer';
import { Authors, allBlogs, allAuthors } from 'contentlayer/generated';
import Main from './Main';

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs);
  const authors = allAuthors.find((p) => p.slug === 'default') as Authors;
  const posts = allCoreContent(sortedPosts);
  return <Main posts={posts} authors={authors} />;
}
