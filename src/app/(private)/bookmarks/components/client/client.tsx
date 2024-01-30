"use client";
import { Post, PostType } from "@/components/post/Post";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { Prisma } from "@prisma/client";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export type BookmarkType = Prisma.BookmarkGetPayload<{
  include: {
    post: {
      include: {
        attachments: true;
        user: true;
        likes: true;
        bookmarks: true;
        _count: {
          select: {
            bookmarks: true;
            comments: true;
            likes: true;
          };
        };
      };
    };
  };
  // include: {
  //     post: {
  //       include: {
  //         attachments: true,
  //         user: true,
  //         likes: {
  //           where: {
  //             userId: session?.user.id,
  //           },
  //         },
  //         bookmarks: {
  //           where: {
  //             userId: session?.user.id,
  //           },
  //         },
  //         _count: {
  //           select: {
  //             likes: true,
  //             comments: true,
  //             bookmarks: true,
  //           },
  //         },
  //       },

  //     },
  //   },
}>;

// include: {
//     post: {
//       include: {
//         attachments: true,
//         user: true,
//         likes: {
//           where: {
//             userId: session?.user.id,
//           },
//         },
//         bookmarks: {
//           where: {
//             userId: session?.user.id,
//           },
//         },
//         _count: {
//           select: {
//             likes: true,
//             comments: true,
//             bookmarks: true,
//           },
//         },
//       },
//     },
//   },
interface Props {}

export const Client: FC<Props> = () => {
  const { data, setSize, size, isReachedEnd, isLoading } =
    useInfinityLoad<BookmarkType>("/api/post/bookmark");
  console.log("BOOKMARKS", data);
  return (
    <InfiniteScroll
      className="flex-1 w-full"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
    >
      {/* <span></span> */}
      {data && data.length > 0 ? (
        data.map((el) => <Post key={el.id} {...el.post} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4">
          <span className="text-xl font-semibold text-center">
            Here you can see the posts of people you are subscribed to
          </span>
          <span className="text-muted-foreground text-base text-center">
            There are currently no posts
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};
