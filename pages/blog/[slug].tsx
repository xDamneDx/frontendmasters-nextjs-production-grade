import React, { FC } from "react";
import hydrate from "next-mdx-remote/hydrate";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { useRouter } from "next/router";
import { majorScale, Pane, Heading, Spinner } from "evergreen-ui";
import { Post } from "../../types";

// Components:
import Container from "../../components/container";
import HomeNav from "../../components/homeNav";

const BlogPost: FC<Post> = ({ source, frontMatter }) => {
  const content = hydrate(source);
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    );
  }
  return (
    <Pane>
      <Head>
        <title>{`Known Blog | ${frontMatter.title}`}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          <Heading
            fontSize="clamp(2rem, 8vw, 6rem)"
            lineHeight="clamp(2rem, 8vw, 6rem)"
            marginY={majorScale(3)}
          >
            {frontMatter.title}
          </Heading>
          <Pane>{content}</Pane>
        </Container>
      </main>
    </Pane>
  );
};

BlogPost.defaultProps = {
  source: "",
  frontMatter: { title: "default title", summary: "summary", publishedOn: "" },
};

export function getStaticPaths() {
  const postsPath = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsPath);
  const slugs = filenames.map((name) => {
    const filePath = path.join(postsPath, name);
    const file = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(file);
    return data;
  });

  return {
    paths: slugs.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

/**
 * Need to get the paths here
 * then the the correct post for the matching path
 * Posts can come from the fs or our CMS
 */
export default BlogPost;
