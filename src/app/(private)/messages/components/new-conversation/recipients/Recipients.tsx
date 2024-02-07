import { RecipientResponse } from "@/app/api/user/recipient/route";
import { Loader } from "@/components/ui/loader";
import useDebounce from "@/hooks/useDebounce";
import { fetcher } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { Recipient } from "./Recipient";
import { User } from "@prisma/client";

interface Props {
  searchTerms: string;
}

export const Recipients: FC<Props> = ({ searchTerms }) => {
  const debouncedValue = useDebounce(searchTerms, 500);
  //   const { data } = useSWR(`/api/user/recipient?q=${debouncedValue}`, fetcher);
  //   console.log("find ------", data);
  const [recipients, setRecipient] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipient = async () => {
    try {
      setIsLoading(true);
      const res: RecipientResponse = await fetch(`/api/user/recipient?q=${debouncedValue}`).then(
        (res) => res.json()
      );
      if (res.success && res.data) {
        setRecipient(res.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipient();
    return () => {};
  }, [debouncedValue]);

  return (
    <div>
      {searchTerms.length > 0 && recipients.length > 0 ? (
        <div className="flex flex-col">
          {isLoading ? (
            <Loader />
          ) : (
            recipients?.map((user) => <Recipient key={user.id} {...user} />)
          )}
        </div>
      ) : searchTerms.length > 0 && recipients.length == 0 ? (
        // <div>{ownProfile ? <Recipient {...ownProfile} /> : null}</div>
        <div className="w-full flex justify-center">
          <span className="text-center">Not Found</span>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <span className="text-center">Start search</span>
        </div>
      )}
    </div>
  );
};
