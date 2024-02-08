"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./Overlay";
import { useAuth } from "@clerk/nextjs";
import Footer from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/Actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch((err) => console.log("Unfav fail => ", err));
    } else {
      onFavorite({ id, orgId }).catch((err) =>
        console.log("Fav fail => ", err)
      );
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden transition'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
          <Actions id={id} title={title} side='right'>
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127]rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
