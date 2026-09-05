import {
  type ErrorComponentProps,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { OctagonXIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";

export const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Empty className="max-w-md border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <OctagonXIcon />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>{error.message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button
              variant="outline"
              render={<Link to="/" />}
              nativeButton={false}
            >
              Go home
            </Button>
            <Button onClick={() => router.invalidate()}>Try again</Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};
